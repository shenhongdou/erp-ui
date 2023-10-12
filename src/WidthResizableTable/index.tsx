import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Table } from 'antd';
import Cell from './Cell';

import './index.less';

/**
 * 1. 画一个handler，监听鼠标hover到哪一列，然后handler定位到对应的列最右边
 * 2. 拖动handler，改变handler的位置
 * 3. 释放handler的时候，根据拖动的距离计算对应的列改变后的列宽
 *  3.1 需要判断是放大还是缩小？
 *  3.2 整个table的宽度要进行对应的调整，不然布局会乱掉
 *  3.3 需要限制缩小的最小宽度，最大宽度需不需要限制？
 */

interface IProps {
  isPro?: boolean;
}
let xStart = 0;
let i = -1;
let off = false;
let curWidth = 0;

export default (props: IProps) => {
  const { isPro, columns: propColumns, ...resetProps } = props;

  const [handlePos, setHandlePos] = useState<{ left: number; top: number } | null>(null);
  const [columns, setColumns] = useState<any[]>([]);
  const [height, setHeight] = useState(0);
  const [tableSize, setTableSize] = useState<{ width: number; height: number }>();

  const ref = useRef<HTMLDivElement>(null);

  const components = {
    header: {
      cell: Cell,
    },
  };

  const handleCellMouseMove = (e, index) => {
    const { clientX, movementX, pageX, screenX } = e;

    const { right, top, width, height } = e.target.getBoundingClientRect();

    if (off) return;

    if (right - clientX <= 10) {
      setHandlePos({ left: right - 10, top });
      setHeight(height);
      i = index;
      curWidth = width;
    } else {
      setHandlePos(null);
      curWidth = 0;
      setHeight(0);
    }
  };

  const handleMouseDown = (e) => {
    off = true;
    xStart = e.clientX;
    document.onmousemove = (e) => {
      const { clientX, movementX, pageX, screenX } = e;

      setHandlePos((pos) => ({
        ...pos,
        left: clientX,
      }));
    };
  };

  const handleMouseUp = (e) => {
    setHandlePos(null);
    document.onmousemove = null;
    const dis = e.clientX - xStart;

    const cols = [...columns];

    cols[i] = { ...cols[i], width: Math.max((cols[i].width || curWidth) + dis, 50) };
    setColumns(cols);
    off = false;
  };

  useEffect(() => {
    const cols = propColumns?.map((col, index) => ({
      ...col,
      onHeaderCell: (column: any) => ({
        onMouseMove: (e) => handleCellMouseMove(e, index),
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
          console.log('The ' + mutation.attributeName + ' attribute was modified.', mutation);
          const { width, height } = mutation?.target?.getBoundingClientRect();
          setTableSize({ width, height });
        }
      }
    });

    observer.observe(table, { attributes: true, childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const width = useMemo(() => {
    let w = 0;
    for (let i = 0; i < columns?.length; i++) {
      w += columns[i]?.width || 0;
    }

    return w;
  }, [columns]);

  return (
    <div className="erp-table_container" ref={ref}>
      <Table
        {...resetProps}
        components={components}
        columns={columns}
        scroll={{ x: Math.max(width, tableSize?.width) }}
      ></Table>
      <div
        className="erp-table_handle"
        style={{ left: handlePos?.left, top: handlePos?.top, height: tableSize?.height }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      ></div>
    </div>
  );
};
