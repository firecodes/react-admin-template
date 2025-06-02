import img from '@/assets/image/20211219181327.png';
import { HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const DataScreen = () => {
  // 路由导航
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Button
        type="text"
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          fontSize: 18,
          cursor: 'pointer',
        }}
      >
        <HomeOutlined />
      </Button>
      <img src={img} alt="" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default DataScreen;
