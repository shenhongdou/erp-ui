## BpmMessage

Demo:

```tsx
import React from 'react';
import { BpmMessage } from '@weee-erp/erp-ui';

const TOKEN = '';

const processDefinitionId = '';
const processInstanceId = '';

export default () => {
  return (
    <div
      style={{
        width: '500px',
        height: '600px',
        margin: 'auto',
        border: '1px solid #eee',
        padding: '10px',
      }}
    >
      <BpmMessage
        env="tb1"
        token={TOKEN}
        processDefinitionId={processDefinitionId}
        processInstanceId={processInstanceId}
      ></BpmMessage>
    </div>
  );
};
```

<API src="./index.tsx"></API>
