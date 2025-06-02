import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

// 曲线图表
const CurveChart = () => {
  // 创建一个 ref，用于获取 ECharts 实例
  const chartRef = useRef(null);

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(chartRef.current);

    // 指定图表的配置项和数据
    const option = {
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // 图表自适应大小
    myChart.resize();
  }, []);

  return (
    <div>
      {/* 为 ECharts 准备一个定义了宽高的 DOM */}
      <div ref={chartRef} style={{ width: '100%', height: 500 }}></div>
    </div>
  );
};

export default CurveChart;
