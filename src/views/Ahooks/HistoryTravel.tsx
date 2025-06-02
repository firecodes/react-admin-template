import { useHistoryTravel } from 'ahooks';
import { Button, Space } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import Draggable from 'react-draggable';
import ContextBox from '@/components/ContextBox/ContextBox';

// 撤销 和 回退功能
const HistoryTravel = () => {
  const maxLength = 10;
  const { value, setValue, backLength, forwardLength, back, forward } =
    useHistoryTravel(
      new Map([
        ['1', { left: 100, top: 100 }],
        ['2', { left: 200, top: 200 }],
      ]),
      maxLength,
    );

  // 元素列表
  const elements = useMemo(() => {
    return value ? Array.from(value.entries()) : [];
  }, [value]);

  return (
    <ContextBox title="useHistoryTravel 实现撤销回退功能">
      <div>maxLength: {maxLength}</div>
      <div>backLength: {backLength}</div>
      <div>forwardLength: {forwardLength}</div>
      <Space>
        <Button onClick={back} type={'primary'}>
          Back
        </Button>
        <Button onClick={forward} type={'primary'}>
          Forward
        </Button>
        <Button
          type={'primary'}
          onClick={() => {
            const map = new Map(value);
            map.set(dayjs().unix().toString(), { left: 300, top: 300 });
            setValue(map);
          }}
        >
          Add
        </Button>
      </Space>
      {elements.map(([key, item]) => (
        <Draggable
          key={key}
          position={{ x: item.left, y: item.top }}
          onStop={(_e, data) => {
            const map = new Map(value);
            map.set(key, {
              left: data.x,
              top: data.y,
            });
            setValue(map);
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              backgroundColor: 'red',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="target"
          >
            Target{key}
            <Button
              onClick={() => {
                const map = new Map(value);
                map.delete(key);
                setValue(map);
              }}
            >
              Delete
            </Button>
          </div>
        </Draggable>
      ))}
    </ContextBox>
  );
};

export default HistoryTravel;
