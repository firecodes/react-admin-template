import { amap } from '@/config/Common';
import { APILoader, Map, Polyline, PolylineEditor } from '@uiw/react-amap';
import { Button, Flex } from 'antd';
import { useState } from 'react';
import { lines } from './lines';

const UiwReactAMap = () => {
  const [active, setActive] = useState(false);
  const [polylinePath, setPolylinePath] = useState<[number, number][]>([]);
  // 位置
  const [position, setPosition] = useState([116.95376, 38.939814]);

  return (
    <div style={{ height: '100%', width: '100%', padding: 16 }}>
      <Flex align="center" gap={16}>
        <h2>@uiw/react-amap 地图</h2>
        <Button onClick={() => setActive(!active)} type="primary">
          {active ? '结束' : '开始'}绘线
        </Button>
        <Button
          onClick={() => {
            const json = JSON.stringify(polylinePath);
            const a = document.createElement('a');
            a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(json)}`;
            a.download = 'polyline.json';
            a.click();
          }}
          type="primary"
        >
          导出JSON
        </Button>
        <Button
          onClick={() => {
            console.log(polylinePath);
          }}
          type="primary"
        >
          打印JSON
        </Button>
        <Button
          onClick={() => {
            const list = [...polylinePath];
            list.pop();
            setPolylinePath(list);
          }}
          type="primary"
        >
          撤回
        </Button>
      </Flex>
      <APILoader
        akey={amap.key}
        version="2.0.5"
        plugins={['AMap.PolylineEditor']}
      >
        <Map
          style={{ height: '93%' }} // 地图中心点位置
          // 主题
          {...({ mapStyle: 'amap://styles/grey' } as any)}
          center={position}
          // 地图缩放级别
          zoom={14}
          zooms={[5, 20]}
          onClick={(e) => {
            // setPosition([e.lnglat.lng, e.lnglat.lat]);
            setPolylinePath([...polylinePath, [e.lnglat.lng, e.lnglat.lat]]);
          }}
        >
          <Polyline
            path={polylinePath}
            {...({
              strokeOpacity: 1,
              isOutline: true,
              strokeColor: '#FF0808',
              strokeWeight: 2,
              lineJoin: 'round',
              outlineColor: '#FF9999',
            } as any)}
          >
            <PolylineEditor
              active={active}
              onAdjust={(e) => {
                const data = e.target.getPath();
                const res = data.map((item) => [item.lng, item.lat]);
                console.log('onAdjust:>>', res);
                setPolylinePath(res);
              }}
            />
          </Polyline>
          {lines.map((item, index) => (
            <Polyline
              key={index}
              {...({
                strokeOpacity: 1,
                isOutline: true,
                strokeColor: '#FF0808',
                strokeWeight: 2,
                lineJoin: 'round',
                outlineColor: '#FF9999',
              } as any)}
              path={item.list}
            >
              <PolylineEditor
                active={active}
                onAdjust={(e: any) => {
                  const data = e.target.getPath();
                  const res = data.map((info: any) => [info.lng, info.lat]);
                  console.log('onAdjust:>>', item.name, res);
                }}
              />
            </Polyline>
          ))}
        </Map>
      </APILoader>
    </div>
  );
};

export default UiwReactAMap;
