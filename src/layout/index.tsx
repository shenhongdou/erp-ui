import React from 'react';
import classNames from 'classnames';

import styles from './index.less';

export default () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={classNames([styles.column, styles.gap])}>
          <div className={styles['left-content']}></div>
        </div>
        <div className={styles.column}></div>
      </div>

      <div className={styles.wrapper}>
        <div className={classNames([styles.column, styles.gap])}>
          <div className={styles['left-content']}></div>
        </div>

        <div className={classNames([styles.column, styles.gap])}></div>

        <div className={styles.column}></div>
      </div>
    </>
  );
};
