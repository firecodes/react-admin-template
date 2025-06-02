import ContextBox from '@/components/ContextBox/ContextBox';
import { Button } from 'antd';
import { useCallback, useState } from 'react';

// webSocket实现数据更新通知
function UseCallbackWsData() {
  // 静态数据
  const list = [
    {
      id: 1,
      name: '1#设备',
    },
    {
      id: 2,
      name: '2#设备',
    },
  ];
  // webSocket 数据
  const [wsValue, setWsValue] = useState(new Map());

  // 自定义渲染函数
  const renderValue = useCallback(
    (id: number) => {
      return `设备: ${id}, 数据: ${wsValue.get(id)}`;
    },
    [wsValue],
  );

  return (
    <ContextBox title="useCallback 实现 webSocket 数据更新通知">
      <Button
        type="primary"
        onClick={() => {
          // 模拟webSocket推送更新数据
          const randomValue = Math.floor(Math.random() * 100);
          setWsValue((prevMap) => {
            const newMap = new Map(prevMap);
            // 随机1或者2
            const key = Math.floor(Math.random() * 2) + 1;
            newMap.set(key, randomValue);
            return newMap;
          });
        }}
      >
        模拟ws推送数据
      </Button>
      {list.map((item, index) => (
        <div key={index}>
          <div>{item.name}</div>
          {/* 当数据更新时需要更新 */}
          <div>实时数据：{renderValue(item.id)}</div>
        </div>
      ))}
      {JSON.stringify(wsValue)}
    </ContextBox>
  );
}

export default UseCallbackWsData;
