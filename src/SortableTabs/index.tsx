import React, { useEffect, useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, closestCenter, useSensor } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Tabs } from 'antd';

import DraggableTabNode from './DraggableTabNode';

interface IProps {
  items: any[];
  onDragEnd: (active: any, over: any) => void;
}

const SortableTabs: React.FC<IProps> = (props) => {
  const { items, onDragEnd: propOnDragEnd, ...tabProps } = props;
  const [innerItems, setInnerItems] = useState(items);

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setInnerItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });

      typeof propOnDragEnd === 'function' && propOnDragEnd(active, over);
    }
  };

  useEffect(() => {
    setInnerItems(items);
  }, [items]);

  return (
    <Tabs
      {...tabProps}
      items={innerItems}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd} collisionDetection={closestCenter}>
          <SortableContext
            items={innerItems.map((i) => i.key)}
            strategy={horizontalListSortingStrategy}
          >
            <DefaultTabBar {...tabBarProps}>
              {(node) => (
                <DraggableTabNode {...node.props} key={node.key} data-node-key={node.key}>
                  {node}
                </DraggableTabNode>
              )}
            </DefaultTabBar>
          </SortableContext>
        </DndContext>
      )}
    />
  );
};

export default SortableTabs;
