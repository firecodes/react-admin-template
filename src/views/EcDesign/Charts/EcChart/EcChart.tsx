import ContextBox from '@/components/ContextBox/ContextBox';
import ApiTable from '@/components/ApiTable/ApiTable';

// 渲染图表
const EcChart = () => {
  return (
    <ContextBox title="EcChart 渲染图表">
      <ApiTable
        data={[
          {
            value: 'option',
            note: '图表配置项',
            type: 'object',
            version: '1.0.0',
          },
          {
            value: 'empty',
            note: '是否显示空组件，当数据为空时显示',
            type: 'boolean',
            default: 'false',
            version: '1.0.0',
          },
          {
            value: 'loading',
            note: '是否进入加载动画',
            type: 'boolean',
            default: 'false',
            version: '1.0.0',
          },
          {
            value: 'style',
            note: 'CSS样式',
            type: 'CSSProperties',
            version: '1.0.0',
          },
          {
            value: 'dispatch',
            note: '传递 Echarts 图表实例，用于图表联动',
            type: '(data: { charts: ECharts }) => void',
            version: '1.0.0',
          },
        ]}
      />
    </ContextBox>
  );
};

export default EcChart;
