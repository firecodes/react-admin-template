import PrivateRoute from '@/components/PrivateRoute';
import Layout from '@/layout/Layout';
import Login from '@/pages/Login/Login';
import HistoryTravel from '@/views/Ahooks/HistoryTravel';
import TableAutoMerge from '@/views/Antd/TableAutoMerge/TableAutoMerge';
import EChartsView from '@/views/Chart/Echarts/EchartsView';
import FlexAutoRoll from '@/views/CssStyle/FlexAutoRoll/FlexAutoRoll';
import EcInfiniteViewer from '@/views/Daybrush/EcRulerContainer/EcInfiniteViewer';
import ReactInfiniteViewer from '@/views/Daybrush/ReactInfiniteViewer/ReactInfiniteViewer';
import ReactMoveable from '@/views/Daybrush/ReactMoveable/ReactMoveable';
import Home from '@/views/Home/Home';
// const Home = lazy(() => import("@/views/Home/Home"));
import DragDrop from '@/views/Javascript/DragDrop/DragDrop';
import MonitoringPageStuck from '@/views/Javascript/MonitoringPageStuck/MonitoringPageStuck';
import RequestAnimationFrame from '@/views/Javascript/RequestAnimationFrame/RequestAnimationFrame';
import AMapJsapiLoader from '@/views/Map/AMapJsapiLoader/AMapJsapiLoader';
import ReactAMap from '@/views/Map/ReactAMap/ReactAMap';
import UiwReactAMap from '@/views/Map/UiwReactAMap/UiwReactAMap';
import DomToImage from '@/views/Modules/DomToImage/DomToImage';
import Html2canvas from '@/views/Modules/Html2canvas/Html2canvas';
import ReactGridLayout from '@/views/ReactGridLayout/ReactGridLayout';
import { AntDesignOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePath } from './path';
import Developing from '@/components/Developing';
import Demo1 from '@/views/Three/ThreeJs/Demo1';
import Demo2 from '@/views/Three/ThreeJs/Demo2';
import Demo10 from '@/views/Three/ThreeJs/Demo10';
import Demo11 from '@/views/Three/ThreeJs/Demo11';
import Demo12 from '@/views/Three/ThreeJs/Demo12';
import Demo13 from '@/views/Three/ThreeJs/Demo13';
import Demo14 from '@/views/Three/ThreeJs/Demo14';
import Demo15 from '@/views/Three/ThreeJs/Demo15';
import Demo16 from '@/views/Three/ThreeJs/Demo16';
import Demo17 from '@/views/Three/ThreeJs/Demo17';
import Demo3 from '@/views/Three/ThreeJs/Demo3';
import Demo4 from '@/views/Three/ThreeJs/Demo4';
import Demo5 from '@/views/Three/ThreeJs/Demo5';
import Demo6 from '@/views/Three/ThreeJs/Demo6';
import Demo7 from '@/views/Three/ThreeJs/Demo7';
import Demo8 from '@/views/Three/ThreeJs/Demo8';
import Demo9 from '@/views/Three/ThreeJs/Demo9';
import FontSizeClamp from '@/views/CssStyle/FontSizeClamp/FontSizeClamp.tsx';
import DndKitList from '@/views/DndKit/DndKitList/DndKitList.tsx';
import EditableProTableView from '@/views/AntdPro/EditableProTable/EditableProTable';
import VerifyDemo from '@/views/Verify/VerifyDemo';
import UseCallbackWsData from '@/views/React/UseCallbackWsData/UseCallbackWsData';
import DataScreen from '@/views/DataScreen/DataScreen';
import TreeSearch from '@/views/Antd/TreeSearch/TreeSearch.tsx';
import EcChart from '@/views/EcDesign/Charts/EcChart/EcChart';
import LoopCurveDataChart from '@/views/Chart/Echarts/LoopCurveDataChart';
import FiberSc from '@/views/ThreeFiber/demo2';
import FiberDemo3 from '@/views/ThreeFiber/demo3';
const Error403 = lazy(() => import('@/pages/ErrorPage/403'));
const Error404 = lazy(() => import('@/pages/ErrorPage/404'));
const Error500 = lazy(() => import('@/pages/ErrorPage/500'));
const AIHOME = lazy(() => import('@/pages/ai/home/homePage'));

