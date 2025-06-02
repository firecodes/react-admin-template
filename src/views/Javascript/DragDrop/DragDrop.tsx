import { Flex } from 'antd';
import React, { useState } from 'react';

// 拖拽组件到指定区域放置问题
const DragDrop = () => {
  // 组件状态
  const [elements, setElements] = useState([
    { key: '1', style: { left: 200, top: 200 } },
  ]);
  // 缩放比例
  const scale = 0.7;

  return (
    <div style={{ padding: 16 }}>
      <h2>onDrop 拖拽组件到指定区域放置示例</h2>
      <Flex style={{ height: 700 }}>
        <div style={{ width: 120 }}>
          <div
            style={{ width: 100, height: 100, backgroundColor: 'red' }}
            draggable
          >
            组件1
          </div>
        </div>
        <div
          className="container"
          style={{
            width: 1000,
            border: '1px solid red',
            position: 'relative',
            transform: `scale(${scale})`,
          }}
          // 当拖动的元素首次进入放置目标时触发
          onDragEnter={(e) => {
            // 当拖拽元素进入渲染区域时改变光标手势，表示元素进入渲染区域
            e.dataTransfer.dropEffect = 'move';
          }}
          // 当拖动的元素在放置目标上方时触发
          onDragOver={(e) => {
            // 取消默认的拖放行为，如阻止打开文件链接
            e.preventDefault();
          }}
          // 当拖动的元素在放置目标上被放下时触发
          onDrop={(e) => {
            e.preventDefault();
            // 获取父级容器
            const container = e.currentTarget;
            // 获取父级容器的位置信息
            const containerRect = container.getBoundingClientRect();
            // 获取拖动元素的位置信息
            const offsetX = (e.clientX - containerRect.left) / scale;
            const offsetY = (e.clientY - containerRect.top) / scale;
            setElements([
              ...elements,
              {
                key: `${Date.now()}`,
                style: {
                  left: offsetX - 50,
                  top: offsetY - 50,
                },
              },
            ]);
          }}
        >
          {elements.map((element) => (
            <div
              key={element.key}
              style={{
                ...element.style,
                width: 100,
                height: 100,
                position: 'absolute',
                backgroundColor: 'red',
              }}
            >
              组件{element.key}
            </div>
          ))}
        </div>
      </Flex>
    </div>
  );
};

export default DragDrop;
