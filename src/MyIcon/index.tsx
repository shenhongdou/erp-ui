import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { IconFontProps } from '@ant-design/icons/lib/components/IconFont';

const IconFont = createFromIconfontCN({
  scriptUrl: '/iconfont_20241021.js',
});

const MyIcon: React.FC<IconFontProps> = (props) => {
  return <IconFont {...props} />;
};

export default MyIcon;
