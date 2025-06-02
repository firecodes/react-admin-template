// 提供给父组件的方法
export interface CacheForwardRef {
  // 添加菜单结构
  addTab: (data: MenuDataItem) => void;
}

export interface MenuDataItem {
  key: string;
  path: string;
  label: string;
}
