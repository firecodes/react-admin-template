import { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { amap as amapConfig } from '@/config/Common';
import { Input, message, Spin } from 'antd';
import CSS from './Style.module.css';

const AMapJsapiLoader = () => {
  const map = useRef<any>();
  const container = useRef<any>();
  const amap = useRef<any>();
  const marker = useRef<any>();
  const [position, setPosition] = useState({
    longitude: 121.472483,
    latitude: 31.234177,
  });
  // 搜索的地址列表
  const [positions, setPositions] = useState<any[]>([]);
  // 加载动画
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const center = [121.472483, 31.234177];
    AMapLoader.load({
      key: amapConfig.key, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.Scale'], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    }).then((AMap) => {
      amap.current = AMap;
      map.current = new AMap.Map(container.current, {
        // 设置地图容器id
        viewMode: '2D', // 是否为3D地图模式
        zoom: 12, // 初始化地图级别
        center: center, // 初始化地图中心点位置
        // 地图的自定义主题
        mapStyle: 'amap://styles/white',
        pitch: 70, // 3D视角下俯仰角度
        zooms: [5, 18],
      });
      // 初始化时在初始位置添加一个Marker
      marker.current = new AMap.Marker({
        position: center,
        map: map.current,
      });
      map.current.on('click', (e: any) => {
        const longitude = e.lnglat.lng;
        const latitude = e.lnglat.lat;
        setPosition({ longitude, latitude });
      });
    });
    return () => {
      map.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (map.current && position) {
      const res = [position.longitude, position.latitude];
      map.current.setCenter(res);
      marker.current.setPosition(res);
    }
  }, [position]);

  function handlePlaceSearch(value: string) {
    setLoading(false);
    amap.current.plugin('AMap.PlaceSearch', function () {
      const autoOptions = { city: '上海' };
      const placeSearch = new amap.current.PlaceSearch(autoOptions);
      placeSearch.search(value, function (status: any, result: any) {
        if (status === 'complete' && result.info === 'OK') {
          // 返回的搜索列表
          const {
            poiList: { pois },
          } = result;
          if (pois && Array.isArray(pois)) {
            setPositions(pois);
            setLoading(false);
          }
        }
      });
    });
  }

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        padding: 16,
        position: 'relative',
      }}
    >
      <Input.Search
        placeholder="请输入地址查询"
        style={{
          position: 'absolute',
          width: 300,
          top: 32,
          left: 32,
          zIndex: 1,
        }}
        enterButton
        onSearch={(value) => {
          handlePlaceSearch(value);
        }}
        onPressEnter={(e: any) => {
          handlePlaceSearch(e.target.value);
        }}
      />
      <div className={CSS.float}>
        <Spin spinning={loading}>
          {positions.map((item, index) => (
            <div
              key={index}
              className={CSS.float_item}
              onClick={() => {
                if (item.location) {
                  const longitude = item.location.lng;
                  const latitude = item.location.lat;
                  setPosition({ longitude, latitude });
                } else {
                  message.error('地图出错,请联系管理员!');
                  return false;
                }
              }}
            >
              {item.name}
            </div>
          ))}
        </Spin>
      </div>
      <div ref={container} style={{ height: '100%' }}></div>
    </div>
  );
};

export default AMapJsapiLoader;
