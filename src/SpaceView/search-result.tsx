import React, { useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';

import ArticleList from './article-list';
import ArticleDetail from './article-detail';

import { ENV } from '../types/global';

interface IProps {
  list: any[];
  titleRightRender?: (data: any) => React.ReactNode;
  env: ENV;
  /**
   * @description       Authorization 不需要Bearer
   */
  token: string;
  /**
   * @description       Weki Token 数据取自于Space Management 请找对应的负责人获取
   */
  wekiToken: string;

  onBack: () => void;

  onListItemClick: (id: number) => void;
}

export default (props: IProps) => {
  const { list, titleRightRender, env, token, wekiToken, onBack, onListItemClick } = props;
  const [currentArticle, setCurrentArticle] = useState<any>();

  const handleBack = () => {
    if (!currentArticle) {
      onBack();
      return;
    }

    setCurrentArticle(undefined);
  };

  return (
    <div>
      <div>
        <a className="weki-back" onClick={handleBack}>
          <LeftOutlined />
          Back
        </a>
      </div>
      {currentArticle ? (
        <ArticleDetail env={env} token={token} wekiToken={wekiToken} data={currentArticle} />
      ) : (
        <ArticleList
          list={list}
          titleRightRender={titleRightRender}
          handleCategoryOrArticleClick={(id, type) => {
            if (typeof onListItemClick === 'function') {
              return onListItemClick(id);
            }
            const current = list.find((item) => item.id === id);
            setCurrentArticle(current);
          }}
        />
      )}
    </div>
  );
};
