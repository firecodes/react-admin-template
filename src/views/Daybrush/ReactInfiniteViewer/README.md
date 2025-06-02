// zoomBy - 通过指定的倍数来缩放视图。
// trigger - 触发一个事件。
// setZoom - 设置当前的缩放级别。
// setTo - 将视图滚动到指定的位置。
// setBy - 通过指定的值来设置滚动位置。
// scrollTo - 滚动到指定的滚动位置。
// scrollCenter - 将视图滚动到中心位置。
// scrollBy - 通过指定的值来滚动视图。
// resize - 调整视图大小。
// once - 绑定一个事件，当该事件触发一次后自动解绑。
// on - 绑定一个事件。
// off - 解绑一个事件。
// getZoomY - 获取垂直方向上的缩放级别。
// getZoomX - 获取水平方向上的缩放级别。
// getZoom - 获取当前的缩放级别。
// getWrapper - 获取视图的容器元素。
// getViewport - 获取视图的可视区域元素。
// getScrollWidth - 获取滚动内容的宽度。
// getScrollTop - 获取垂直滚动条的位置。
// getScrollLeft - 获取水平滚动条的位置。
// getScrollHeight - 获取滚动内容的高度。
// getRangeY - 获取垂直滚动范围。
// getRangeX - 获取水平滚动范围。
// getContainer - 获取滚动容器。
// geScrollArea - 这可能是一个拼写错误，文档中没有提供更多信息，但根据上下文可能是获取滚动区域的相关信息。
// emit - 发出事件。
// destroy - 销毁 InfiniteViewer 实例

// 1. **zoom**: 初始缩放级别。默认值为 1，表示没有缩放。

// 2. **minZoom**: 允许的最小缩放级别。如果设置，用户不能将视图缩放到这个值以下。

// 3. **maxZoom**: 允许的最大缩放级别。如果设置，用户不能将视图缩放到这个值以上。

// 4. **bounding**: 一个布尔值，用于确定是否限制滚动。如果为 `true`，则滚动将被限制在内容的边界内。

// 5. **boundingPadding**: 边界填充值，用于在边界限制滚动时添加额外的空间。

// 6. **dragThreshold**: 拖动阈值，用于确定用户开始拖动之前需要移动的距离。

// 7. **usePinch**: 一个布尔值，用于确定是否启用捏合缩放功能。

// 8. **wheelZoom**: 一个布尔值，用于确定是否允许使用鼠标滚轮进行缩放。

// 9. **wheelZoomModifierKey**: 用于指定哪个修饰键（如 Shift 或 Ctrl）与鼠标滚轮一起使用时，可以触发缩放。

// 10. **wheelZoomFactor**: 鼠标滚轮缩放的敏感度因子。

// 11. **useWheel**: 一个布尔值，用于确定是否允许使用鼠标滚轮进行滚动。

// 12. **useDrag**: 一个布尔值，用于确定是否允许拖动视图。

// 13. **useKeyboard**: 一个布尔值，用于确定是否允许使用键盘箭头键进行滚动。

// 14. **useTouch**: 一个布尔值，用于确定是否允许触摸设备上的触摸操作。

// 15. **preventDefault**: 一个布尔值，用于确定是否阻止默认的滚动行为。

// 16. **preventContextMenu**: 一个布尔值，用于确定是否阻止上下文菜单的显示。

// 17. **onDragStart**: 拖动开始时的回调函数。

// 18. **onDrag**: 拖动过程中的回调函数。

// 19. **onDragEnd**: 拖动结束时的回调函数。

// 20. **onZoom**: 缩放时的回调函数。
