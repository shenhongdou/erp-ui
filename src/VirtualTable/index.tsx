import type { TableProps } from 'antd';
import { Table, Spin } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';

const data = Array.from({ length: 10 }, (_, key) => ({ key }));

const VirtualTable = <RecordType extends object>(props: TableProps<RecordType>) => {
  const { columns, scroll } = props;
  const [tableWidth, setTableWidth] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(50);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const widthColumnCount = columns!.filter(({ width }) => !width).length;
  const mergedColumns = columns!.map((column) => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const noMore = useMemo(() => {
    return dataSource?.length >= total;
  }, [dataSource, total]);

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, 3000);
    });
    setDataSource((dataSource) => {
      return [
        ...dataSource,
        ...data?.map((item, index) => ({ key: dataSource?.length + index + 1 })),
      ];
    });

    setLoading(false);

    isFirstLoading && setIsFirstLoading(false);
  };

  const renderVirtualList = (rawData: readonly object[], { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 49;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > (scroll?.y as number) && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 49}
        width={tableWidth}
        onScroll={async ({ scrollLeft, scrollTop }: { scrollLeft: number; scrollTop: number }) => {
          onScroll({ scrollLeft });

          if (!gridRef?.current?._outerRef?.clientHeight) return;

          const isNotReachBottom =
            Math.ceil(scrollTop) < totalHeight - gridRef?.current?._outerRef?.clientHeight;

          if (isNotReachBottom || noMore || loading) return;

          loadMore();
        }}
      >
        {({
          columnIndex,
          rowIndex,
          style,
        }: {
          columnIndex: number;
          rowIndex: number;
          style: React.CSSProperties;
        }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
              'ant-table-cell-fix-left ant-table-cell-fix-left-last': columnIndex === 0,
            })}
            style={{
              ...style,
              boxSizing: 'border-box',
              padding: 8,
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            {(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <>
      <ResizeObserver
        onResize={({ width }) => {
          setTableWidth(width);
        }}
      >
        <Table
          {...props}
          className="virtual-table ant-table-ping-left"
          columns={mergedColumns}
          dataSource={dataSource as any[]}
          pagination={false}
          components={{
            body: renderVirtualList,
          }}
          loading={isFirstLoading}
          //   rowSelection={{ selectedRowKeys: [] }}
        />
      </ResizeObserver>
      <Spin spinning={!isFirstLoading && loading} size="small" style={{ width: '100%' }}></Spin>
      {noMore && <p style={{ textAlign: 'center' }}>没有更多了</p>}
    </>
  );
};

export default VirtualTable;
