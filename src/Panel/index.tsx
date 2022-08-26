import React, { useState } from 'react';
import classNames from 'classnames';
import { MenuFoldOutlined, MenuUnfoldOutlined, ReloadOutlined } from '@ant-design/icons';

import './index.less';

interface IProps {
  /**
   * @description       panel容器的classname
   *
   */
  className?: string;
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
   * @default
   */
  title?: string;
  /**
   * @description       是否显示refresh icon
   * @default           true
   */
  showRefresh?: boolean;
  /**
   * @description       点击refresh icon的回调函数
   * @default
   */
  refresh?: () => void;
  /**
   * @description       panel要渲染的内容
   * @default
   */
  children?: React.ReactNode;
}

const LeftPanel: React.FC<IProps> = (props) => {
  const {
    title,
    showRefresh = true,
    refresh,
    children,
    width = 320,
    height = 500,
    className,
  } = props;
  const [collapse, setCollapse] = useState(false);

  const handleRefreshIconClick = () => {
    refresh && refresh();
  };

  return (
    <div
      style={{ width: collapse ? 32 : width, height }}
      className={classNames(['erp-panel', className])}
    >
      <div className={classNames(['erp-panel__head', { 'erp-panel__collapse': collapse }])}>
        {!collapse && <h2 className="erp-panel__title">{title}</h2>}
        <span>
          {showRefresh && !collapse && (
            <ReloadOutlined
              className="erp-panel__icon erp-panel__icon-refresh"
              onClick={handleRefreshIconClick}
            />
          )}
          {showRefresh && !collapse ? (
            <MenuFoldOutlined className="erp-panel__icon" onClick={() => setCollapse(true)} />
          ) : (
            <MenuUnfoldOutlined className="erp-panel__icon" onClick={() => setCollapse(false)} />
          )}
        </span>
      </div>

      <div className="erp-panel__content">
        {collapse ? <div className="erp-panel__title-vertical">{title}</div> : children}
      </div>
    </div>
  );
};

export default LeftPanel;
