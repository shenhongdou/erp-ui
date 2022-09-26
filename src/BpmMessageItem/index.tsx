import React from 'react';
import classNames from 'classnames';
import { Image } from 'antd';

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

const FILE_LOGOS = {
  txt: 'https://cdn.sayweee.net/cs/image/087/921/3D17C4036E590BFF_0x0.png',
  image: 'https://cdn.sayweee.net/cs/image/030/447/47F5570D100BD6B_0x0.png',
  pdf: 'https://cdn.sayweee.net/cs/image/431/590/4CA8155B3B9495BF_0x0.png',
  video: 'https://cdn.sayweee.net/cs/image/688/479/276A5343F14EB58_0x0.png',
  other: 'https://cdn.sayweee.net/cs/image/040/838/1796333A1B5AA392_0x0.png',
};

const getFileLogo = (fileType: string) => {
  if (!fileType) return;

  if (fileType.endsWith('document')) return FILE_LOGOS.txt;

  if (fileType.endsWith('pdf')) return FILE_LOGOS.pdf;

  if (fileType.endsWith('jpeg') || fileType.endsWith('png')) return FILE_LOGOS.image;

  if (fileType.endsWith('mp4')) return FILE_LOGOS.video;

  return FILE_LOGOS.other;
};

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
