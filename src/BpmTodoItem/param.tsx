interface IProps {
  /**
   * @description 页数
   */
  pageNum: number;
  /**
   * @description 排序
   */
  sort: 'desc' | 'asc';
  /**
   * @description 是否是第一次加载数据
   */
  isFirstLoading: boolean;
  /**
   * @description 搜索关键词
   */
  keyWord: string;
}

export default (props: IProps) => {
  return null;
};
