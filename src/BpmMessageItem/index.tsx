import React from 'react';
import classNames from 'classnames';

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
      <img className="erp-bpm-message-avatar" src={defaultAvatar} />

      <div className="erp-bpm-message-main">
        <div className="erp-bpm-message-main__header">
          <span className="erp-bpm-message-main__user" title={data.userName}>
            {data.userShowName}
          </span>
          <span className="erp-bpm-message-main__time">{data.recCreateTime}</span>
        </div>

        <p className="erp-bpm-message-main__content">{data.chatContent}</p>
      </div>
    </div>
  );
};
