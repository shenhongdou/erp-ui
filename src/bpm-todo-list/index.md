## Bpm Todo List

```tsx
import React from 'react';
import { BpmTodoList } from '@weee-erp/erp-ui';

function getData() {
  return new Array(10).fill(0).map((_, index) => ({
    taskId: `${index}-${Date.now()}`,
    processInstanceTitle: 'processInstanceTitle',
    status: 'end',
    creator: 'hongdou.shen',
    flowName: 'flowName',
    onlineTable: [{ ticket_type: 'ticket_type' }],
    createTime: new Date().toLocaleDateString(),
    taskCreateTime: new Date().toLocaleDateString(),
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
    <div style={{ height: '800px', overflow: 'auto', background: 'rgb(240, 245, 243)' }}>
      <BpmTodoList fetchData={fetchData} />
    </div>
  );
};
```

<API src="./index.tsx"></API>
