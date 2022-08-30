import React from 'react';
import classNames from 'classnames';

import styles from './index.less';

export default () => {
  return (
    <>
      {/* 两栏布局 */}
      <h2>两栏等高布局</h2>
      <div className={styles.wrapper}>
        <div className={classNames([styles.column, styles.gap])}>
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
        </div>
        <div className={styles.column}>
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
        </div>
      </div>

      {/* 三栏布局 */}
      <h2>三栏等高布局</h2>
      <div className={styles.wrapper}>
        <div className={classNames([styles.column, styles.gap])}>
          <div className={styles['left-content']}></div>
        </div>

        <div className={classNames([styles.column, styles.gap])}></div>

        <div className={styles.column}></div>
      </div>

      {/* 头部固定布局 */}
      <h2>头部固定布局</h2>
      <div className={styles.wrapper2}>
        <h2 className={styles.header}> header </h2>
        <div className={styles.content}>
          <div className={styles.langHeight}>
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
    </>
  );
};
