import React, { useEffect, useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';

import Row from './row';

interface IProps<T = any> {
  rowKey: string;
  columns: ColumnType<T>[];
  dataSource: T[];
  onDrop: (active: any, over: any, isDragUp: boolean) => void;
  isPro?: boolean;
}

const DragSortTable = <DataType extends Record<string, any>>(props: IProps<DataType>) => {
  const { rowKey, columns, dataSource, onDrop, isPro = false, ...resetTableProps } = props;

  const [data, setData] = useState<DataType[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over, delta } = e;

    if (active?.id === over?.id) return;

    setData((prev) => {
      const activeIndex = prev.findIndex((i) => i?.[rowKey] === active?.id);
      const overIndex = prev.findIndex((i) => i?.[rowKey] === over?.id);

      return arrayMove(prev, activeIndex, overIndex);
    });

    const isDragUp = delta.y < 0; // 是往上拖拽还是往下拖拽

    typeof onDrop === 'function' && onDrop(active, over, isDragUp);
  };

  useEffect(() => {
    dataSource && setData(dataSource);
  }, [dataSource]);

  return (
    <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={data?.map((i) => i?.[rowKey])} strategy={verticalListSortingStrategy}>
        {isPro ? (
          <ProTable
            rowKey={rowKey}
            components={{
              body: {
                row: Row,
              },
            }}
            columns={columns as ProColumns<DataType, 'text'>[]}
            dataSource={data}
            {...resetTableProps}
          ></ProTable>
        ) : (
          <Table
            rowKey={rowKey}
            components={{
              body: {
                row: Row,
              },
            }}
            columns={columns}
            dataSource={data}
            {...resetTableProps}
          />
        )}
      </SortableContext>
    </DndContext>
  );
};

export default DragSortTable;
