import React, { useMemo, useState, useEffect } from 'react';
import { Spin, Table } from 'antd';

interface IProps {
  [key: string]: any;
}

const columns = [
  { title: 'Index', dataIndex: 'index', width: 150 },
  { title: 'A', dataIndex: 'a', width: 150 },
  { title: 'B', dataIndex: 'b' },
  { title: 'C', dataIndex: 'c' },
  { title: 'D', dataIndex: 'd' },
  { title: 'E', dataIndex: 'e', width: 200 },
  { title: 'F', dataIndex: 'f', width: 100 },
];

const data = [
  { id: 'a', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { id: 'b', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { id: 'c', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { id: 'd', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { id: 'e', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { id: 'f', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { id: 'a1', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { id: 'a2', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { id: 'a3', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { id: 'a4', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  // { id: 'a5', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  // { id: 'a6', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
];

const ScrollTable = (props: IProps) => {
  const { fetch, ...tableProps } = props;

  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(50);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const noMore = useMemo(() => {
    return dataSource?.length >= total;
  }, [dataSource, total]);

  const loadMore = async () => {
    setLoading(true);
    const data = await fetch();
    setDataSource((dataSource) => {
      return [
        ...dataSource,
        ...data?.map((item, index) => ({ index: dataSource?.length + index + 1, ...item })),
      ];
    });
    setLoading(false);
    isFirstLoading && setIsFirstLoading(false);
  };

  const handleScroll = (e: any) => {
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;
    const scrollTop = e.target.scrollTop;

    const isNotReachBottom = scrollTop < scrollHeight - clientHeight;

    if (isNotReachBottom || noMore || loading) return;

    loadMore();
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div onScrollCapture={handleScroll}>
      <Table {...tableProps} dataSource={dataSource} pagination={false} loading={isFirstLoading} />
      <Spin spinning={!isFirstLoading && loading} style={{ width: '100%' }}></Spin>
      {noMore && <p style={{ textAlign: 'center' }}>没有更多了</p>}
    </div>
  );
};

export default () => {
  const fetch = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 3000);
    });
  };

  return <ScrollTable fetch={fetch} columns={columns} rowKey="index" scroll={{ x: 800, y: 300 }} />;
};
