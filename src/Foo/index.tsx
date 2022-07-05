import React, { useState } from 'react';

import Button from 'antd/es/button';
import 'antd/es/button/style/index.css';

export default ({ title }: { title: string }) => {
  const [count, setCount] = useState(0);
  return (
    <h1>
      {title}
      {count}
      <Button type="primary" onClick={() => setCount(count + 1)}>
        按钮
      </Button>
    </h1>
  );
};
