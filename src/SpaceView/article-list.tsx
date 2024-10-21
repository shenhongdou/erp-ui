import React from 'react';
import { Empty } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import { SubCategoryOrArticleItemType } from '../types/space-view';

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
    <>
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
          <a
            className="weki-article-item-wrapper"
            key={item.id}
            onClick={() => handleArticleClick(item.id, item.type)}
          >
            <div className="weki-article-item">
              {item.title}
              <RightOutlined className="weki-to-right" />
            </div>
          </a>
        );
      })}
    </>
  );
};
