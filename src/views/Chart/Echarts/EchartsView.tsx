import { Col, Row } from 'antd';
import CurveChart from './CurveChart';

const EChartsView = () => {
  return (
    <Row style={{ padding: 16,width: '100%' }}>
      <Col span={12}>
        <CurveChart />
      </Col>
      <Col span={12}>2</Col>
    </Row>
  );
};

export default EChartsView;
