## 使用说明

npm install react-grid-layout

使用时需要引入相关样式

/node_modules/react-grid-layout/css/styles.css
/node_modules/react-resizable/css/styles.css

## 属性说明

ResponsiveReactGridLayout是react-grid-layout中的一个组件，用于创建响应式的可拖拽和可调整大小的网格布局。以下是一些常见的配置选项：

className：自定义组件的CSS类名。

layouts：用于指定不同断点下的布局配置。可以根据不同的屏幕宽度设置不同的布局。每个断点对应一个布局对象，其中包含了网格项的位置、大小等信息。

rowHeight：设置网格布局中行的高度。可以是一个数字或一个函数，以根据网格项的大小动态计算行高度。

cols：设置网格布局的列数。可以是一个整数值或一个包含断点和列数的对象。例如：{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }。

breakpoints：指定不同断点的宽度阈值，用于响应式布局。它应该是一个断点对象，其中每个键是断点名称，每个值是对应的断点宽度阈值。例如：{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }。

isDraggable：设置网格项是否可拖拽。可以是一个布尔值或一个函数，用于根据网格项的特定属性动态确定是否可拖拽。

isResizable：设置网格项是否可调整大小。可以是一个布尔值或一个函数，用于根据网格项的特定属性动态确定是否可调整大小。

onLayoutChange：在布局发生改变时触发的回调函数。可以用于捕获和处理布局改变的事件。

onDragStart：在开始拖拽网格项时触发的回调函数。

onDrag：在拖拽网格项过程中触发的回调函数。

onDragStop：在停止拖拽网格项时触发的回调函数。

onResizeStart：在开始调整网格项大小时触发的回调函数。

onResize：在调整网格项大小过程中触发的回调函数。

onResizeStop：在停止调整网格项大小时触发的回调函数。

## 类型

npm i --save-dev @types/react-grid-layout
