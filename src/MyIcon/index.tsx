import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { IconFontProps } from '@ant-design/icons/lib/components/IconFont';

const IconFont = createFromIconfontCN({
  scriptUrl: '/erp-ui/iconfont_20220823.js',
});

const MyIcon: React.FC<IconFontProps> = (props) => {
  return <IconFont {...props} />;
};

export default MyIcon;
