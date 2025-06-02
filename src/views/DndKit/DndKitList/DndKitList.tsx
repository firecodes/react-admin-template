import React, { useState } from 'react';
import ContextBox from '@/components/ContextBox/ContextBox';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import SortableItem from './SortableItem';

const DndKitList = () => {
  // const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
    }
  };

  //拖拽传感器，在移动像素5px范围内，不触发拖拽事件
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // 按住不动移动5px 时 才进行拖拽, 这样就可以触发点击事件
      },
    }),
  );

  return (
    <ContextBox title="dnd-kit 实现列表拖拽排序" bodyStyle={{ width: 500 }}>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div>
            {items.map((item) => (
              <SortableItem key={item.id} {...item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </ContextBox>
  );
};

export default DndKitList;
