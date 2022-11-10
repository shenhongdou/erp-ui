import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Mentions, Button, message, Empty } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import type { OptionProps } from 'antd/es/mentions';

import BpmMessageItem, { ListItem } from '../BpmMessageItem';

import { fetchList, fetchUsers, doSendMessage, uploadFile } from './apis';
import { debounce } from '../util';

import './index.less';

interface User {
  showName: string;
  loginName: string;
  userId: string;
  email: string;
}

enum ChatType {
  String = 1,
  Image,
  File,
}

interface IProps {
  /**
   * @description       环境
   *
   */
  env: 'tb1' | 'tb2' | 'pro';
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
}

let timer: number;

export default (props: IProps) => {
  const { env = 'tb1', token, processDefinitionId, processInstanceId } = props;

  const [list, setList] = useState<ListItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMentionUsers, setchatMentionUsers] = useState<OptionProps[]>([]);

  const uploadRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    timer = setTimeout(() => {
      getList();
    }, 3000);
  };

  const getList = async () => {
    timer && clearTimeout(timer);

    const zoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

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

  const debouncedFetchUsers = useCallback(
    debounce(async (userName: string) => {
      fetchUsers(env, token, {
        orderParam: [
          {
            fieldName: 'createTime',
            asc: 1,
          },
        ],
        pageParam: {
          pageNum: 1,
          pageSize: 100,
        },
        sysUserDtoFilter: {
          loginName: userName,
        },
      })
        .then((data) => {
          setUsers(data?.data?.dataList || []);
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }),
    [],
  );

  const handleSearch = (userName: string) => {
    setLoading(true);
    setUsers([]);
    debouncedFetchUsers(userName);
  };

  const handleSelect = (option: any, prefix: string) => {
    setchatMentionUsers((users) => [...users, option]);
  };

  const handleFileClick = () => {
    uploadRef?.current?.click();
  };

  const handeUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const ret = await uploadFile(env, token, formData).catch((err) => {
      console.error(err);
    });

    if (!ret) return;
    return {
      url: ret?.body?.[0].url,
      fileName: file.name,
    };
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const hide = message.loading('loading...');
    const file = e.target?.files?.[0];

    if (!file) return;

    const ret = await handeUpload(file).catch(() => {});
    if (!ret) return;
    const { url, fileName } = ret;

    const chatType = file.type.startsWith('image') ? 2 : 3;
    await handleSend(url, chatType, fileName);
    hide();
  };

  const getMentionUsers = () => {
    return chatMentionUsers
      ?.filter((item) => content.indexOf(`@${item.value}`) > -1)
      ?.map((item) => item.key);
  };

  const handleSend = async (content: string, chatType: ChatType, fileName?: string) => {
    if (!content?.trim()) {
      message.error('please input something first');
      return;
    }

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

  const handleSendTxt = () => {
    handleSend(content, 1);
  };

  const handlKeyDown = (e: any) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      handleSend(content, 1);
    }
  };

  useEffect(() => {
    getList();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="erp-bpm-message">
      <div className="erp-bpm-message__list" ref={listRef}>
        {!list?.length && <Empty />}
        {list?.map((item) => (
          <BpmMessageItem key={item.pkid} data={item} />
        ))}
      </div>
      <div className="erp-bpm-message__editor">
        <Mentions
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
        <div className="erp-bpm-message__btns">
          <PaperClipOutlined className="erp-bpm-message__file" onClick={handleFileClick} />
          <Button
            type="primary"
            size="small"
            className="erp-bpm-message__send"
            onClick={handleSendTxt}
          >
            Send
          </Button>
          <input hidden type="file" ref={uploadRef} onChange={handleFileChange} />
        </div>
      </div>
    </div>
  );
};
