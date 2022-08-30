## Layout

#### jsx

```html
{/* 两栏布局 */}
<div className="{styles.wrapper}">
  <div className="{classNames([styles.column," styles.gap])}>
    content 1
    <br />
    content 2
    <br />
    content 3
    <br />
    content 4
    <br />
    content 5
    <br />
    content 6
    <br />
    content 7
    <br />
    content 8
    <br />
    content 9
    <br />
    content 10
    <br />
  </div>
  <div className="{styles.column}">
    content 1
    <br />
    content 2
    <br />
    content 3
    <br />
    content 4
    <br />
    content 5
    <br />
    content 6
    <br />
    content 7
    <br />
    content 8
    <br />
    content 9
    <br />
    content 10
    <br />
    content 11
    <br />
    content 12
    <br />
    content 13
    <br />
    content 14
    <br />
    content 15
    <br />
    content 16
    <br />
    content 17
    <br />
    content 18
    <br />
    content 19
    <br />
    content 20
    <br />
  </div>
</div>
```

```html

{/* 三栏布局 */}
<div className={styles.wrapper}>
  <div className={classNames([styles.column, styles.gap])}>
    <div className={styles['left-content']}></div>
  </div>

  <div className={classNames([styles.column, styles.gap])}></div>

  <div className={styles.column}></div>
</div>
```

```html
{/* 头部固定布局 */}
<div className="{styles.wrapper2}">
  <h2 className="{styles.header}">header</h2>
  <div className="{styles.content}">
    <div className="{styles.langHeight}">
      content 1
      <br />
      content 2
      <br />
      content 3
      <br />
      content 4
      <br />
      content 5
      <br />
      content 6
      <br />
      content 7
      <br />
      content 8
      <br />
      content 9
      <br />
      content 10
      <br />
      content 11
      <br />
      content 12
      <br />
      content 13
      <br />
      content 14
      <br />
      content 15
      <br />
      content 16
      <br />
      content 17
      <br />
      content 18
      <br />
      content 19
      <br />
      content 20
      <br />
      content 21
      <br />
      content 22
      <br />
      content 23
      <br />
      content 24
      <br />
      content 25
      <br />
      content 26
      <br />
      content 27
      <br />
      content 28
      <br />
      content 29
      <br />
      content 30
      <br />
    </div>
  </div>
</div>
```

#### css

```css
.wrapper {
  display: flex;
  margin: 20px;

  .column {
    flex: 1;
    padding: 16px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .gap {
    margin-right: 20px;
  }

  .left-content {
    height: 300px;
  }
}

.wrapper2 {
  position: relative;
  margin: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    padding: 16px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .content {
    height: 500px;
    padding-top: 100px;
    overflow: auto;
  }

  .langHeight {
    padding: 16px;
  }
}
```

```tsx
import React from 'react';
import { Layout } from '@weee-erp/erp-ui';

export default () => <Layout />;
```

<API src="./index.tsx"></API>
