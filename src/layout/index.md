## Layout

### 多栏等高布局

#### jsx

```html
<div className="wrapper">
  <div className="left">
    <div className="left-content"></div>
  </div>
  <div className="right"></div>
</div>
```

#### css

```css
.wrapper {
  display: flex;
  margin: 20px; // 根据场景自行定义margin值

  .left,
  .right {
    flex: 1; // 如果某一栏需要固定宽度，不定义flex值，给定width
    background: #fff; // 根据场景自行定义背景颜色
  }

  .left {
    margin-right: 20px; // 根据场景自行定义左右元素间距

    .left-content {
      height: 600px; // 内容高度，根据实际场景，可以不定义，由内容撑开高度
    }
  }
}
```

```tsx
import React from 'react';
import { Layout } from '@weee-erp/erp-ui';

export default () => <Layout />;
```

<API src="./index.tsx"></API>
