import { DrawerForm } from '@ant-design/pro-components';
import { Button, Flex } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Moveable, { MoveableTargetGroupsType } from 'react-moveable';
import Selecto from 'react-selecto';
import CSS from './Style.module.css';
import { getRandomNum, getStrNum } from '@/config/Utils';
import ContextBox from '@/components/ContextBox/ContextBox';

const ReactMoveable = () => {
  const [targets, setTargets] = React.useState<MoveableTargetGroupsType>([]);
  const moveableRef = React.useRef<Moveable>(null);
  const selectoRef = React.useRef<Selecto>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dataMap, setDataMap] = useState<Map<string, any>>(new Map([]));

  useEffect(() => {
    const map = new Map(dataMap);
    for (let i = 0; i < 2; i++) {
      map.set(i.toString(), {
        style: {
          left: parseInt(getRandomNum(1600, 0).toString()),
          top: parseInt(getRandomNum(780, 0).toString()),
          width: 100,
          height: 100,
        },
      });
    }
    setDataMap(map);
  }, []);

  // 元素列表
  const elements = useMemo(() => {
    const map = new Map(dataMap);
    return Array.from(map.entries());
  }, [dataMap]);

  return (
    <ContextBox title="Moveable 和 Selecto 拖拽、框选、旋转、缩放、辅助线">
      <Flex align="center" gap={16}>
        <DrawerForm
          title="预览"
          trigger={<Button type="primary">预览</Button>}
          drawerProps={{
            destroyOnClose: true,
            styles: { body: { padding: 0 } },
          }}
          submitter={false}
          width="100%"
        >
          {elements.map(([key, data]) => (
            <div className={CSS.element} style={data.style} key={key}>
              {key}
            </div>
          ))}
        </DrawerForm>
        <Button
          type="primary"
          onClick={() => {
            const map = new Map(dataMap);
            map.set(dayjs().unix().toString(), {
              style: { left: 100, top: 100, width: 100, height: 100 },
            });
            setDataMap(map);
          }}
        >
          添加
        </Button>
        <Button type="primary" onClick={() => {}}>
          获取数据
        </Button>
      </Flex>
      <div className={CSS.canvas} ref={canvasRef}>
        <Selecto
          ref={selectoRef}
          // 设置拖拽框选的的容器
          dragContainer={canvasRef.current}
          // 设置能框选的目标元素
          selectableTargets={['.selecto-area .cube']}
          // 设置框选元素的命中范围
          hitRate={50}
          selectByClick={true}
          selectFromInside={false}
          // 按下crtl键时，可以多选
          toggleContinueSelect={['ctrl']}
          ratio={0}
          onDragStart={(e) => {
            const moveable = moveableRef.current!;
            const target = e.inputEvent.target;
            if (
              moveable.isMoveableElement(target) ||
              targets.some((t: any) => t === target || t.contains(target))
            ) {
              e.stop();
            }
          }}
          onSelectEnd={(e) => {
            const moveable = moveableRef.current!;
            if (e.isDragStart) {
              e.inputEvent.preventDefault();
              moveable.waitToChangeTarget().then(() => {
                moveable.dragStart(e.inputEvent);
              });
            }
            setTargets(e.selected);

            // 获取选中的目标元素
            e.selected.forEach((target) => {
              // 保留rotate属性，但清除translate
              const style = target.style;
              const transform = style.transform;
              const rotateMatch = transform.match(/rotate\(([^)]+)\)/);

              if (rotateMatch) {
                const rotate = rotateMatch[1];
                // 保留旋转，清除平移
                style.transform = `rotate(${rotate})`;
              }

              // 使用left和top来更新位置
              const { left, top } = target.getBoundingClientRect();
              style.left = `${left}px`;
              style.top = `${top}px`;
            });
          }}
        />
        <Moveable
          // 兼容react18 并发渲染
          flushSync={flushSync}
          ref={moveableRef}
          target={targets}
          draggable={true}
          throttleDrag={1}
          edgeDraggable={false}
          startDragRotate={0}
          throttleDragRotate={0}
          resizable={true}
          keepRatio={false}
          throttleResize={1}
          renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
          rotatable={true}
          throttleRotate={10}
          // 关闭旋转中心点显示
          origin={false}
          // 内边距
          padding={8}
          // 缝隙对齐线
          snapGap={true}
          // 开启磁吸功能
          snappable={true}
          // 辅助线基于的元素
          elementGuidelines={elements.map(([key]) => `.key-${key}`)}
          // 元素距离内才显示辅助线
          maxSnapElementGuidelineDistance={400}
          maxSnapElementGapDistance={400}
          // 辅助线方向
          snapDirections={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            center: true,
            middle: true,
          }}
          elementSnapDirections={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            center: true,
            middle: true,
          }}
          // 限制元素的边界
          bounds={{ left: 0, top: 0, right: 0, bottom: 0, position: 'css' }}
          useResizeObserver={true}
          useMutationObserver={true}
          onDrag={(e) => {
            // e.target.style.transform = e.transform;
            e.target.style.left = `${e.left}px`;
            e.target.style.top = `${e.top}px`;
          }}
          // 拖动结束时触发
          onDragEnd={(e) => {
            if (!e.isDrag) return;
            const key = e.target.getAttribute('data-key');
            if (!key) return;
            const style = e.target.style;
            const map = new Map(dataMap);
            const data = map.get(key);
            map.set(key, {
              style: {
                ...data.style,
                left: getStrNum(style.left),
                top: getStrNum(style.top),
              },
            });
            setDataMap(map);
          }}
          // 缩放时触发
          onResize={(e) => {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = e.drag.transform;
          }}
          onResizeEnd={(e) => {
            const map = new Map(dataMap);
            const data = e.lastEvent;
            const key = e.target.getAttribute('data-key');
            if (!key) return;
            map.set(key, { width: data.width, height: data.height });
          }}
          // 旋转时触发
          onRotate={(e) => {
            e.target.style.transform = e.drag.transform;
          }}
          onRotateEnd={(e) => {
            const map = new Map(dataMap);
            const data = e.lastEvent;
            const key = e.target.getAttribute('data-key');
            if (!key) return;
            map.set(key, { transform: data.transform });
          }}
          // onDragGroup={({ events }) => {
          //   events.forEach((ev) => {
          //     ev.target.style.left = `${ev.left}px`;
          //     ev.target.style.top = `${ev.top}px`;
          //   });
          // }}
          // onResizeGroup={({ events }) => {
          //   events.forEach((ev) => {
          //     ev.target.style.width = `${ev.width}px`;
          //     ev.target.style.height = `${ev.height}px`;
          //     ev.target.style.transform = ev.drag.transform;
          //   });
          // }}
          // onRotateGroup={({ events }) => {
          //   events.forEach((ev) => {
          //     ev.target.style.transform = ev.drag.transform;
          //   });
          // }}
          // 元素组改变时触发
          onRenderGroup={(e) => {
            e.events.forEach((ev) => {
              ev.target.style.cssText += ev.cssText;
            });
          }}
          onRenderGroupEnd={(e) => {
            const map = new Map(dataMap);
            e.events.forEach((ev) => {
              const key = ev.target.getAttribute('data-key');
              if (!key) return;
              const { width, height, top, left, transform } = ev.target.style;
              map.set(key, {
                key,
                style: {
                  width: getStrNum(width),
                  height: getStrNum(height),
                  top: getStrNum(top),
                  left: getStrNum(left),
                  transform,
                },
              });
            });
            setDataMap(map);
          }}
        />

        <div className="selecto-area">
          {elements.map(([key, data]) => (
            <div
              className={`cube ${CSS.element} key-${key}`}
              style={data.style}
              data-key={key}
              key={key}
            >
              {key}
              <div>
                {data.style.width}x{data.style.height}
              </div>
              <div>
                {data.style.left}x{data.style.top}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContextBox>
  );
};

export default ReactMoveable;
