import EcConfigProvider from './layout/EcConfigProvider';
import { App as AntApp } from 'antd';
import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import routes from './routes/routes';

const App = () => {
  // 路由初始化
  const router = createHashRouter(routes);

  return (
    <div className="content">
      <EcConfigProvider>
        {/* Antd App 新的包裹组件，提供重置样式和提供消费上下文的默认环境*/}
        <AntApp message={{ top: 40 }} style={{ height: '100%', width: '100%' }}>
          {/* 路由挂载 */}
          <RouterProvider router={router} />
        </AntApp>
      </EcConfigProvider>
    </div>
  );
};

export default App;
