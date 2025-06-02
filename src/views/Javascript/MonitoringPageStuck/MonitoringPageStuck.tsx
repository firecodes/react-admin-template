import { App, Button } from 'antd';
import { useEffect } from 'react';

// 监测页面卡顿
const MonitoringPageStuck = () => {
  const { message } = App.useApp();

  useEffect(() => {
    // 开启长任务监控
    const ob = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 300) {
          // 超过 500 毫秒的长任务视为严重卡顿
          console.log('卡顿反馈:', entry);
        }
      }
    });
    // 监听长任务
    ob.observe({ type: 'longtask', buffered: true });
  }, []);

  function delay(duration = 1000) {
    const start = new Date().getTime();
    while (new Date().getTime() - start < duration) {
      // do something
    }
    message.success('任务执行完成');
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>监测页面卡顿 PerformanceObserver</h2>
      <Button
        type="primary"
        onClick={() => {
          delay(500);
        }}
      >
        开启耗时任务
      </Button>
    </div>
  );
};

export default MonitoringPageStuck;
