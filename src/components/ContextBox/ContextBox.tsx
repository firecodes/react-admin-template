import React, { CSSProperties, FC, ReactNode } from 'react';

interface IProps {
  // 子组件
  children?: ReactNode;
  // 组件样式
  style?: CSSProperties;
  // 内容样式
  bodyStyle?: CSSProperties;
  // 标题
  title?: string;
}

// 容器组件
const ContextBox: FC<IProps> = (props) => {
  const { children, style, title, bodyStyle } = props;

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        ...style,
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 'bolder', padding: 16 }}>
        {title}
      </div>
      <div
        style={{
          width: '100%',
          height: title ? 'calc(100% - 64px)' : '100%',
          padding: 16,
          ...bodyStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ContextBox;
