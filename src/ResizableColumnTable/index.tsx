import React, { useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import ResizeableTitle from './ResizeableTitle';
import '../global.less';

interface IProps<T = any> {
  columns: ColumnsType<T>[];
  dataSource: T[];
}

export default (props: IProps) => {
  const { columns = [], dataSource = [], ...otherProps } = props;
  const [newColumns, setNewColumns] = useState(
    columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column: any) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
    })),
  );

  const components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  const handleResize =
    (index: number) =>
    (e: any, { size }: any) => {
      setNewColumns((columns) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size?.width,
        };
        return nextColumns;
      });
    };

  return (
    <Table
      bordered
      components={components}
      columns={newColumns}
      dataSource={dataSource}
      {...otherProps}
    />
  );
};
