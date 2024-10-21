import React, { useEffect, useMemo, useState } from 'react';
import { message, Button, Spin } from 'antd';

import MyIcon from '../MyIcon';

import { SubCategoryOrArticleItemType } from '../types/space-view';
import { markUseful, markUseless, fetchArticleDetail } from './api';
import { ENV } from '../types/global';

interface IProps {
  data?: any;
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

  id?: number;

  language?: string;
}

export default (props: IProps) => {
  const { data: propData, env, token, wekiToken, id, language } = props;

  const [usefullLoading, setUsefullLoading] = useState(false);
  const [uselessLoading, setUselessLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [innerData, setInnerData] = useState<any>();

  const data = useMemo(() => {
    if (typeof propData !== 'undefined') return propData;
    return innerData;
  }, [propData, innerData]);

  const handleUseful = async () => {
    setUsefullLoading(true);
    const ret = await markUseful({
      env,
      token,
      wekiToken,
      params: { articleId: data?.articleId },
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
      params: { articleId: data?.articleId },
    }).catch((err) => console.error(err));
    setUselessLoading(false);

    if (!ret?.result) return;
    message.success('Marked as useless!');
  };

  const getArticleDetail = async (articleId: number, language: string = 'en') => {
    setLoading(true);
    const ret = await fetchArticleDetail({
      env,
      token,
      wekiToken,
      params: { articleId, language },
    }).catch((err) => console.error(err));
    setLoading(false);
    setInnerData(ret?.object);
  };

  useEffect(() => {
    if (typeof data === 'undefined' && typeof id !== 'undefined') {
      getArticleDetail(id, language);
    }
  }, [data, id]);

  return (
    <Spin spinning={loading}>
      <div className="weki-article-wrapper">
        <div className="weki-article-title">{data?.title}</div>

        {data?.type === SubCategoryOrArticleItemType.Link ? (
          <div className="weki-link">
            <a className="weki-link-content" target="_blank" href={data?.content || ''}>
              {data?.title || ''}
              <MyIcon type="icon-link1"></MyIcon>
            </a>
          </div>
        ) : (
          <div
            className="richText ql-editor"
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
        )}
      </div>
      <div className="weki-article-footer">
        <div>Does the above answer help you:</div>
        <div className="weki-use-wrapper">
          <Button
            className="weki-use-action"
            disabled={data?.useful === 1}
            loading={usefullLoading}
            onClick={handleUseful}
          >
            useful
          </Button>
          <Button
            className="weki-use-action"
            disabled={data?.useful === 0}
            loading={uselessLoading}
            onClick={handleUseless}
          >
            useless
          </Button>
        </div>
      </div>
    </Spin>
  );
};
