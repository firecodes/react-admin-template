import { Button } from 'antd';
import { useRef, useState } from 'react';

const RequestAnimationFrame = () => {
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const [position1, setPosition1] = useState(10);
  const [position2, setPosition2] = useState(10);

  const moveBox1 = () => {
    setPosition1((prev) => prev + 1);
    setTimeout(moveBox1, 16); // Approximately 60fps
  };
  const moveBox2 = () => {
    setPosition2((prev) => prev + 1);
    requestAnimationFrame(moveBox2); // Approximately 60fps
  };

  return (
    <div style={{ padding: 16, position: 'relative' }}>
      <h2>requestAnimationFrame 对比 setTimeout 实现 60fps 动画</h2>
      <div>
        使用 setTimeout：动画通过 setTimeout 每隔大约 16 毫秒（约
        60fps）更新一次位置。这种方法可能会导致动画不流畅，因为 setTimeout
        并不总是能精确地每隔 16 毫秒执行一次。
      </div>
      <div>
        使用 requestAnimationFrame：动画通过 requestAnimationFrame
        更新位置。requestAnimationFrame
        会在浏览器下一次重绘之前调用指定的回调函数，这样可以确保动画更加流畅和高效
      </div>
      <Button
        type="primary"
        onClick={() => {
          moveBox1();
          moveBox2();
        }}
      >
        触发动画
      </Button>
      <div
        ref={box1Ref}
        style={{
          width: 150,
          height: 150,
          backgroundColor: 'red',
          position: 'absolute',
          top: 200,
          left: `${position1}px`,
          transform: `translateX(${position1}px)`,
        }}
      >
        setTimeout
      </div>
      <div
        ref={box2Ref}
        style={{
          width: 150,
          height: 150,
          backgroundColor: 'red',
          position: 'absolute',
          top: 400,
          left: `${position2}px`,
          transform: `translateX(${position2}px)`,
        }}
      >
        requestAnimationFrame
      </div>
    </div>
  );
};

export default RequestAnimationFrame;
