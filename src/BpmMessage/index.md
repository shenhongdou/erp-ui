## BpmMessage

Demo:

```tsx
import React from 'react';
import { BpmMessage } from '@weee-erp/erp-ui';

const TOKEN =
  'eyJraWQiOiI4NjBlYjQ4Yy0wNDFmLTQ1YTctYTAxOS0wNmQ3NjI0MjZhNjMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzg0ODkxZS03MDliLTRlZDYtYjUxMC0wOTQ5ZDQxOGFlZmUiLCJyb2xlX25hbWVzIjoiYWRtaW4sVE1TIEN1c3RvbWVyIFNlcnZpY2XvvIhDU--8iSxDUyBhZ2VudCxDUyBTdXBlcnZpc29yLENlbnRyYWwgQWRtaW5pc3RyYXRvciIsInVzZXJfaWQiOiIxMDAyMDgxNSIsInVzZXJfbmFtZSI6Imhvbmdkb3Uuc2hlbiIsImlzcyI6ImlzdGlvQHNheXdlZWUuY29tIiwiaWQiOiI3OTk1IiwidHlwZSI6InVzZXIiLCJleHAiOjE2OTk5OTY2MjYsInJlYWxtX2lkIjoiMyIsImlzX2xvZ2luIjp0cnVlLCJyb2xlX2lkcyI6IjQsMzcsNDQsNDUsNDYsNTQsNjAsNjgsNzAsNzYsODUsODgsOTAsOTIsOTcsOTksMTAyLDEwNSwxMjYsMTI3LDEzNCwxNTUsMTU2LDE1NywxNTksMTY1LDE2NiwxNjksMTc3LDE4MCwxOTksMjA1LDIwNiwyMDcsMjA4LDIwOSwyMTAsMjExLDIxMiwyMTMsMjE0LDIxNSwyMTYsMjE3LDIxOCwyMTksMjIwLDIyMSwyMjIsMjIzLDIyNCwyMjUsNDIxLDQ1NyJ9.3acuUZvkqJnEYzMc1eUpBKPfAS8dNlmN7YebW1RJRJ30K-1lcPtwt_dXWHPQo3MRybDEXp8Vv7ZgkSIADQEUXPS6gGR_VXep8mcLjsu1QUltgD6ToiDsUk-L4SnGvBWAzZtKt35arRtQDmCxt3FRN9BKK90zajSueXRJHtXI4ks';

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
        fixEditor
      ></BpmMessage>
    </div>
  );
};
```

<API src="./index.tsx"></API>
