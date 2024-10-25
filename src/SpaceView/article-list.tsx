import React from 'react';
import { Empty } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import MyIcon from '../MyIcon';

import { SubCategoryOrArticleItemType } from '../types/space-view';

import './article-list.less';

interface IProps {
  list: any[];
  titleRightRender?: (data: any) => React.ReactNode;
  handleCategoryOrArticleClick: (id: number, type: any) => void;
}

export default (props: IProps) => {
  const { list, titleRightRender, handleCategoryOrArticleClick } = props;

  const handleArticleClick = (id: number, type: any) => {
    typeof handleCategoryOrArticleClick === 'function' && handleCategoryOrArticleClick(id, type);
  };

  if (!list?.length) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  return (
    <div className="weki-article-list">
      {list?.map((item) => {
        if (item.type === SubCategoryOrArticleItemType.FAQ)
          return (
            <div key={item.id} className="weki-faq-item">
              <div className="weki-faq-title-wrapper">
                <h3 className="weli-faq-title">{item.title}</h3>
                {typeof titleRightRender === 'function' && titleRightRender(item)}
              </div>
              <div
                className="richText ql-editor"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>
            </div>
          );

        return (
          <div
            className="weki-article-item-wrapper"
            key={item.id}
            onClick={() => handleArticleClick(item.id, item.type)}
          >
            <div className="weki-article-item">
              <a>
                {item.type !== SubCategoryOrArticleItemType.Category && (
                  <MyIcon type="icon-line-articlewenzhang" className="weki-article-icon" />
                )}

                {item.title}
              </a>
              <RightOutlined className="weki-to-right" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
