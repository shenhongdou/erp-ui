import React from 'react';
import classNames from 'classnames';
import { Image } from 'antd';

import { getFileLogo, getAvatarTxt } from '../util';

export interface ListItem {
  chatContent: string;
  chatType: number;
  isCurrentUser: boolean;
  processDefinitionId: string;
  processInstanceId: string;
  recCreateTime: string;
  userEmail: string;
  userId: string;
  userName: string;
  userShowName: string;
  pkid: string;
  chatContentName: string;
}

interface IProps {
  data: ListItem;
}

import './index.less';

const defaultAvatar = 'https://www.sayweee.com/css/img/avatar_unknown.png';

export default (props: IProps) => {
  const { data } = props;

  return (
    <div
      className={classNames([
        'erp-bpm-message-item',
        { 'erp-bpm-message-item__right': data.isCurrentUser },
      ])}
    >
      <span className="erp-bpm-message-avatar">{getAvatarTxt(data.userName)}</span>
      {/* <img className="erp-bpm-message-avatar" src={defaultAvatar} /> */}

      <div className="erp-bpm-message-main">
        <div className="erp-bpm-message-main__header">
          <span className="erp-bpm-message-main__user" title={data.userName}>
            {data.userShowName}
          </span>
          <span className="erp-bpm-message-main__time">{data.recCreateTime}</span>
        </div>

        {data.chatType === 1 ? (
          <p className="erp-bpm-message-main__content">{data.chatContent}</p>
        ) : data.chatType === 2 ? (
          <Image src={data.chatContent} />
        ) : (
          <a className="erp-bpm-message-main__file" href={data.chatContent} target="_blank">
            <img className="erp-bpm-message-main__img" src={getFileLogo(data.chatContent)} />
            <span className="erp-bpm-message-main__fileName">{data.chatContentName}</span>
          </a>
        )}
      </div>
    </div>
  );
};