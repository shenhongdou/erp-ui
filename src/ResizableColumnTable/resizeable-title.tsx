import React from 'react';
import { Resizable } from 'react-resizable';

import 'react-resizable/css/styles.css';

interface IProps {
  onResize: () => void;
  width?: number;
}

const ResizeableTitle = (props: IProps) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize} resizeHandles={['e']}>
      <th {...restProps} />
    </Resizable>
  );
};

export default ResizeableTitle;
