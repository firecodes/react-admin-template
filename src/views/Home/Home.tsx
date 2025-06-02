import { ProCard } from '@ant-design/pro-components';
import welcome from '@/assets/image/welcome.png';

const Home = () => {

  return (
    <div style={{ padding: 16, height: '100%' }}>
      <ProCard bordered style={{ height: '100%' }} layout="center">
        <img style={{ height: '100%' }} src={welcome} alt="welcome" />
      </ProCard>
    </div>
  );
};

export default Home;
