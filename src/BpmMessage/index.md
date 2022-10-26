## BpmMessage

Demo:

```tsx
import React from 'react';
import { BpmMessage } from '@weee-erp/erp-ui';

const TOKEN =
  'eyJraWQiOiI4NjBlYjQ4Yy0wNDFmLTQ1YTctYTAxOS0wNmQ3NjI0MjZhNjMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMTQxZjY1Ny0xNTc0LTRkYzktOGUzYy0yOTMyNTY3OTAxZmQiLCJyb2xlX25hbWVzIjoiQ1MgYWRtaW4sVE1TIEN1c3RvbWVyIFNlcnZpY2XvvIhDU--8iSxDUyBEZXNrIEFkbWluIiwidXNlcl9pZCI6IjEwMDIwODE1IiwidXNlcl9uYW1lIjoiaG9uZ2RvdS5zaGVuIiwiaXNzIjoiaXN0aW9Ac2F5d2VlZS5jb20iLCJpZCI6Ijc5OTUiLCJ0eXBlIjoidXNlciIsImV4cCI6MTY2ODgwNTQ3NCwicmVhbG1faWQiOiIzIiwiaXNfbG9naW4iOnRydWUsInJvbGVfaWRzIjoiMzYsMzcsMTMwIn0.AZPbIfUNAw_kOot2XR4tdzRehL09dKcJlm9CWq2MaXkQbITaQwBAKNXKFZ15ydgaPkW0_gKPiQqzz4zftIGXc2q-3id4MTgYI7EhKnyLv61Va9Q6tIrqHZtQOmuquU414zyS5VbOqphk3ovVv2AMqH48XPqvMAGrX2BRerP91eI';

const processDefinitionId = 'pr_upc:5:65606d2b-5448-11ed-9d89-a66bb63181bb';
const processInstanceId = '74ec8837-5501-11ed-841e-f246d4db46f5';

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
