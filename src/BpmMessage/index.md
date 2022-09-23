## BpmMessage

Demo:

```tsx
import React, { useState, useEffect } from 'react';
import { BpmMessage } from '@weee-erp/erp-ui';

const getContent = () => {
  const contents = [
    '第73届国际宇航大会18日至22日在法国巴黎举行。国际宇航联合会21日专门为获得该组织年度最高奖、2022年度“世界航天奖”的中国天问一号火星探测团队举办成果介绍会。 ',
    '“世界航天奖”旨在表彰在航天科学、航天技术、航天医学、航天工程管理等领域取得杰出成就的航天科技人员。',
    '孙鑫晶 邢建桥',
    '刘思远',
    '新华社音视频部制作',
    '新华社国际传播融合平台出品',
    '全球连线｜问鼎“世界航天奖” 天问一号团队获赞誉',
  ];

  const index = (Math.random() * 10).toFixed() % 7;
  return contents[index];
};

export default () => {
  const fetchList = async () => {
    return new Array(10).fill(0).map((_, index) => ({
      chatContent: getContent(),
      chatType: 1,
      isCurrentUser: Math.random() > 0.5,
      processDefinitionId: 'xxx',
      processInstanceId: 'xxx',
      recCreateTime: new Date().toLocaleDateString(),
      userEmail: 'xiulong.zhang@sayweee.com',
      userId: '0',
      userName: 'xiulong.zhang@sayweee.com',
      userShowName: 'xiulong.zhang',
    }));
  };

  return (
    <div style={{ width: '500px', height: '800px' }}>
      <BpmMessage
        fetchList={fetchList}
        handleSend={(data) => {
          console.log(data, 'data');
        }}
      ></BpmMessage>
    </div>
  );
};
```

<API src="./index.tsx"></API>
