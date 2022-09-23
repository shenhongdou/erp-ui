import React, { useEffect, useState, useRef } from 'react';
import { Mentions, Button } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';

import BpmMessageItem, { ListItem } from '../BpmMessageItem';

import './index.less';

interface IProps {
  fetchList: () => Promise<ListItem[]>;
  onSend: (content: string) => void;
  onUserSearch: () => Promise<any[]>;
  onUpload: (file: File) => Promise<string>;
}

let timer: number;

export default (props: IProps) => {
  const { fetchList, onSend, onUserSearch, onUpload } = props;

  const [list, setList] = useState<ListItem[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const uploadRef = useRef<HTMLInputElement>();
  const [loading, setLoading] = useState(false);

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

  const handleSearch = () => {
    if (typeof onUserSearch !== 'function') {
      console.error(new TypeError('onUserSearch should be a function'));
      return;
    }
    setLoading(true);

    onUserSearch()
      .then((users) => {
        setUsers(users);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(() => {});
  };

  const handleFileClick = () => {
    uploadRef?.current?.click();
  };

  const handleFileChange = (e) => {
    if (typeof onUpload !== 'function') {
      console.error(new TypeError('onUpload should be a function'));
      return;
    }

    onUpload(e.target.files[0]);
  };

  const handleSendData = () => {
    if (typeof onSend !== 'function') {
      console.error(new TypeError('onSend should be a function'));
      return;
    }

    setContent('');
    onSend(content);
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
          loading={loading}
          onSearch={handleSearch}
          onChange={handleChange}
        >
          {users?.map((item) => (
            <Mentions.Option value={item.name} key={item.id}>
              {item.name}
            </Mentions.Option>
          ))}
        </Mentions>
        <div className="erp-bpm-message__btns">
          <PaperClipOutlined className="erp-bpm-message__file" onClick={handleFileClick} />
          <Button
            type="primary"
            size="small"
            className="erp-bpm-message__send"
            onClick={handleSendData}
          >
            Send
          </Button>
          <input hidden type="file" ref={uploadRef} onChange={handleFileChange} />
        </div>
      </div>
    </div>
  );
};
