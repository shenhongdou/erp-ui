import React, { useState, useEffect, useMemo } from 'react';
import { Spin, Input, Empty, Tabs, version } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import ArticleList from './article-list';
import SearchResult from './search-result';
import ArticleDetail from './ArticleDetail';

import {
  fetchCategorys,
  fetchSubCategoryOrArticle,
  fetchArticleDetail,
  searchArticle,
} from './api';
import { ENV } from '../types/global';
import {
  SubCategoryOrArticleItemType,
  ArticleDetail as ArticleDetailType,
} from '../types/space-view';

import 'react-quill/dist/quill.core.css';
import '../styles/quill.table.css';
import './index.less';

// TODO 处理tab.panel兼容性问题
interface IProps {
  /**
   * @description       环境 'tb1' | 'dev' | 'prod' | 'pro' ('prod' | 'pro'都代表生产环境)
   */
  env: ENV;
  /**
   * @description       Authorization 不需要Bearer
   */
  token: string;
  /**
   * @description       Weki Token 数据取自于Space Management 请找对应的负责人获取
   */
  wekiToken: string;
  /**
   * @description       文章支持多语言 支持 'en' | "zh" | "zh-Hant" | "ko" | "ja" | "vi"
   * @default           'en'
   */
  language: string;
  /**
   *
   * @param data article数据
   * @returns 渲染的title
   */
  titleRightRender?: (data: any) => React.ReactNode;
  /**
   *
   * @param value
   * @returns
   */
  onSearchCallback?: (value: string) => void;

  /**
   *
   * @description
   *
   */
  onListItemClick: (id: number) => void;
}

export default (props: IProps) => {
  const {
    env,
    token,
    wekiToken,
    language = 'en',
    titleRightRender,
    onSearchCallback,
    onListItemClick,
  } = props;

  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [categorys, setCategorys] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState<string>(); // 当前选中的tab的key值
  const [stack, setStack] = useState<
    ({ type: 'list'; data: any[] } | { type: 'detail'; data: any })[]
  >([]);
  const [keywords, setKeywords] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [searchList, setSearchList] = useState<any[]>([]);

  const currentData = useMemo(() => stack.at(-1), [stack]);

  const getCategorys = async () => {
    setLoading(true);
    const ret = await fetchCategorys({ env, token, wekiToken, params: { language } }).catch((err) =>
      console.error(err),
    );
    setLoading(false);
    if (!ret?.result) return;
    setCategorys(ret.object);

    setCurrentTab(!ret.object ? '-1' : ret?.object?.[0]?.categoryId?.toString());
  };

  const getSubCategoryOrArticle = async (categoryId: number) => {
    const ret = await fetchSubCategoryOrArticle({
      env,
      token,
      wekiToken,
      params: { language, categoryId },
    }).catch((err) => console.error(err));

    return ret;
  };

  const getCurrentCategoryDetail = async (categoryId: number) => {
    if (!categoryId) return;

    setLoading(true);
    const ret = await getSubCategoryOrArticle(categoryId).catch((err) => console.error(err));
    setLoading(false);

    if (!ret?.result) return;

    setStack((stack) => [...(stack || []), { type: 'list', data: ret?.object || [] }]);
  };

  const getSearchList = async (keywords: string) => {
    setLoading(true);
    const ret = await searchArticle({
      env,
      token,
      wekiToken,
      params: { language, keywords },
    }).catch((err) => console.error(err));
    setLoading(false);

    setSearchList(ret?.object);
  };

  const handleSearch = (value: string) => {
    if (!value) {
      return;
    }

    setIsSearch(true);
    getSearchList(value);
    setKeywords('');
    typeof onSearchCallback === 'function' && onSearchCallback(value);
  };

  const getArticleDetail = async (articleId: number, language: string) => {
    setDetailLoading(true);
    const ret = await fetchArticleDetail({
      env,
      token,
      wekiToken,
      params: { articleId, language },
    }).catch((err) => console.error(err));
    setDetailLoading(false);

    setStack((stack) => [
      ...(stack || []),
      { type: 'detail', data: ret?.object || ({} as ArticleDetailType) },
    ]);
  };

  const handelBack = () => {
    stack?.splice(stack?.length - 1, 1);
    setStack([...stack]);
  };

  const handleTabChange = (activeKey: any) => {
    setStack(() => []);
    setCurrentTab(activeKey);
  };

  const handleCategoryOrArticleClick = (id: number, type: any) => {
    if (type === SubCategoryOrArticleItemType.Category) {
      return getCurrentCategoryDetail(id);
    }

    if (typeof onListItemClick === 'function') {
      onListItemClick(id);
    } else {
      getArticleDetail(id, language);
    }
  };

  useEffect(() => {
    currentTab && getCurrentCategoryDetail(+currentTab);
  }, [currentTab]);

  useEffect(() => {
    getCategorys();
  }, []);

  return (
    <div className="weki-space-view">
      <div className="weki-space-header">
        <Input.Search
          className="weki-space-search"
          allowClear
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          onSearch={handleSearch}
        />
      </div>

      <Spin spinning={loading} wrapperClassName="weki-loading">
        {isSearch ? (
          <SearchResult
            list={searchList}
            titleRightRender={titleRightRender}
            env={env}
            token={token}
            wekiToken={wekiToken}
            onListItemClick={onListItemClick}
            onBack={() => {
              setIsSearch(false);
              setSearchList([]);
            }}
          />
        ) : (
          <>
            {categorys?.length > 0 ? (
              <Tabs className="weki-categorys" activeKey={currentTab} onChange={handleTabChange}>
                {categorys?.map((item) => (
                  <Tabs.TabPane tab={item.categoryName} key={item.categoryId}>
                    <Spin spinning={detailLoading}>
                      {stack?.length > 1 && (
                        <a className="weki-back" onClick={handelBack}>
                          <LeftOutlined />
                          Back
                        </a>
                      )}

                      {currentData?.type === 'list' && (
                        <ArticleList
                          list={currentData?.data}
                          titleRightRender={titleRightRender}
                          handleCategoryOrArticleClick={handleCategoryOrArticleClick}
                        />
                      )}

                      {currentData?.type === 'detail' && (
                        <ArticleDetail
                          env={env}
                          token={token}
                          wekiToken={wekiToken}
                          data={currentData?.data}
                        />
                      )}
                    </Spin>
                  </Tabs.TabPane>
                ))}
              </Tabs>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </>
        )}
      </Spin>
    </div>
  );
};
