import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

// @ts-ignore
import iconFontUrl from './evo-font.js';
export const IconFont = createFromIconfontCN({
  scriptUrl: iconFontUrl,
});

export interface IEvoIconProps {
  type: string;
  size?: number | 'small' | 'default' | 'large';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const sizeMap = {
  small: 16,
  default: 24,
  large: 32,
};

export const EvoIcon: React.FC<IEvoIconProps> = ({
  type,
  size = 'default',
  className,
  style,
  onClick
}) => {
  const fontSize = typeof size === 'number' ? size : sizeMap[size];

  return (
    <IconFont
      type={type}
      className={className}
      style={{
        fontSize,
        ...style
      }}
      onClick={onClick}
    />
  );
};
