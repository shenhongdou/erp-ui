## ResizableColumnTable

Demo:

```tsx
import React from 'react';
import { ResizableColumnTable } from '@weee-erp/erp-ui';

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
    width: 100,
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
];

export default () => <ResizableColumnTable bordered columns={columns} dataSource={dataSource} />;
```

<API src="./index.tsx"></API>
