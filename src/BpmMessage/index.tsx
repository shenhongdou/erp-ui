import React, { useEffect, useState } from 'react';
import { Mentions, Button } from 'antd';

import BpmMessageItem, { ListItem } from '../BpmMessageItem';

import './index.less';

interface IProps {
  fetchList: () => Promise<ListItem[]>;
  handleSend: (content: string) => void;
  handleUserSearch: () => Promise<any[]>;
}

let timer: number;

export default (props: IProps) => {
  const { fetchList, handleSend, handleUserSearch } = props;

  const [list, setList] = useState<ListItem[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [content, setContent] = useState('');

  const getList = async () => {
    if (typeof fetchList !== 'function') {
      console.error(new TypeError('fetchList should be a function'));
      return;
    }
    const list = await fetchList().catch(() => {});
    if (!list) return;

    setList(list);
  };

  const handleChange = (content: string) => {
    setContent(content);
  };

  const handleSearch = async () => {
    if (typeof handleUserSearch !== 'function') {
      console.error(new TypeError('handleUserSearch should be a function'));
      return;
    }
    const users = await handleUserSearch().catch(() => {});
    if (!users) return;
    setUsers(users);
  };

  const handleSendData = () => {
    if (typeof handleSend !== 'function') {
      console.error(new TypeError('handleSend should be a function'));
      return;
    }

    setContent('');
    handleSend(content);
    getList();
  };

  const handleInit = async () => {
    getList();
    timer = setTimeout(() => {
      handleInit();
    }, 3000);
  };

  useEffect(() => {
    handleInit();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="erp-bpm-message">
      <div className="erp-bpm-message__list">
        {list?.map((item, index) => (
          <BpmMessageItem key={index} data={item} />
        ))}
      </div>
      <div className="erp-bpm-message__editor">
        <Mentions
          autoSize={{ minRows: 2, maxRows: 8 }}
          placeholder="You can use @ to ref user here"
          value={content}
          onSearch={handleSearch}
          onChange={handleChange}
        >
          {users?.map((item) => (
            <Mentions.Option value={item.id}>{item.name}</Mentions.Option>
          ))}
        </Mentions>
        <div className="erp-bpm-message__btns">
          <Button
            type="primary"
            size="small"
            className="erp-bpm-message__send"
            onClick={handleSendData}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
