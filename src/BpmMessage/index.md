## BpmMessage

Demo:

```tsx
import React from 'react';
import { BpmMessage } from '@weee-erp/erp-ui';

const TOKEN =
  'eyJraWQiOiI4NjBlYjQ4Yy0wNDFmLTQ1YTctYTAxOS0wNmQ3NjI0MjZhNjMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1YjNhYmM1Zi1kMzhjLTRmODUtOGFlYi03NDg3ZTkwNGNiNjAiLCJyb2xlX25hbWVzIjoiYWRtaW4sREFUQSBUTCxEQVRBIFBNLENlbnRyYWwgTUtUIERldmVsb3BlcixDZW50cmFsIE1LVCBDb3Vwb24gTWFuZWdlbWVudCIsInVzZXJfaWQiOiI3ODM5NDQ3IiwidXNlcl9uYW1lIjoieGl1bG9uZy56aGFuZyIsImlzcyI6ImlzdGlvQHNheXdlZWUuY29tIiwiaWQiOiIzODA1IiwidHlwZSI6InVzZXIiLCJleHAiOjE2NjY3MTg1MDUsInJlYWxtX2lkIjoiMyIsImlzX2xvZ2luIjp0cnVlLCJyb2xlX2lkcyI6IjQsNTEsNTIsNTUsNzQsOTEsMTIxLDEyMiJ9.YlvuQgoNI5oZvGWqKfc7-09OFkS8-oicSHkWZQYzsSbQ5UdsvzgbDSwP__Uhb-ag48gGtYLnZPqO2HkQwj1tQ5it9AR4fxnh68WHjmQAf3gvfjt7Ca9-8gqgbWCI-qlbweMA1-GK2yXH_oxcwzIpGQqRHc8WW9G-ct5OTwT81ks';

const processDefinitionId = 'po_receipt_01:14:4504dc3c-3d69-11ed-8c09-a66bb63181bb';
const processInstanceId = 'cc9802f5-3e0b-11ed-8a93-3e102e803792';

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
