import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const Html2canvas = () => {
  const screenshotRef = useRef(null);

  const handleScreenshot = () => {
    const node = screenshotRef.current;
    if (!node) return;
    html2canvas(node)
      .then((canvas) => {
        const img = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = img;
        link.download = 'screenshot.png';
        link.click();
      })
      .catch((error) => {
        console.error('Oops, something went wrong!', error);
      });
  };

  return (
    <div style={{ padding: 16 }}>
        <h2>Html2canvas 截取图片并下载</h2>
      <div
        ref={screenshotRef}
        style={{
          padding: '20px',
          border: '1px solid red',
          backgroundColor: '#000',
        }}
      >
        <h1>截取这个区域</h1>
        <p>这是一个示例内容。</p>
      </div>
      <button onClick={handleScreenshot}>下载截图</button>
    </div>
  );
};

export default Html2canvas;
