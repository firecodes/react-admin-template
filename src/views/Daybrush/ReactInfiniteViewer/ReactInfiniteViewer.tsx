import { Button, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import InfiniteViewer from 'react-infinite-viewer';
import CSS from './Style.module.css';
import ContextBox from '@/components/ContextBox/ContextBox';

const ReactInfiniteViewer = () => {
  const viewerRef = useRef<InfiniteViewer>(null);
  // 画布div
  const canvasRef = useRef<HTMLDivElement>(null);
  // 是否开启移动
  const [mouseDrag, setMouseDrag] = useState(false);
  // 空格是否按下
  const spaceDown = useRef(false);

  useEffect(() => {
    // 组件挂载完成后，自动滚动到中心
    requestAnimationFrame(() => {
      if (!viewerRef.current) return;
      const zoom = Math.min(1600 / 1920, 700 / 1080);
      viewerRef.current?.setZoom(zoom);
      viewerRef.current.scrollCenter();
    });
    // 监听鼠标按下事件
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 处理键盘按下事件
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      // 如果已经按下Space，则不再重复触发
      if (spaceDown.current) return;
      spaceDown.current = true;
      // 改变鼠标样式为抓手
      canvasRef.current!.style.cursor = 'grab';
      setMouseDrag(true);
    }
  };

  // 处理键盘释放事件
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      spaceDown.current = false;
      // 恢复鼠标样式
      canvasRef.current!.style.cursor = 'default';
      setMouseDrag(false);
    }
  };

  return (
    <ContextBox title="InfiniteViewer 实现缩放、移动、自适应居中">
      <Space>
        <Button
          onClick={() => {
            if (!viewerRef.current) return;
            const zoom = viewerRef.current.getZoom();
            viewerRef.current?.setZoom(zoom + 0.1);
          }}
        >
          放大
        </Button>
        <Button
          onClick={() => {
            if (!viewerRef.current) return;
            const zoom = viewerRef.current.getZoom();
            viewerRef.current?.setZoom(zoom - 0.1);
          }}
        >
          缩小
        </Button>
        <Button
          onClick={() => {
            if (!viewerRef.current) return;
            viewerRef.current.scrollBy(-100, 0);
          }}
        >
          右移
        </Button>
        <Button
          onClick={() => {
            if (!viewerRef.current) return;
            viewerRef.current.scrollBy(100, 0);
          }}
        >
          左移
        </Button>
        <Button
          onClick={() => {
            if (!viewerRef.current) return;
            viewerRef.current.scrollCenter();
          }}
        >
          居中
        </Button>
        <Button
          onClick={() => {
            if (!viewerRef.current) return;
            const zoom = Math.min(1600 / 1920, 700 / 1080);
            viewerRef.current?.setZoom(zoom);
          }}
        >
          自适应宽高
        </Button>
        <Button
          onClick={() => {
            if (!viewerRef.current) return;
            const zoom = Math.min(1600 / 1920, 700 / 1080);
            viewerRef.current?.setZoom(zoom);
            viewerRef.current.scrollCenter();
          }}
        >
          自适应居中
        </Button>
        {mouseDrag ? '拖拽开启' : '拖拽关闭 '}
      </Space>
      <InfiniteViewer
        className={CSS.viewer}
        ref={viewerRef}
        margin={20}
        threshold={0}
        useMouseDrag={mouseDrag}
        useAutoZoom={true}
        useWheelScroll={true}
        maxPinchWheel={10}
        zoomRange={[0.1, 10]}
        rangeX={[-1000, 1000]}
        rangeY={[-1000, 1000]}
      >
        <div
          style={{
            width: 1920,
            height: 1080,
            // 鼠标拖拽时禁止事件冒泡
            pointerEvents: mouseDrag ? 'none' : 'auto',
            backgroundColor: 'lightblue',
            textAlign: 'center',
            alignContent: 'center',
          }}
          ref={canvasRef}
        >
          <Button
            onClick={() => {
              alert('点击事件');
            }}
          >
            点击事件
          </Button>
          画布内容
        </div>
      </InfiniteViewer>
    </ContextBox>
  );
};

export default ReactInfiniteViewer;
