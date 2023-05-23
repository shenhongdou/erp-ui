## BpmMessage

Demo:

```tsx
import React from 'react';
import { BpmMessage } from '@weee-erp/erp-ui';

const TOKEN =
  'eyJraWQiOiI4NjBlYjQ4Yy0wNDFmLTQ1YTctYTAxOS0wNmQ3NjI0MjZhNjMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MWY0OTkyZi1hYjQ5LTQ3ZWUtOTQ2Mi00YjU4MjcxZTU4MDgiLCJyb2xlX25hbWVzIjoiYWRtaW4sQ1MgYWRtaW4sVE1TIEN1c3RvbWVyIFNlcnZpY2XvvIhDU--8iSxDUyBhZ2VudCxDZW50cmFsIEFkbWluaXN0cmF0b3IiLCJ1c2VyX2lkIjoiMTAwMjA4MTUiLCJ1c2VyX25hbWUiOiJob25nZG91LnNoZW4iLCJpc3MiOiJpc3Rpb0BzYXl3ZWVlLmNvbSIsImlkIjoiNzk5NSIsInR5cGUiOiJ1c2VyIiwiZXhwIjoxNjg3MjgzODAyLCJyZWFsbV9pZCI6IjMiLCJpc19sb2dpbiI6dHJ1ZSwicm9sZV9pZHMiOiI0LDM2LDM3LDQ0LDQ2LDU0LDYwLDEyNywxMzAsMTU5LDE2NiwxNjksMTc3LDE5OSwyMDUsMjA2LDIwNywyMDgsMjA5LDIxMCwyMTEsMjEyLDIxMywyMTQsMjE1LDIxNiwyMTcsMjE4LDIxOSwyMjAsMjIxLDIyMiwyMjMsMjI0LDIyNSJ9.WGFj4i71ylwkprWykNFMKrOVI0FlNkvNvxAhCGvctTLO8pMTTZBDxx6N00om7O93c6s9aE8AjCrDmmbkfeQSsk0WWXJCYTogxBDfeT75CnALBNZYMG5-CxnHKcMuMpEs31ua2n2LhDVET2TdpizRmXs6t_aRSVCC20xT7d5s9f4';

const processDefinitionId = 'cs_to_crm:15:e3ba498e-e589-11ed-af84-66fa7f46f45d';
const processInstanceId = 'a2aeac5e-f60c-11ed-bce4-0eedee25d1df';

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
