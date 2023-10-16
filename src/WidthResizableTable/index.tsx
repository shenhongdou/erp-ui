import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';

import './index.less';

/**
 * 1. 画一个handler，监听鼠标hover到哪一列，然后handler定位到对应的列最右边
 * 2. 拖动handler，改变handler的位置
 * 3. 释放handler的时候，根据拖动的距离计算对应的列改变后的列宽
 *  3.1 需要判断是放大还是缩小？
 *  3.2 整个table的宽度要进行对应的调整，不然布局会乱掉
 *  3.3 需要限制缩小的最小宽度，最大宽度需不需要限制？
 */

interface IProps<T> {
  columns: ColumnType<T>[];
  isPro?: boolean;
  scroll?: {
    x?: number | true | string;
    y?: number | string;
  };
}

const MIN_WIDTH = 50;

export default <T extends Record<string, any>>(props: IProps<T>) => {
  const { isPro, columns: propColumns, scroll, ...resetProps } = props;

  const [handlePosLeft, setHandlePosLeft] = useState<number | null>(null);
  const [columns, setColumns] = useState<ColumnType<T>[]>([]);
  const [tableRect, setTableSize] = useState<{ width: number; height: number; top: number }>();

  const ref = useRef<HTMLDivElement>(null);
  const isMovingRef = useRef(false);
  const xStartRef = useRef(0);
  const curCellInfoRef = useRef({ index: -1, width: 0 });

  const width = useMemo(
    () => columns?.reduce((acc, cur) => +(cur?.width || MIN_WIDTH) + acc, 0),
    [columns],
  );

  // 监听鼠标移动事件，确定handler的显示与否以及显示的位置
  const handleCellMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const { clientX } = e;

    const { right, width } = (e.target as HTMLElement).getBoundingClientRect();

    if (isMovingRef.current) return; // 如果正在进行拖拽，不走以下逻辑

    if (right - clientX <= 10) {
      setHandlePosLeft(right - 5);
    }

    curCellInfoRef.current = { index, width };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMovingRef.current = true;
    xStartRef.current = e.clientX;

    document.onmousemove = (e) => {
      setHandlePosLeft(e.clientX);
    };
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setHandlePosLeft(null);
    document.onmousemove = null;

    if (curCellInfoRef.current.index === -1) return;
    // 重新计算列宽
    const dis = e.clientX - xStartRef.current;
    const cols = [...columns];

    cols[curCellInfoRef.current.index] = {
      ...cols[curCellInfoRef.current.index],
      width: Math.max(
        +(cols[curCellInfoRef.current.index].width || curCellInfoRef.current.width) + dis,
        MIN_WIDTH,
      ),
    };
    setColumns(cols);

    isMovingRef.current = false;
  };

  const handleWrapperMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (handlePosLeft && Math.abs(e.clientX - handlePosLeft) > 20) {
      setHandlePosLeft(null);
    }
  };

  useEffect(() => {
    const cols: ColumnType<T>[] = propColumns?.map((col, index) => ({
      ...col,
      onHeaderCell: () => ({
        onMouseMove: (e: React.MouseEvent<any>) => handleCellMouseMove(e, index),
      }),
    }));

    setColumns(cols);
  }, [propColumns]);

  useEffect(() => {
    const table = ref?.current?.querySelector('table');
    if (!table) return;

    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const { width, height, top } = (
            mutation?.target as HTMLTableElement
          )?.getBoundingClientRect();
          setTableSize({ width, height, top });
        }
      }
    });

    observer.observe(table, { attributes: true, childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="erp-table_container" ref={ref} onMouseMove={handleWrapperMouseMove}>
      {isPro ? (
        <ProTable
          {...resetProps}
          columns={columns as ProColumns<T, 'text'>[]}
          scroll={{ ...(scroll || {}), x: Math.max(width, tableRect?.width || 0) }}
        ></ProTable>
      ) : (
        <Table
          {...resetProps}
          columns={columns}
          scroll={{ ...(scroll || {}), x: Math.max(width, tableRect?.width || 0) }}
        ></Table>
      )}

      <div
        className="erp-table_handle"
        style={{ left: handlePosLeft || -1000, top: tableRect?.top, height: tableRect?.height }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      ></div>
    </div>
  );
};
