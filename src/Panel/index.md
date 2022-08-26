## Panel

Demo:

```tsx
import React, { useState, useEffect } from 'react';
import { Panel } from '@weee-erp/erp-ui';

export default () => {
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());

  const handleRefresh = () => {
    console.log('refresh');
  };

  useEffect(() => {
    setInterval(() => {
      setTimer(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <Panel title="my panel" refresh={handleRefresh}>
      <div>{timer}</div>
    </Panel>
  );
};
```

<API src="./index.tsx"></API>
