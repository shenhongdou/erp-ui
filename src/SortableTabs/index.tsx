import React, { useEffect, useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, closestCenter, useSensor } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import DraggableTabNode from './DraggableTabNode';

interface IProps extends Omit<TabsProps, 'onDragEnd'> {
  onDragEnd: (active: any, over: any) => void;
}

const formatKey = (key: any) => {
  if (typeof key === 'number') return key.toString();
  return key;
};

const SortableTabs: React.FC<IProps> = (props) => {
  const {
    items,
    onDragEnd: propOnDragEnd,
    activeKey: propActiveKey,
    className,
    ...tabProps
  } = props;
  const [innerItems, setInnerItems] = useState<typeof items>([]);
  const [activeKey, setActiveKey] = useState<string>(formatKey(propActiveKey));

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });

  const findIndex = (items: any[], id?: number | string) => {
    if (!id) return -1;

    return items?.findIndex((item) => {
      if (typeof item.key === 'number') return item.key == +id;

      return item.key === id;
    });
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setInnerItems((prev) => {
        const activeIndex = findIndex(prev || [], active.id);
        const overIndex = findIndex(prev || [], over?.id);

        return arrayMove(prev || [], activeIndex, overIndex);
      });

      typeof propOnDragEnd === 'function' && propOnDragEnd(active, over);
    }
  };

  useEffect(() => {
    setInnerItems(
      (items || [])?.map((item) => ({
        ...item,
        key: formatKey(item.key),
      })),
    );
  }, [items]);

  useEffect(() => {
    setActiveKey(formatKey(propActiveKey));
  }, [propActiveKey]);

  return (
    <Tabs
      {...tabProps}
      className={`erp-sortable-tabs${className ? ' ' + className : ''}`}
      activeKey={activeKey}
      items={innerItems}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd} collisionDetection={closestCenter}>
          <SortableContext
            items={innerItems?.map((i) => i.key) || []}
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
