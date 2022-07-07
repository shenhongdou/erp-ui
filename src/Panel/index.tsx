import React, { useState } from 'react';
import classNames from 'classnames';
import { MenuFoldOutlined, MenuUnfoldOutlined, ReloadOutlined } from '@ant-design/icons';

import './index.less';

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
   * @default
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
    <div style={{ width: collapse ? '32px' : width + 'px', height }} className="contentLeft">
      <div className={classNames(['head', { collapse: collapse }])}>
        {!collapse && <h2 className="title">{title}</h2>}
        <span>
          {showRefresh && !collapse && (
            <ReloadOutlined
              className={classNames(['marginRight10', 'icon'])}
              onClick={handleRefreshIconClick}
            />
          )}
          {showRefresh && !collapse ? (
            <MenuFoldOutlined className="icon" onClick={() => setCollapse(true)} />
          ) : (
            <MenuUnfoldOutlined className="icon" onClick={() => setCollapse(false)} />
          )}
        </span>
      </div>

      <div className="content">
        {collapse ? <div className="titleVertical">{title}</div> : children}
      </div>
    </div>
  );
};

export default LeftPanel;
