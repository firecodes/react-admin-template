import { amap } from '@/config/Common';
import { Map, Marker } from 'react-amap';

const ReactAMap = () => {
  const position = { longitude: 116.397428, latitude: 39.90923 };

  return (
    <div style={{ height: '100%', width: '100%', padding: 16 }}>
      <Map
        amapkey={amap.key}
        // 缩放级别
        zoom={10}
        // 指定地图版本
        version="2.0.5"
        // 3D视图
        viewMode="3D"
      >
        <Marker position={position} />
      </Map>
    </div>
  );
};

export default ReactAMap;
