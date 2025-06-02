import React from 'react';
import ContextBox from '@/components/ContextBox/ContextBox';

const FontSizeClamp = () => {
  return (
    <ContextBox title="font-size: clamp(min,auto,max) 实现字体随着窗口自适应改变大小">
      <h3>
        clamp() 是一种 CSS
        函数，用于设置一个范围内的响应式数值。它接受三个参数：最小值、首选值和最大值，表示元素的大小将在最小值和最大值之间变化
      </h3>
      <h3>
        字体大小会根据视口宽度的变化在10像素到16像素之间调整。视口宽度较小时，字体会变小，但不会小于10像素。视口宽度较大时，字体会变大，但不会大于16像素
      </h3>
      <h4>font-size: clamp(10px, 3vw, 16px)</h4>
      <h4>最小值：10px，表示字体大小不会小于10像素。</h4>
      <h4>首选值：3vw，表示字体大小相对于视口宽度的3%。</h4>
      <h4>最大值：16px，表示字体大小不会大于16像素。</h4>
      <table
        style={{
          border: '1px solid red',
          borderCollapse: 'collapse',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid red', padding: 14 }}>参数</th>
            <th style={{ border: '1px solid red', padding: 14 }}>文本</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid red', padding: 14 }}>
              <div style={{ fontSize: 'clamp(10px, 1vw, 20px)' }}>
                clamp(10px, 5vw, 20px)
              </div>
            </td>
            <td style={{ border: '1px solid red', padding: 14 }}>
              <div style={{ fontSize: 'clamp(10px,  1vw, 20px)' }}>
                这是一段演示文本，使用clamp()函数计算和不使用clamp()的示例文字，请尝试缩小浏览器窗口大小，看看字体大小是否会变化。
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid red', padding: 14 }}>
              <div style={{ fontSize: 20 }}>fontSize: 20px </div>
            </td>
            <td style={{ border: '1px solid red', padding: 14 }}>
              <div style={{ fontSize: 20 }}>
                这是一段演示文本，使用clamp()函数计算和不使用clamp()的示例文字，请尝试缩小浏览器窗口大小，看看字体大小是否会变化。
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </ContextBox>
  );
};

export default FontSizeClamp;
