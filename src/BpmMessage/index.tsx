import React, { useEffect, useState, useRef } from 'react';
import { Button, message, Empty, Tooltip } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import type { OptionProps } from 'antd/es/mentions';

import BpmMessageItem, { ListItem } from '../BpmMessageItem';
import QuillEditor from './quill-editor';

import { fetchList, doSendMessage, uploadFile } from './apis';
import { getFileSubType } from '../util';

import './index.less';
import 'react-quill/dist/quill.snow.css';

// interface User {
//   showName: string;
//   loginName: string;
//   userId: string;
//   email: string;
// }

export enum ChatType {
  String = 1,
  Image,
  File,
  HTML,
}

interface IProps {
  /**
   * @description       环境
   *
   */
  env: 'tb1' | 'dev' | 'pro';
  /**
   * @description       不需要Bearer
   *
   */
  token: string;
  /**
   * @description       processDefinitionId
   *
   */
  processDefinitionId: string;
  /**
   * @description       processInstanceId
   *
   */
  processInstanceId: string;
  /**
   * @description       时区（例如Asia/Shanghai），可以通过Intl.DateTimeFormat().resolvedOptions().timeZone获取，会根据传入的时区对message的时间进行时区转换
   */
  zoneId?: string;
}

let timer: number;

export default (props: IProps) => {
  const { env = 'tb1', token, processDefinitionId, processInstanceId, zoneId: propZoneId } = props;

  const [list, setList] = useState<ListItem[]>([]);
  // const [users, setUsers] = useState<User[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMentionUsers, setchatMentionUsers] = useState<OptionProps[]>([]);

  const uploadRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handeUpload = async (file: File) => {
    // const subType = getFileSubType(file.type);

    // if (!subType) {
    //   message.error('This file type is not supported.');
    //   return;
    // }

    const formData = new FormData();
    formData.append('file', file);
    // formData.append('bizType', 'bpm');
    // formData.append('subType', subType);
    const hide = message.loading('loading...');
    const ret = await uploadFile(env, token, formData).catch((err) => {
      console.error(err);
    });
    hide();

    return ret?.body?.[0];
  };

  const handleNext = () => {
    timer = setTimeout(() => {
      getList();
    }, 3000);
  };

  const getList = async () => {
    timer && clearTimeout(timer);

    const zoneId = propZoneId || Intl.DateTimeFormat().resolvedOptions().timeZone;

    const ret = await fetchList(env, token, {
      chatLogDtoFilter: {
        processDefinitionId,
        processInstanceId,
        zoneId,
      },
      orderParam: [
        {
          fieldName: 'recCreateTime',
          asc: 1,
        },
      ],
    }).catch((err) => {
      console.error(err);
    });

    setList(ret?.data || []);

    handleNext();
  };

  const handleChange = (content: string) => {
    timer && clearTimeout(timer);
    setContent(content);
  };

  // const debouncedFetchUsers = useCallback(
  //   debounce(async (userName: string) => {
  //     fetchUsers(env, token, {
  //       orderParam: [
  //         {
  //           fieldName: 'createTime',
  //           asc: 1,
  //         },
  //       ],
  //       pageParam: {
  //         pageNum: 1,
  //         pageSize: 100,
  //       },
  //       sysUserDtoFilter: {
  //         loginName: userName,
  //       },
  //     })
  //       .then((data) => {
  //         setUsers(data?.data?.dataList || []);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }),
  //   [],
  // );

  // const handleSearch = (userName: string) => {
  //   setLoading(true);
  //   setUsers([]);
  //   debouncedFetchUsers(userName);
  // };

  // const handleSelect = (option: any, prefix: string) => {
  //   setchatMentionUsers((users) => [...users, option]);
  // };

  const handleFileClick = () => {
    uploadRef?.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (!file) return;

    const ret = await handeUpload(file).catch(() => {});
    console.log(ret, 'ret');
    if (!ret) return;

    const { url, originalName } = ret;

    const chatType = file.type.startsWith('image') ? ChatType.Image : ChatType.File;

    await handleSend(url, chatType, originalName);
  };

  const getMentionUsers = () => {
    return chatMentionUsers
      ?.filter((item) => content.indexOf(`@${item.value}`) > -1)
      ?.map((item) => item.key);
  };

  const handleSend = async (content: string, chatType: ChatType, fileName?: string) => {
    if (!content?.trim() || content === '<p><br></p>') {
      message.error('please input something first');
      return;
    }

    const isSendFile = !!fileName;

    !isSendFile && setLoading(true);

    const ret = await doSendMessage(env, token, {
      chatLogDto: {
        chatContent: content,
        chatContentName: fileName,
        chatType,
        processDefinitionId,
        processInstanceId,
        chatMentionUsers: getMentionUsers(),
      },
    }).catch((err) => {
      console.error(err);
    });

    !isSendFile && setLoading(false);

    if (!ret) return;

    setContent('');
    await getList();
    setTimeout(() => {
      const height = listRef?.current?.scrollHeight;
      listRef?.current?.scrollTo({
        top: height,
        behavior: 'smooth',
      });
    });
  };

  const handlKeyDown = (e: any) => {
    if (e.keyCode !== 13 || !e.ctrlKey) return;
    handleSend(content, ChatType.HTML);
  };

  useEffect(() => {
    if (!processInstanceId) return;
    getList();

    return () => {
      clearTimeout(timer);
    };
  }, [processInstanceId]);

  return (
    <div className="erp-bpm-message">
      <div className="erp-bpm-message__list" ref={listRef}>
        {!list?.length && <Empty />}

        {list?.map((item) => (
          <BpmMessageItem key={item.pkid} data={item} />
        ))}
      </div>
      <div className="erp-bpm-message__editor">
        {/* <Mentions
          autoSize={{ minRows: 2, maxRows: 8 }}
          // placeholder="You can use @ to ref user here"
          value={content}
          loading={loading}
          prefix="#!#!$x!e#!#!$x!e#!#!$x!e#!#!$x!e#!#!$x!e#!#!$x!e"
          // onSearch={handleSearch}
          onChange={handleChange}
          // onSelect={handleSelect}
          onKeyDown={handlKeyDown}
          onBlur={getList}
        >
          {users?.map((item) => (
            <Mentions.Option value={item.showName} key={item.loginName}>
              {item.showName}
            </Mentions.Option>
          ))}
        </Mentions>
        */}

        {/* <ReactQuill
          theme="snow"
          ref={reactQuillRef}
          modules={modules}
          value={content}
          onChange={handleChange}
          onKeyDown={handlKeyDown}
          onBlur={getList}
        /> */}
        <QuillEditor
          env={env}
          token={token}
          value={content}
          onChange={handleChange}
          onKeyDown={handlKeyDown}
          onBlur={getList}
        />

        <div className="erp-bpm-message__btns">
          <Tooltip title="Upload Attachment">
            <PaperClipOutlined className="erp-bpm-message__file" onClick={handleFileClick} />
          </Tooltip>
          <Button
            type="primary"
            size="small"
            className="erp-bpm-message__send"
            loading={loading}
            onClick={() => handleSend(content, ChatType.HTML)}
          >
            Send
          </Button>
          <input
            hidden
            type="file"
            ref={uploadRef}
            onChange={handleFileChange}
            onClick={(e) => {
              (e.target as HTMLInputElement).value = '';
            }}
          />
        </div>
      </div>
    </div>
  );
};
