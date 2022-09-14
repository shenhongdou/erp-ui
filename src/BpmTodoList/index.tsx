import React, { useState, useEffect } from 'react';
import { Input, Skeleton, Divider, Empty } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import MyIcon from '../MyIcon';
import BpmTodoItem, { Item } from '../BpmTodoItem';

import './index.less';

export type Sort = 'desc' | 'asc';

export interface IParams {
  pageNum: number;
  sort: Sort;
  isFirstLoading: boolean;
  keyword: string;
}

interface IProps {
  /**
   * @description 请求数据的方法
   */
  fetchData: (params: IParams) => Promise<{
    list: Item[];
    total: number;
  }>;

  /**
   * @description 点击头部的回调
   */
  onHeaderClick?: (data: Item) => void;
}

export default (props: IProps) => {
  const { fetchData, onHeaderClick } = props;

  const [list, setList] = useState<Item[]>([]);
  const [total, setTotal] = useState(Infinity);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [keyword, setKeyWord] = useState('');
  const [sort, setSort] = useState<Sort>('desc');

  const getList = async (pageNum: number, sort: Sort, isFirstLoading: boolean = true) => {
    if (typeof fetchData !== 'function') {
      console.error(new TypeError('fetchData should be a function'));
      return;
    }

    setLoading(true);
    const ret = await fetchData({ pageNum, sort, keyword, isFirstLoading }).catch(() => {});
    setLoading(false);

    if (!ret) return;
    const newList = pageNum === 1 ? ret?.list || [] : [...list, ...(ret?.list || [])];

    setList(newList);
    setTotal(ret?.total || 0);
  };

  const loadMore = () => {
    if (loading) return;
    setPageNum(pageNum + 1);
    getList(pageNum + 1, sort, false);
  };

  const handleSearch = () => {
    setPageNum(1);
    getList(1, sort);
  };

  const handleSort = () => {
    const newSort = sort === 'desc' ? 'asc' : 'desc';
    setSort(newSort);
    setPageNum(1);
    getList(1, newSort);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="erp-todo-list">
      <div className="erp-todo-list__header">
        <MyIcon className="erp-todo-list__search" type="icon-refresh" onClick={handleSearch} />

        <MyIcon className="erp-todo-list__sort" type="icon-paixu" onClick={handleSort} />

        <Input.Search
          className="erp-todo-list__keyword"
          value={keyword}
          onChange={(e) => setKeyWord(e.target.value)}
          onSearch={handleSearch}
        />
      </div>

      <div className="erp-todo-list__wrapper" id="listWrapper">
        {list?.length > 0 ? (
          <InfiniteScroll
            dataLength={list?.length}
            next={loadMore}
            hasMore={list?.length < total}
            loader={<Skeleton paragraph={{ rows: 3 }} active />}
            endMessage={<Divider plain>It is all, nothing more</Divider>}
            scrollableTarget="listWrapper"
          >
            {list?.map((item) => (
              <BpmTodoItem key={item.taskId} data={item} onHeaderClick={onHeaderClick} />
            ))}
          </InfiniteScroll>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};
