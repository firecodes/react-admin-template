import ContextBox from '@/components/ContextBox/ContextBox';
import { useInterval } from 'ahooks';
import { ECharts } from 'echarts';
import * as echarts from 'echarts';
import { useEffect, useMemo, useRef, useState } from 'react';

// 轮播曲线数据
const LoopCurveDataChart = () => {
  // 图表ref
  const chartRef = useRef<HTMLDivElement>(null);
  // EcChart 实例
  const myChart = useRef<ECharts>();
  // 是否开启轮播
  const [isLoop, setIsLoop] = useState(true);

  // 示例数据
  const option = useMemo(() => {
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line',
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
    };
  }, []);

  useEffect(() => {
    const ref = chartRef.current;
    // 判断ref是否存在Dom上
    if (!ref) return;
    // 初始化图表实例
    const chart = echarts.init(ref);
    // 存储实例
    myChart.current = chart;
  }, []);

  useEffect(() => {
    // 渲染图表结构
    myChart.current?.setOption(option, true);
    // 图表自适应大小
    myChart.current?.resize();
    // 初始化后开始轮播
    autoShowTip();
  }, [option]);

  // 开启轮播
  useInterval(autoShowTip, isLoop ? 3000 : undefined);

  let currentIndex = 0;
  // 自动轮播函数
  function autoShowTip() {
    const dataLength = option.series[0].data.length;
    if (currentIndex === dataLength) {
      currentIndex = 0;
    }
    myChart.current?.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    currentIndex++;
  }

  return (
    <ContextBox title="实现echarts图表数据轮播">
      <div
        ref={chartRef}
        style={{ width: 1000, height: 500 }}
        // 鼠标进入
        onMouseEnter={() => {
          setIsLoop(false);
          console.log('关闭轮播');
        }}
        // 鼠标离开
        onMouseLeave={() => {
          setIsLoop(true);
          autoShowTip();
          console.log('开启轮播');
        }}
      />
    </ContextBox>
  );
};
export default LoopCurveDataChart;
