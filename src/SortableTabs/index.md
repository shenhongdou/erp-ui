## SortableTabs

Demo:

```tsx
import React, { useState, useEffect } from 'react';
import { SortableTabs } from '@weee-erp/erp-ui';

const data = [
  {
    key: '11',
    label: 'Tab 11',
    children: 'Content of Tab Pane 11',
  },
  {
    key: 22,
    label: 'Tab 22',
    children: 'Content of Tab Pane 22',
  },
  {
    key: 33,
    label: 'Tab 33',
    children: 'Content of Tab Pane 33',
    sortDisabled: true,
  },
];

export default () => {
  const [items, setItems] = useState(data);
  const [activeKey, setactiveKey] = useState(data?.[0]?.key);

  const handleChange = (activeKey) => {
    setactiveKey(activeKey);
  };

  const onDragError = (errorType, activeItem: any, overItem: any) => {
    console.log('errorType', errorType, activeItem, overItem);
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
      <SortableTabs items={items} onDragError={onDragError} />
    </div>
  );
};
```

<API></API>
