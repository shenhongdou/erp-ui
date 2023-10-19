## VirtualTable

Demo:

```tsx
import React, { useState } from 'react';
import { VirtualTable } from '@weee-erp/erp-ui';

// Usage
const columns = [
  { title: 'A', dataIndex: 'key', width: 150, fixed: 'left' },
  { title: 'B', dataIndex: 'key' },
  { title: 'C', dataIndex: 'key' },
  { title: 'D', dataIndex: 'key' },
  { title: 'E', dataIndex: 'key', width: 200 },
  { title: 'F', dataIndex: 'key', width: 100 },
];

export default () => {
  const [current, setCurrent] = useState(1);
  const [dataSource, setDataSource] = useState([]);

  const loadMore = async (startIndex, stopIndex) => {
    const len = stopIndex - startIndex + 1;
    console.log('load-more');
    setCurrent((current) => current + 1);

    return new Promise((resolve) => {
      setTimeout(() => {
        const data = Array.from({ length: len }, (_, key) => ({ key: key + startIndex }));
        setDataSource((dataSource) => [...dataSource, ...data]);
        resolve();
      }, 10000);
    });
  };
  return <VirtualTable columns={columns} size="small" scroll={{ y: 300, x: '100vw' }} />;
};
```

<API></API>
