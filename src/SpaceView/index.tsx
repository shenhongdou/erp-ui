import React, { useState, useEffect, useMemo } from 'react';
import { Spin, Input, Empty, message, Tabs, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import MyIcon from '../MyIcon';

import {
  fetchCategorys,
  fetchSubCategoryOrArticle,
  fetchArticleDetail,
  markUseful,
  markUseless,
  searchArticle,
} from './api';
import { ENV } from '../types/global';
import { SubCategoryOrArticleItemType, ArticleDetail } from '../types/space-view';

import 'react-quill/dist/quill.core.css';
import '../styles/quill.table.css';
import './index.less';

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
}

export default (props: IProps) => {
  const { env, token, wekiToken, language = 'en' } = props;

  const [loading, setLoading] = useState(false);
  const [categorys, setCategorys] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState<string>(); // 当前选中的tab的key值
  const [stack, setStack] = useState<
    ({ type: 'list'; data: any[] } | { type: 'detail'; data: any })[]
  >([]);
  const [usefullLoading, setUsefullLoading] = useState(false);
  const [uselessLoading, setUselessLoading] = useState(false);
  const [keywords, setKeywords] = useState('');

  const currentData = useMemo(() => stack.at(-1), [stack]);

  const getCategorys = async () => {
    const ret = await fetchCategorys({ env, token, wekiToken, params: { language } }).catch((err) =>
      console.error(err),
    );

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

  const getArticleList = async (keywords: string) => {
    const ret = await searchArticle({
      env,
      token,
      wekiToken,
      params: { language, keywords },
    }).catch((err) => console.error(err));

    setStack((stack) => [...(stack || []), { type: 'list', data: ret?.object || [] }]);
  };

  const handleSearch = (value: string) => {
    if (!value) {
      return;
    }

    getArticleList(value);
    setKeywords('');
  };

  const getArticleDetail = async (articleId: number, language: string) => {
    const ret = await fetchArticleDetail({
      env,
      token,
      wekiToken,
      params: { articleId, language },
    }).catch((err) => console.error(err));

    setStack((stack) => [
      ...(stack || []),
      { type: 'detail', data: ret?.object || ({} as ArticleDetail) },
    ]);
  };

  const handelBack = () => {
    stack?.splice(stack?.length - 1, 1);
    setStack([...stack]);
  };

  const handleTabChange = (activeKey: any) => {
    setStack([]);
    setCurrentTab(activeKey);
  };

  const handleCategoryOrArticleClick = (id: number, type: any) => {
    if (type === SubCategoryOrArticleItemType.Category) {
      getCurrentCategoryDetail(id);
    } else {
      getArticleDetail(id, language);
    }
  };

  const handleUseful = async () => {
    setUsefullLoading(true);
    const ret = await markUseful({
      env,
      token,
      wekiToken,
      params: { articleId: currentData?.data?.articleId },
    }).catch((err) => console.error(err));
    setUsefullLoading(false);

    if (!ret?.result) return;
    message.success('Marked as useful!');
  };

  const handleUseless = async () => {
    setUselessLoading(true);
    const ret = await markUseless({
      env,
      token,
      wekiToken,
      params: { articleId: currentData?.data?.articleId },
    }).catch((err) => console.error(err));
    setUselessLoading(false);

    if (!ret?.result) return;
    message.success('Marked as useless!');
  };

  useEffect(() => {
    currentTab && getCurrentCategoryDetail(+currentTab);
  }, [currentTab]);

  useEffect(() => {
    getCategorys();
  }, []);

  return (
    <div className="weki-space-view">
      <Spin spinning={false} wrapperClassName="weki-loading">
        {categorys?.length > 0 && (
          <Tabs className="weki-categorys" activeKey={currentTab} onChange={handleTabChange}>
            {categorys?.map((item) => (
              <Tabs.TabPane tab={item.categoryName} key={item.categoryId}>
                <Spin spinning={loading}>
                  {currentData?.type === 'list' && (
                    <>
                      {item.categoryId != -1 && (
                        <div className="weki-search-wrapper">
                          <Input.Search
                            allowClear
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            onSearch={handleSearch}
                          />
                        </div>
                      )}

                      {stack?.length > 1 && (
                        <div className="weki-back" onClick={handelBack}>
                          <LeftOutlined />
                          Back
                        </div>
                      )}

                      {currentData?.data?.length > 0 &&
                        currentData?.data?.map((item) => {
                          if (item.type === SubCategoryOrArticleItemType.FAQ)
                            return (
                              <div key={item.id} className="weki-faq-item">
                                <div className="weki-faq-title-wrapper">
                                  <h3 className="weli-faq-title">{item.title}</h3>
                                </div>
                                <div
                                  className="richText ql-editor"
                                  dangerouslySetInnerHTML={{ __html: item.content }}
                                ></div>
                              </div>
                            );

                          return (
                            <a
                              className="weki-article-item-wrapper"
                              key={item.id}
                              onClick={() => handleCategoryOrArticleClick(item.id, item.type)}
                            >
                              <div className="weki-article-item">
                                {item.title}
                                <RightOutlined className="weki-to-right" />
                              </div>
                            </a>
                          );
                        })}

                      {!currentData?.data?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    </>
                  )}

                  {currentData?.type === 'detail' && (
                    <>
                      {stack?.length > 1 && (
                        <div className="weki-back" onClick={handelBack}>
                          <LeftOutlined />
                          Back
                        </div>
                      )}

                      <div className="weki-article-wrapper">
                        <div className="weki-article-title">{currentData?.data?.title}</div>

                        {currentData?.data?.type === SubCategoryOrArticleItemType.Link ? (
                          <div className="weki-link">
                            <a
                              className="weki-link-content"
                              target="_blank"
                              href={currentData?.data?.content || ''}
                            >
                              {currentData?.data?.title || ''}
                              <MyIcon type="icon-link1"></MyIcon>
                            </a>
                          </div>
                        ) : (
                          <div
                            className="richText ql-editor"
                            dangerouslySetInnerHTML={{ __html: currentData?.data?.content }}
                          ></div>
                        )}
                      </div>
                      <div className="weki-article-footer">
                        <div>Does the above answer help you:</div>
                        <div className="weki-use-wrapper">
                          <Button
                            className="weki-use-action"
                            disabled={currentData?.data?.useful === 1}
                            loading={usefullLoading}
                            onClick={handleUseful}
                          >
                            useful
                          </Button>
                          <Button
                            className="weki-use-action"
                            disabled={currentData?.data?.useful === 0}
                            loading={uselessLoading}
                            onClick={handleUseless}
                          >
                            useless
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </Spin>
              </Tabs.TabPane>
            ))}
          </Tabs>
        )}

        {!categorys?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </Spin>
    </div>
  );
};
