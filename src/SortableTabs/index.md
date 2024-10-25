## SpaceView

Demo:

```tsx
import React from 'react';
import { SortableTabs } from '@weee-erp/erp-ui';

const items = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

export default () => (
  <div style={{ height: 600, width: '100%' }}>
    <SortableTabs items={items} />
  </div>
);
```

<API></API>
