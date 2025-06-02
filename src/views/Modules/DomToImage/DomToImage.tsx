import domtoimage from 'dom-to-image';
import { useRef } from 'react';

const DomToImage = () => {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScreenshot = () => {
    const node = screenshotRef.current;
    if (!node) return;
    domtoimage
      .toPng(node)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        containerRef.current?.appendChild(img);
      })
      .catch((error) => {
        console.error('Oops, something went wrong!', error);
      });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>dom-to-image 截取图片</h2>
      <div
        ref={screenshotRef}
        style={{ padding: '20px', border: '1px solid red' }}
      >
        <h1>截取这个区域</h1>
        <p>这是一个示例内容。</p>
      </div>
      <button onClick={handleScreenshot}>截取截图</button>
      <div ref={containerRef}>
        <h2>截图结果</h2>
      </div>
    </div>
  );
};

export default DomToImage;
