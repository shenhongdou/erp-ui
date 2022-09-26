import React, { useEffect, useState, useRef } from 'react';
import { Mentions, Button } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import type { OptionProps } from 'antd/es/mentions';

import BpmMessageItem, { ListItem } from '../BpmMessageItem';

import { fetchList, fetchUsers, doSendMessage, uploadFile } from './apis';

import './index.less';

// TODO 选人加入debounce, 头像优化
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
  env: 'tb1' | 'tb2' | 'pro';
  token: string;
  processDefinitionId: string;
  processInstanceId: string;
}

let timer: number;

const TOKEN =
  'eyJraWQiOiI4NjBlYjQ4Yy0wNDFmLTQ1YTctYTAxOS0wNmQ3NjI0MjZhNjMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1YjNhYmM1Zi1kMzhjLTRmODUtOGFlYi03NDg3ZTkwNGNiNjAiLCJyb2xlX25hbWVzIjoiYWRtaW4sREFUQSBUTCxEQVRBIFBNLENlbnRyYWwgTUtUIERldmVsb3BlcixDZW50cmFsIE1LVCBDb3Vwb24gTWFuZWdlbWVudCIsInVzZXJfaWQiOiI3ODM5NDQ3IiwidXNlcl9uYW1lIjoieGl1bG9uZy56aGFuZyIsImlzcyI6ImlzdGlvQHNheXdlZWUuY29tIiwiaWQiOiIzODA1IiwidHlwZSI6InVzZXIiLCJleHAiOjE2NjY3MTg1MDUsInJlYWxtX2lkIjoiMyIsImlzX2xvZ2luIjp0cnVlLCJyb2xlX2lkcyI6IjQsNTEsNTIsNTUsNzQsOTEsMTIxLDEyMiJ9.YlvuQgoNI5oZvGWqKfc7-09OFkS8-oicSHkWZQYzsSbQ5UdsvzgbDSwP__Uhb-ag48gGtYLnZPqO2HkQwj1tQ5it9AR4fxnh68WHjmQAf3gvfjt7Ca9-8gqgbWCI-qlbweMA1-GK2yXH_oxcwzIpGQqRHc8WW9G-ct5OTwT81ks';

export default (props: IProps) => {
  const {
    env = 'tb1',
    token = TOKEN,
    processDefinitionId = 'po_receipt_01:11:266c2c6a-3b27-11ed-a00c-d6e149b04ae4',
    processInstanceId = '4194fe2a-3b27-11ed-8f53-1e6f90fe6f04',
  } = props;

  const [list, setList] = useState<ListItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMentionUsers, setchatMentionUsers] = useState<OptionProps[]>([]);

  const uploadRef = useRef<HTMLInputElement | null>(null);

  const handleNext = () => {
    timer = setTimeout(() => {
      getList();
    }, 3000);
  };

  const getList = async () => {
    const ret = await fetchList(env, token, {
      chatLogDtoFilter: {
        processDefinitionId,
        processInstanceId,
      },
      orderParam: [
        {
          fieldName: 'recCreateTime',
          asc: 0,
        },
      ],
    }).catch((err) => {
      console.error(err);
    });

    setList(
      (ret?.data || [])?.map((item) => ({
        ...item,
        isCurrentUser: Math.random() > 0.5,
      })),
    );

    // handleNext();
  };

  const handleChange = (content: string) => {
    setContent(content);
  };

  const handleSearch = (userName: string) => {
    setLoading(true);

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
    const file = e.target?.files?.[0];

    if (!file) return;

    const ret = await handeUpload(file).catch(() => {});
    if (!ret) return;
    const { url, fileName } = ret;

    const chatType = file.type.startsWith('image') ? 2 : 3;
    handleSend(url, chatType, fileName);
  };

  const getMentionUsers = () => {
    console.log(chatMentionUsers, 'chatMentionUsers');
    return chatMentionUsers
      ?.filter((item) => content.indexOf(`@${item.value}`) > -1)
      ?.map((item) => item.key);
  };

  const handleSend = async (content: string, chatType: ChatType, fileName?: string) => {
    const ret = doSendMessage(env, token, {
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
    getList();
  };

  const handleSendTxt = () => {
    handleSend(content, 1);
  };

  useEffect(() => {
    getList();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="erp-bpm-message">
      <div className="erp-bpm-message__list">
        {list?.map((item) => (
          <BpmMessageItem key={item.pkid} data={item} />
        ))}
      </div>
      <div className="erp-bpm-message__editor">
        <Mentions
          autoSize={{ minRows: 2, maxRows: 8 }}
          placeholder="You can use @ to ref user here"
          value={content}
          loading={loading}
          onSearch={handleSearch}
          onChange={handleChange}
          onSelect={handleSelect}
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
