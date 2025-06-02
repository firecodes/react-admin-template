import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Tabs } from 'antd';
import React, {
  Suspense,
  cloneElement,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { CacheForwardRef, MenuDataItem } from '.';
import LoadingPage from '../LoadingPage';
import DraggableTabNode from './DraggableTabNode';
import OutletElement from './OutletElement';

interface IProps {
  // 是否开启缓存 默认开启
  // 开发环境需要关闭 否则影响热更新
  isCache?: boolean;
  // 黑名单 在黑名单中的不会被缓存
  blacklist?: string[];
  // 是否支持拖拽排序
  isDrag?: boolean;
  // 是否显示标签页
  isTabs?: boolean;
}

interface ITabActive {
  // 唯一标识
  key: string;
  // 路径
  path: string;
  // 标签页名称
  label: string;
}

// 标签页缓存页面
const TabsKeepAlive = forwardRef<CacheForwardRef, IProps>((props, ref) => {
  const { isCache, blacklist, isDrag, isTabs } = props;
  // 路由导航
  const navigate = useNavigate();
  // 路由信息
  const location = useLocation();
  // 缓存的 outlet 元素
  const cacheOutletElements = useRef<any>({}).current;
  // 选中的tag项
  const [tabActiveKey, setTabActiveKey] = useState('');
  // tag列表
  const [tabItems, setTabItems] = useState<ITabActive[]>([]);

  // 使用 useImperativeHandle 暴露子组件的方法给父组件
  useImperativeHandle(ref, () => ({
    addTab,
  }));

  // 添加tab列表 并选中
  const addTab = useCallback(
    (item: MenuDataItem) => {
      const { key, path, label } = item;
      // 黑名单过滤
      if (blacklist && blacklist.some((url) => path === url)) return;
      const existItem = tabItems.find((it) => it.key === item.key);
      if (!existItem) {
        setTabItems([...tabItems, { key, path, label }]);
      }
      setTabActiveKey(key);
    },
    [tabItems, blacklist],
  );

  // tab 切换触发
  const handleTabChange = useCallback(
    (activeKey: string) => {
      setTabActiveKey(activeKey);
      const item = tabItems.find((d) => d.key === activeKey);
      if (item) {
        navigate(item.path);
      }
    },
    [tabItems, navigate],
  );

  // tab 删除触发
  const handleTabEditChange = useCallback(
    (
      activeKey:
        | string
        | React.MouseEvent<Element, MouseEvent>
        | React.KeyboardEvent<Element>,
      action: 'remove' | 'add',
    ) => {
      if (action === 'remove') {
        if (typeof activeKey !== 'string') return;
        delete cacheOutletElements[activeKey];
        const newItems = tabItems.filter((d) => d.key !== activeKey);
        setTabItems(newItems);
        if (newItems.length && activeKey === location.pathname) {
          handleTabChange(newItems[0].key);
        }
      }
    },
    [tabItems, handleTabChange],
  );

  // 缓存页面
  const renderView = useCallback(
    (routeElement: any) => {
      if (!cacheOutletElements[tabActiveKey]) {
        cacheOutletElements[tabActiveKey] = <div>{routeElement}</div>;
      }
      return Object.keys(cacheOutletElements).map((key) => {
        const element = cacheOutletElements[key];
        if (key === tabActiveKey) {
          return cloneElement(element, {
            key: key,
            style: {
              display: 'block',
              height: '100%',
              overflow: 'auto',
            },
          });
        } else {
          return cloneElement(element, {
            key: key,
            style: {
              display: 'none',
            },
          });
        }
      });
    },
    [cacheOutletElements, tabActiveKey],
  );

  // 鼠标传感器
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  // 拖拽排序
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setTabItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <Fragment>
      {/* 缓存tab */}
      <Tabs
        hideAdd
        type={tabItems.length === 1 ? 'card' : 'editable-card'}
        size="small"
        onEdit={handleTabEditChange}
        activeKey={tabActiveKey}
        style={{ margin: '-1px 0px 0px 0px' }}
        onChange={handleTabChange}
        items={tabItems}
        tabBarGutter={-1}
        tabBarStyle={{ margin: 0 }}
        renderTabBar={(tabBarProps, DefaultTabBar) =>
          isTabs ? (
            isDrag ? (
              <DndContext
                sensors={[sensor]}
                onDragEnd={onDragEnd}
                collisionDetection={closestCenter}
              >
                <SortableContext
                  items={tabItems.map((i) => i.key)}
                  strategy={horizontalListSortingStrategy}
                >
                  <DefaultTabBar {...tabBarProps}>
                    {(node) => (
                      <DraggableTabNode {...node.props} key={node.key}>
                        {node}
                      </DraggableTabNode>
                    )}
                  </DefaultTabBar>
                </SortableContext>
              </DndContext>
            ) : (
              <DefaultTabBar {...tabBarProps} />
            )
          ) : (
            <Fragment></Fragment>
          )
        }
      />
      {/* 路由动画 */}
      {/* <EcRouteAnimation> */}
      {/* 路由页面 */}
      <Suspense fallback={<LoadingPage />}>
        {isCache === false ? <Outlet /> : <OutletElement render={renderView} />}
      </Suspense>
      {/* </EcRouteAnimation> */}
    </Fragment>
  );
});

TabsKeepAlive.displayName = 'TabsKeepAlive';

export default TabsKeepAlive;
