import React from 'react';
import { Card } from 'antd';
import classNames from 'classnames';

import './index.less';

export interface Item {
  businessKey: string;
  createTime: string;
  creator: string;
  flowName: string;
  onlineTableId: string;
  processInstanceTitle: string;
  onlineTable: {
    ticket_type: string;
  }[];
  status?: string;
  processInstanceId: string;
  processDefinitionId: string;
  taskId: string;
  taskCreateTime: string;
}

interface IProps {
  data: Item;
  onHeaderClick?: () => void;
}

export default (props: IProps) => {
  const { data, onHeaderClick } = props;

  const handleTitleClick = () => {
    typeof onHeaderClick === 'function' && onHeaderClick();
  };

  return (
    <Card
      className={classNames([
        'erp-todo-item__wrapper',
        { 'erp-todo-item__pending': data.status === 'pending' },
        { 'erp-todo-item__end': data.status === 'end' },
      ])}
      title={<div onClick={handleTitleClick}>{data?.processInstanceTitle}</div>}
      extra={data?.taskCreateTime}
    >
      <div className="erp-todo-item">
        <span className="erp-todo-item__header">Creator</span>
        <span className="erp-todo-item__content">{data?.creator || '--'}</span>
      </div>

      <div className="erp-todo-item">
        <span className="erp-todo-item__header">Current Node</span>
        <span className="erp-todo-item__content">{data?.flowName || '--'}</span>
      </div>

      <div className="erp-todo-item">
        <span className="erp-todo-item__header">Ticket Type</span>
        <span className="erp-todo-item__content">
          {data?.onlineTable?.[0]?.ticket_type || '--'}
        </span>
      </div>

      <div className="erp-todo-item">
        <span className="erp-todo-item__header">Create Time</span>
        <span className="erp-todo-item__content">{data.createTime || '--'}</span>
      </div>
    </Card>
  );
};
