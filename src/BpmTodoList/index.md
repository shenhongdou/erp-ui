## BpmTodoList

```tsx
import React from 'react';
import { BpmTodoList } from '@weee-erp/erp-ui';

function getData() {
  return new Array(10).fill(0).map((_, index) => ({
    taskId: `${index}-${Date.now()}`,
    processInstanceTitle: 'processInstance title',
    status: 'end',
    creator: 'hongdou.shen',
    flowName: 'flowName',
    onlineTable: [{ ticket_type: 'ticket_type' }],
    createTime: new Date().toLocaleDateString(),
    taskCreateTime: new Date().toLocaleDateString(),
    nodeLink: 'https://tb1.sayweee.net/zh',
  }));
}

export default () => {
  const fetchData = async () => {
    const data = {
      list: getData(),
      total: 20,
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  };

  return (
    <div style={{ height: '800px', background: 'rgb(240, 245, 243)' }}>
      <BpmTodoList fetchData={fetchData} />
    </div>
  );
};
```

<API></API>

### IParams

<API src="../BpmTodoItem/param.tsx" hideTitle></API>

### Item

<API src="../BpmTodoItem/item.tsx" hideTitle></API>
