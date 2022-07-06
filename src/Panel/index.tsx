import React, { useState } from 'react';
import classNames from 'classnames';
import { MenuFoldOutlined, MenuUnfoldOutlined, ReloadOutlined } from '@ant-design/icons';

import styles from './index.less';

interface IProps {
  /**
   * @description       panel的宽度
   * @default           320
   */
  width?: number | string;
  /**
   * @description       panel的高度
   * @default           500
   */
  height?: number | string;
  /**
   * @description       panel的标题
   * @default           320
   */
  title?: string;
  /**
   * @description       是否显示refresh icon
   * @default           true
   */
  showRefresh?: boolean;
  /**
   * @description       点击refresh回调
   * @default
   */
  refresh?: () => void;
}

const LeftPanel: React.FC<IProps> = (props) => {
  const { title, showRefresh = true, refresh, children, width = 320, height = 500 } = props;
  const [collapse, setCollapse] = useState(false);
  const [needAni, setNeedAni] = useState(false);

  const handleRefreshIconClick = () => {
    refresh && refresh();
  };

  return (
    <div
      style={{ width: collapse ? '32px' : width + 'px', height }}
      className={classNames([styles.contentLeft])}
    >
      <div className={classNames([styles.head, { [styles.collapse]: collapse }])}>
        {!collapse && <h2 className={styles.title}>{title}</h2>}
        <span>
          {showRefresh && !collapse && (
            <ReloadOutlined
              className={classNames([styles.marginRight10, styles.icon])}
              onClick={handleRefreshIconClick}
            />
          )}
          {showRefresh && !collapse ? (
            <MenuFoldOutlined
              className={classNames([styles.icon])}
              onClick={() => setCollapse(true)}
            />
          ) : (
            <MenuUnfoldOutlined
              className={classNames([styles.icon])}
              onClick={() => setCollapse(false)}
            />
          )}
        </span>
      </div>

      <div className={styles.content}>
        {collapse ? <div className={classNames([styles.titleVertical])}>{title}</div> : children}
      </div>
    </div>
  );
};

export default LeftPanel;
