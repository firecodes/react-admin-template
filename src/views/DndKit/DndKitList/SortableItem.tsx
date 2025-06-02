import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { CSSProperties, FC } from 'react';
import { Button } from 'antd';

interface IProps {
  id: number;
  name: string;
}

const SortableItem: FC<IProps> = (props) => {
  const { id, name } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '10px',
    margin: '5px',
    backgroundColor: 'red',
    border: '1px solid #ddd',
    cursor: 'move',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>{name}</div>
      <Button
        onClick={() => {
          alert('点击事件');
        }}
      >
        修改
      </Button>
    </div>
  );
};

export default SortableItem;
