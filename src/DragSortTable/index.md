## DragSortTable

支持拖拽排序的 Table。 ProComponent 也提供了 DragSortTable 组件，但是它的拖拽结束的回调函数的参数是重新排好序的 dataSource，有时候不一定适用。此组件的 onDrop 回调函数提供的参数包含拖拽的数据 active，拖拽释放处的数据 over，拖拽的方向 isDragUp 等 3 个参数。可以根据实际的应用场景来选择组件。

Demo:

```tsx
import React from 'react';
import { DragSortTable } from '@weee-erp/erp-ui';

const columns = [
  {
    title: 'Key',
    dataIndex: 'key',
    width: 200,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: 200,
    ellipsis: true,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: 100,
    ellipsis: true,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 100,
    ellipsis: true,
  },
  {
    title: 'Note',
    dataIndex: 'note',
    width: 100,
    ellipsis: true,
  },
];

const dataSource = [
  {
    key: 1,
    date: '2018-02-11',
    amount: 120,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 2,
    date: '2018-03-11',
    amount: 243,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 3,
    date: '2018-04-11',
    amount: 98,
    type: 'income',
    note: 'transfer',
  },
];

export default () => {
  const handleDrop = (active, over, isDragUp) => {
    console.log(active, over, isDragUp, 'active, over, isDragUp');
  };
  return (
    <DragSortTable rowKey="key" columns={columns} dataSource={dataSource} onDrop={handleDrop} />
  );
};
```

<API></API>
