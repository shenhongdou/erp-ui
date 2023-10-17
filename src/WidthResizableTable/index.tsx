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

  const [handlePos, setHandlePos] = useState<{ left: number; top?: number } | null>(null);
  const [columns, setColumns] = useState<ColumnType<T>[]>([]);
  const [tableRect, setTableRect] = useState<{ width: number; height: number }>();

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
    if (isMovingRef.current || (e?.target as HTMLElement)?.tagName !== 'TH') return; // 如果正在进行拖拽，不走以下逻辑， 配置了fixed后span标签也会被绑定此事件

    const { clientX } = e; // clientX,鼠标在屏幕的横坐标值，
    const { right, width, top } = (e.target as HTMLElement).getBoundingClientRect();

    if (right - clientX <= 10) {
      setHandlePos({ left: right - 5, top });
    }

    curCellInfoRef.current = { index, width };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMovingRef.current = true;
    xStartRef.current = e.clientX;

    document.onmousemove = (e) => {
      setHandlePos((pos) => ({ left: e.clientX, top: pos?.top }));
    };
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setHandlePos(null);
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
    if (handlePos?.left && Math.abs(e.clientX - handlePos.left) > 20) {
      setHandlePos(null);
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
          const { width, height } = (mutation?.target as HTMLTableElement)?.getBoundingClientRect();

          setTableRect({ width, height });
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
        style={{
          left: `${handlePos?.left || -1000}px`,
          top: `${handlePos?.top}px`,
          height: tableRect?.height,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      ></div>
    </div>
  );
};