// 路由配置
const routes = [
  {
    path: '/',
    element: <PrivateRoute element={<Layout />} />,
    children: [
      {
        index: true,
        element: <Navigate to={RoutePath.HOME} />,
      },
      {
        path: RoutePath.HOME,
        name: 'Home',
        icon: <AntDesignOutlined />,
        element: <Home />,
        // 增加name属性，否则标签没有title，展示出现问题
        handle: { name: '首页' },
      },
      {
        path: '/example',
        name: 'Example',
        icon: <AntDesignOutlined />,
        children: [
          {
            index: true,
            element: <Navigate to={'react-grid-layout'} />,
            handle: { cache: false },
          },
          {
            path: 'react-grid-layout',
            name: 'React-Grid-Layout',
            icon: <AntDesignOutlined />,
            children: [
              {
                index: true,
                element: <Navigate to={'demo1'} />,
              },
              {
                path: 'demo1',
                name: 'GridLayout',
                element: <ReactGridLayout />,
                handle: { name: 'GridLayout' },
              },
            ],
          },
          {
            path: 'ahooks',
            name: 'Ahooks',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'demo1',
                name: 'useHistoryTravel',
                element: <HistoryTravel />,
                handle: { name: 'useHistoryTravel' },
              },
            ],
          },
          {
            path: 'dnd-kit',
            name: 'Dnd-Kit',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'demo1',
                name: 'dnd-kit拖拽排序',
                element: <DndKitList />,
                handle: { name: 'dnd-kit拖拽排序' },
              },
            ],
          },
          {
            path: 'daybrush',
            name: 'Daybrush',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'demo1',
                name: 'InfiniteViewer',
                element: <ReactInfiniteViewer />,
                handle: { name: 'InfiniteViewer' },
              },
              {
                path: 'demo2',
                name: 'EcRulerContainer',
                element: <EcInfiniteViewer />,
                handle: { name: 'EcRulerContainer' },
              },
              {
                path: 'demo3',
                name: 'Moveable',
                element: <ReactMoveable />,
                handle: { name: 'Moveable' },
              },
            ],
          },
          {
            path: 'css',
            name: 'Css',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'demo1',
                name: '滚动响应式',
                element: <FlexAutoRoll />,
                handle: { name: 'FlexAutoRoll' },
              },
              {
                path: 'demo2',
                name: '字体响应式',
                element: <FontSizeClamp />,
                handle: { name: '字体响应式' },
              },
            ],
          },
          {
            path: 'javascript',
            name: 'Javascript',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'demo1',
                name: 'requestAnimationFrame',
                element: <RequestAnimationFrame />,
                handle: { name: 'requestAnimationFrame' },
              },
              {
                path: 'demo2',
                name: 'onDrop',
                element: <DragDrop />,
                handle: { name: 'onDrop' },
              },
              {
                path: 'demo3',
                name: '监测页面卡顿',
                element: <MonitoringPageStuck />,
                handle: { name: 'MonitoringPageStuck' },
              },
            ],
          },
          {
            path: 'modules',
            name: 'Modules',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'demo1',
                name: 'dom-to-image',
                element: <DomToImage />,
                handle: { name: 'dom-to-image' },
              },
              {
                path: 'demo2',
                name: 'html2canvas',
                element: <Html2canvas />,
                handle: { name: 'html2canvas' },
              },
            ],
          },
          {
            path: 'map',
            name: 'Map',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'demo1',
                name: 'react-amap',
                element: <ReactAMap />,
                handle: { name: 'react-amap' },
              },
              {
                path: 'demo2',
                name: '@uiw/react-amap',
                element: <UiwReactAMap />,
                handle: { name: '@uiw/react-amap' },
              },
              {
                path: 'demo3',
                name: 'amap-jsapi-loader',
                element: <AMapJsapiLoader />,
                handle: { name: 'amap-jsapi-loader' },
              },
            ],
          },
          {
            path: 'chart',
            name: 'Chart',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'demo1',
                name: 'echarts',
                element: <EChartsView />,
                handle: { name: 'echarts' },
              },
              {
                path: 'loop-curve-data',
                name: '轮播曲线图表数据',
                element: <LoopCurveDataChart />,
                handle: { name: '轮播曲线图表数据' },
              },
            ],
          },
          {
            path: 'antd',
            name: 'Ant Design 5',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'demo1',
                name: 'Table动态合并单元格',
                element: <TableAutoMerge />,
                handle: { name: 'TableAutoMerge' },
              },
              {
                path: 'tree-search',
                name: 'TreeSearch',
                element: <TreeSearch />,
                handle: { name: 'TreeSearch' },
              },
            ],
          },
          {
            path: 'antd-pro',
            name: 'Ant Design Pro',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'demo1',
                name: '可编辑表格',
                element: <EditableProTableView />,
                handle: { name: '可编辑表格' },
              },
            ],
          },
          {
            path: 'react',
            name: 'React18',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'use-callback-ws-update-data',
                name: 'useCallback通知更新',
                element: <UseCallbackWsData />,
                handle: { name: 'useCallback通知更新' },
              },
            ],
          },
        ],
      },
      {
        path: 'ec-design',
        name: 'Ec Design',
        icon: <AntDesignOutlined />,
        children: [
          {
            index: true,
            element: <Navigate to={'commons'} />,
          },
          {
            path: 'commons',
            name: '通用数据',
            icon: <AntDesignOutlined />,
            children: [
              {
                index: true,
                element: <Navigate to={'ec-dictionary'} />,
              },
              {
                path: 'ec-dictionary',
                name: '字典库',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcDictionary' },
              },
              {
                path: 'ec-model',
                name: '物模型',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcModel' },
              },
              {
                path: 'ec-code-template',
                name: '代码模板',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcCodeTemplate' },
              },
              {
                path: 'ec-agreement',
                name: '开发者约定',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: '开发者约定' },
              },
            ],
          },
          {
            path: 'charts',
            name: '图表组件',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'ec-chart',
                name: 'EcChart 渲染图表',
                element: <EcChart />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcChart' },
              },
              {
                path: 'ec-curve-chart',
                name: 'EcCurveChart 曲线图表',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcCurveChart' },
              },
              {
                path: 'ec-bar-chart',
                name: 'EcBarChart 柱状图表',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcBarChart' },
              },
              {
                path: 'ec-pie-chart',
                name: 'EcPieChart 饼状图表',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcPieChart' },
              },
            ],
          },
          {
            path: 'form',
            name: '表单组件',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'ec-device-select',
                name: 'EcDeviceSelect 设备选择框',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcDeviceSelect' },
              },
              {
                path: 'ec-device-value-select',
                name: 'EcDeviceValueSelect 设备值选择框',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcDeviceValueSelect' },
              },
              {
                path: 'ec-devices-select',
                name: 'EcDevicesSelect 多设备选择器',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcDevicesSelect' },
              },
              {
                path: 'ec-device-select-modal',
                name: 'EcDeviceSelectModal 设备选择弹窗',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcDeviceSelectModal' },
              },
              {
                path: 'ec-auto-form',
                name: 'EcAutoForm 自动化表单',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcAutoForm' },
              },
              {
                path: 'ec-upload-video',
                name: 'EcUploadVideo 上传视频',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcUploadVideo' },
              },
              {
                path: 'ec-upload-image',
                name: 'EcUploadImage 上传图片',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcUploadImage' },
              },
              {
                path: 'ec-upload-file',
                name: 'EcUploadFile 上传文件',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcUploadFile' },
              },
              {
                path: 'ec-fast-date-range-picker',
                name: 'EcFastDateRangePicker 快捷日期范围选择器',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcFastDateRangePicker' },
              },
            ],
          },
          {
            path: 'data-view',
            name: '数据组件',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'ec-table',
                name: 'EcTable 表格',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcTable' },
              },
              {
                path: 'ec-elements-scroll',
                name: 'EcElementsScroll 元素列表滚动',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcElementsScroll' },
              },
              {
                path: 'ec-falls-flow-layout',
                name: 'EcFallsFlowLayout 瀑布流布局',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcFallsFlowLayout' },
              },
              {
                path: 'ec-hover-preview',
                name: 'EcHoverPreview 悬浮预览',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcHoverPreview' },
              },
              {
                path: 'ec-websocket',
                name: 'EcWebsocket 数据长连接',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcWebsocket' },
              },
            ],
          },
          {
            path: 'interaction',
            name: '交互组件',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'ec-table-operate',
                name: 'EcTableOperate 表格操作项',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcTableOperate' },
              },
              {
                path: 'ec-pagination',
                name: 'EcPagination 分页器',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcPagination' },
              },
              {
                path: 'ec-tree-search',
                name: 'EcTreeSearch 树形搜索',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcTreeSearch' },
              },
              {
                path: 'ec-confirm-button',
                name: 'EcConfirmButton 确认按钮',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcConfirmButton' },
              },
              {
                path: 'ec-confirm-switch',
                name: 'EcConfirmSwitch 确认开关',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcConfirmSwitch' },
              },
              {
                path: 'ec-full-screen',
                name: 'EcFullScreen 全屏',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcFullScreen' },
              },
              {
                path: 'ec-export-button',
                name: 'EcExportButton 导出数据按钮',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcExportButton' },
              },
              {
                path: 'ec-loading',
                name: 'EcLoading 加载动画',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcLoading' },
              },
            ],
          },
          {
            path: 'auth',
            name: '权限组件',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'ec-func-access',
                name: 'EcFuncAccess 功能鉴权',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcFuncAccess' },
              },
              {
                path: 'ec-init-system',
                name: 'EcInitSystem 初始化系统',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcInitSystem' },
              },
              {
                path: 'ec-token-access',
                name: 'EcTokenAccess 令牌鉴权',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcTokenAccess' },
              },
              {
                path: 'ec-action-record',
                name: 'EcActionRecord 用户行为记录',
                element: <Developing />,
                icon: <AntDesignOutlined />,
                handle: { name: 'EcActionRecord' },
              },
            ],
          },
        ],
      },
      {
        path: 'canvas',
        name: 'Canvas',
        icon: <AntDesignOutlined />,
        children: [
          {
            index: true,
            element: <Navigate to={'js-drag'} />,
          },
          {
            path: 'js-drag',
            name: 'JsDrag',
            element: <Developing />,
            handle: { name: 'JsDrag' },
          },
          {
            path: 'moveable',
            name: 'Moveable',
            element: <Developing />,
            handle: { name: 'Moveable' },
          },
          {
            path: 'konva',
            name: 'Konva',
            element: <Developing />,
            handle: { name: 'Konva' },
          },
          {
            path: 'grid-layout',
            name: 'GridLayout',
            element: <Developing />,
            handle: { name: 'GridLayout' },
          },
        ],
      },
      {
        path: 'three',
        name: 'Three 3D',
        icon: <AntDesignOutlined />,
        children: [
          {
            index: true,
            element: <Navigate to={'three-js'} />,
          },
          {
            path: 'three-js',
            name: 'three-js',
            icon: <AntDesignOutlined />,
            children: [
              {
                index: true,
                element: <Navigate to={'demo1'} />,
              },
              {
                path: 'demo1',
                name: '旋转的方块',
                element: <Demo1 />,
                handle: { name: '旋转的方块' },
              },
              {
                path: 'demo2',
                name: '坐标辅助器',
                element: <Demo2 />,
                handle: { name: '坐标辅助器' },
              },
              {
                path: 'demo3',
                name: '轨道控制器',
                element: <Demo3 />,
                handle: { name: '轨道控制器' },
              },
              {
                path: 'demo4',
                name: '位移缩放旋转',
                element: <Demo4 />,
                handle: { name: '位移缩放旋转' },
              },
              {
                path: 'demo5',
                name: '窗口自适应',
                element: <Demo5 />,
                handle: { name: '窗口自适应' },
              },
              {
                path: 'demo6',
                name: 'GUI控制面板',
                element: <Demo6 />,
                handle: { name: 'GUI控制面板' },
              },
              {
                path: 'demo7',
                name: '三角面几何体',
                element: <Demo7 />,
                handle: { name: '三角面几何体' },
              },
              {
                path: 'demo8',
                name: '几何体',
                element: <Demo8 />,
                handle: { name: '几何体' },
              },
              {
                path: 'demo9',
                name: '包围盒',
                element: <Demo9 />,
                handle: { name: '包围盒' },
              },
              {
                path: 'demo10',
                name: '导入3D模型',
                element: <Demo10 />,
                handle: { name: '导入3D模型' },
              },
              {
                path: 'demo11',
                name: '点光源',
                element: <Demo11 />,
                handle: { name: '点光源' },
              },
              {
                path: 'demo12',
                name: '平行光',
                element: <Demo12 />,
                handle: { name: '平行光' },
              },
              {
                path: 'demo13',
                name: '性能监视器',
                element: <Demo13 />,
                handle: { name: '性能监视器' },
              },
              {
                path: 'demo14',
                name: '阵列立方体透视',
                element: <Demo14 />,
                handle: { name: '阵列立方体透视' },
              },
              {
                path: 'demo15',
                name: '高光反射材质',
                element: <Demo15 />,
                handle: { name: '高光反射材质' },
              },
              {
                path: 'demo16',
                name: '物体锯齿处理',
                element: <Demo16 />,
                handle: { name: '物体锯齿处理' },
              },
              {
                path: 'demo17',
                name: '线模型和点模型',
                element: <Demo17 />,
                handle: { name: '线模型和点模型' },
              },
            ],
          },
          {
            path: 'react-three-fiber',
            name: 'react-three-fiber',
            icon: <AntDesignOutlined />,
            children: [
              {
                path: 'demo1',
                name: 'demo1',
                element: <Developing />,
                handle: { name: 'demo1' },
              },
            ],
          },
        ],
      },
      {
        path: 'Fiber',
        name: 'Fiber',
        icon: <AntDesignOutlined />,
        children: [
          {
            path: 'demo1',
            name: 'demo1',
            element: <FiberSc />,
            handle: { name: 'demo1' },
          },
          {
            path: 'demo3',
            name: 'demo3',
            element: <FiberDemo3 />,
            handle: { name: 'demo3' },
          },

        ]
      },
      {
        path: 'verify',
        name: 'Verify',
        icon: <AntDesignOutlined />,
        element: <VerifyDemo />,
        handle: { name: 'Verify' },
      },
    ],
  },
  {
    path: '/data-screen',
    name: '数据大屏',
    element: <DataScreen />,
  },
  {
    path: '/ai-home',
    name: 'AI主页',
    element: <AIHOME />,
  },
  // 额外的页面
  {
    path: RoutePath.LOGIN,
    name: '登录页',
    element: <Login />,
  },
  // 错误页面路由
  {
    path: RoutePath.ERROR_403,
    name: '403',
    element: <Error403 />,
  },
  {
    path: RoutePath.ERROR_404,
    name: '404',
    element: <Error404 />,
  },
  {
    path: RoutePath.ERROR_500,
    name: '500',
    element: <Error500 />,
  },
  {
    path: '*',
    name: '未匹配到页面',
    element: <Error404 />,
  },
];

export default routes;
