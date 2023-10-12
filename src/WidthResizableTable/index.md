## WidthResizableTable

Demo:

```tsx
import React, { useState, useEffect } from 'react';
import { WidthResizableTable } from '@weee-erp/erp-ui';

const columns = [
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
  {
    title: 'Action',
    key: 'action',
    ellipsis: true,
    render: () => <a>Delete</a>,
  },
];

const dataSource = [
  {
    key: 0,
    date: '2018-02-11',
    amount: 120,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 1,
    date: '2018-03-11',
    amount: 243,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 2,
    date: '2018-04-11',
    amount: 98,
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
  {
    key: 4,
    date: '2018-04-11',
    amount: 98,
    type: 'income',
    note: 'transfer',
  },
];

export default () => {
  return <WidthResizableTable columns={columns} dataSource={dataSource}></WidthResizableTable>;
};
```

<API src="./index.tsx"></API>
