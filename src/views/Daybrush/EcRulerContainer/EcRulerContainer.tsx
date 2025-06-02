import useStore from '@/store/store';
import { RetweetOutlined } from '@ant-design/icons';
import Guides from '@scena/react-guides';
import { FloatButton } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import CSS from './Style.module.css';
import { useShallow } from 'zustand/shallow';

interface IFsRulerContainer {
  // 上下文
  children: JSX.Element;
}

// 自制画布拖拽容器
const EcRulerContainer = (props: IFsRulerContainer) => {
  const { children } = props;
  // 画布宽高
  const width = 1920;
  const height = 1080;
  // 画布位置
  let startX = 0;
  let startY = 0;
  // 标尺位置
  const [pos, setPos] = useState({ x: 0, y: 0 });
  // 画布比例
  const [scale, setScale] = useState(1);
  // 元素Ref
  const verticalRulerRef = useRef<null | Guides>(null);
  const horizontalRulerRef = useRef<null | Guides>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  // 空格是否按下
  const spaceDown = useRef(false);
  // 状态管理
  const { setCanvasScale } = useStore(
    useShallow((state) => ({
      setCanvasScale: state.setCanvasScale,
    })),
  );

  useEffect(() => {
    // 初始化时自适应画面尺寸
    autoLayoutCanvas();
    // 挂载事件监听
    window.addEventListener('resize', handlePageResize);
    containerRef.current!.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('resize', handlePageResize);
      containerRef.current?.removeEventListener('wheel', handleWheel);
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
      // 监听鼠标按下事件
      canvasRef.current!.addEventListener('mousedown', handleMouseDown);
    }
  };

  // 处理键盘释放事件
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      spaceDown.current = false;
      // 恢复鼠标样式
      canvasRef.current!.style.cursor = 'default';
      // 移除鼠标按下事件监听器
      canvasRef.current?.removeEventListener('mousedown', handleMouseDown);
      // 触发鼠标释放事件
      handleMouseUp();
    }
  };

  useEffect(() => {
    // 监听画布缩放比例变化并更新状态管理
    setCanvasScale(scale);
    // 监听画布滚动并更新标尺位置
    if (canvasRef.current) handleScroll();
  }, [scale]);

  // 计算标尺单位
  const computedUnit = useMemo(() => {
    if (scale > 1.5) return 25;
    else if (scale > 0.75 && scale <= 1.5) return 50;
    else if (scale > 0.4 && scale <= 0.75) return 100;
    else if (scale > 0.2 && scale <= 0.4) return 200;
    else return 400;
  }, [scale]);

  // 计算画布位置
  const computedDis = () => {
    const containerRect = containerRef.current!.getBoundingClientRect();
    const canvasRect = canvasRef.current!.getBoundingClientRect();
    const disX = Math.floor(containerRect.left) - Math.floor(canvasRect.left);
    const disY = Math.floor(containerRect.top) - Math.floor(canvasRect.top);
    return { disX, disY };
  };

  // 处理画布滚动
  const handleScroll = () => {
    const { disX, disY } = computedDis();
    setPos({
      x: Math.floor(disX / scale),
      y: Math.floor(disY / scale),
    });
  };

  // 处理画布缩放
  const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      setScale((prev) => {
        const step = 0.1; // 定义缩放的步长为 0.1
        const newScale =
          e.deltaY < 0
            ? Math.min(prev + step, 2) // 缩放上限为 2
            : Math.max(prev - step, 0.5); // 缩放下限为 0.5
        return newScale;
      });
    }
  };

  // 处理画布拖拽鼠标按下时开始拖拽
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startX = e.pageX + containerRef.current!.scrollLeft;
    startY = e.pageY + containerRef.current!.scrollTop;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // 鼠标移动时实时更新画布位置
  const handleMouseMove = (e: MouseEvent) => {
    requestAnimationFrame(() => {
      // 使用 requestAnimationFrame 优化性能，减少高频事件带来的性能消耗
      containerRef.current!.scrollLeft = startX - e.pageX;
      containerRef.current!.scrollTop = startY - e.pageY;
    });
  };

  // 鼠标释放时移除画布拖拽事件
  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  // 自适应画布尺寸
  const autoLayoutCanvas = () => {
    const containerWidth = containerRef.current!.clientWidth - 40;
    const containerHeight = containerRef.current!.clientHeight;
    const containerRatio = containerWidth / containerHeight;
    const canvasRatio = width / height;
    // 计算适当的缩放比例
    const newScale =
      canvasRatio > containerRatio
        ? Math.min(containerWidth / width, 1)
        : Math.min(containerHeight / height, 1);
    // 设置缩放比例并调整布局
    setScale(newScale);
    setLayoutPos(newScale);
  };

  // 设置布局位置
  const setLayoutPos = (scale: number) => {
    const { disX, disY } = computedDis();
    containerRef.current!.scrollLeft += -disX - 20;
    containerRef.current!.scrollTop +=
      -disY -
      (containerRef.current!.clientHeight -
        canvasRef.current!.clientHeight * scale) /
        2;
  };

  // 处理页面大小变化
  const handlePageResize = () => {
    verticalRulerRef.current?.resize();
    horizontalRulerRef.current?.resize();
  };

  return (
    <div className={CSS.fs_ruler_container}>
      <FloatButton onClick={autoLayoutCanvas} icon={<RetweetOutlined />} />
      <div style={{ width: 20, height: '100%' }}>
        <div className={CSS.px_box}>px</div>
        <Guides
          ref={verticalRulerRef}
          type="vertical"
          negativeRuler={true}
          zoom={scale}
          scrollPos={pos.y}
          unit={computedUnit}
          segment={10}
          textOffset={[10, 0]}
          displayDragPos={true}
          displayGuidePos={true}
          useResizeObserver={true}
          textColor="rgba(255,255,255,0.5)"
        />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ height: '20px' }}>
          <Guides
            ref={horizontalRulerRef}
            type="horizontal"
            negativeRuler={true}
            zoom={scale}
            scrollPos={pos.x}
            unit={computedUnit}
            segment={10}
            textOffset={[0, 10]}
            displayDragPos={true}
            displayGuidePos={true}
            useResizeObserver={false}
            textColor="rgba(255,255,255,0.5)"
          />
        </div>
        <div
          className={CSS.content_container}
          ref={containerRef}
          onScroll={handleScroll}
        >
          <div
            className={CSS.content_layout}
            style={{ width: `${width * 2}px`, height: `${height * 2}px` }}
          >
            <div
              className={CSS.content_canvas}
              ref={canvasRef}
              style={{
                width: `${width}px`,
                height: `${height}px`,
                transform: `scale(${scale})`,
                marginLeft: `-${Math.floor(width / 2)}px`,
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcRulerContainer;
