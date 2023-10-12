import React from 'react';

interface IProps {}

const ResizeableTitle = (props: IProps) => {
  const { ...restProps } = props;

  return <th {...restProps} />;
};

export default ResizeableTitle;
