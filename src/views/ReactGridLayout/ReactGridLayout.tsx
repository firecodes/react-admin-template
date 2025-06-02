import { useState } from 'react';
import GridLayout from 'react-grid-layout';
import ContextBox from '@/components/ContextBox/ContextBox';

const ReactGridLayout = () => {
  // 布局属性
  const [layout, setLayout] = useState([
    // i: 组件key值, x: 组件在x轴的坐标, y: 组件在y轴的坐标, w: 组件宽度, h: 组件高度
    // static: true，代表组件不能拖动
    { i: 'A', x: 0, y: 0, w: 1, h: 3 },
    // minW/maxW 组件可以缩放的最大最小宽度
    { i: 'B', x: 1, y: 0, w: 3, h: 2 },
    { i: 'C', x: 4, y: 0, w: 1, h: 2 },
  ]);

  return (
    <ContextBox title="GridLayout 实现相对画布拖拽功能">
      <GridLayout
        className="layout"
        isDraggable // 是否可拖拽
        isResizable // 是否可重置大小
        cols={12} // 栅格列数配置，默认12列
        margin={[16, 16]} // 栅格间距配置，默认[16, 16]
        rowHeight={30} // 指定网格布局中每一行的高度, 这里设置为30px
        width={1200} // 设置容器的初始宽度
        useCSSTransforms // 是否使用CSS 3 的translate() 来代替 position left/top（可加快渲染速度）
        autoSize // 为真时，容器的高度会自适应内容的高度
        resizeHandles={['s', 'e', 'se']}
        onLayoutChange={(layout) => {
          setLayout(layout);
        }}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            style={{
              cursor: 'move',
              backgroundColor: 'red',
              borderRadius: 6,
              textAlign: 'center',
              alignContent: 'center',
            }}
            data-grid={item}
          >
            组件{item.i}
          </div>
        ))}
      </GridLayout>
    </ContextBox>
  );
};

export default ReactGridLayout;
