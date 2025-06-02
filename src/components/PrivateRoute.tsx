import { getToken, setLocalToken } from '@/config/Storage';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '../routes/path';
import { getParam } from '@/config/Utils';

interface PropInterface {
  // 路由组件
  element: JSX.Element;
}

// 判断是否有token
const PrivateRoute: React.FC<PropInterface> = ({ element }) => {
  // 从 URL 参数中获取 token
  const token = getParam('token');
  // 保存 token
  if (token) setLocalToken(token);

  // 判断是否有token
  return getToken() ? element : <Navigate to={RoutePath.LOGIN} replace />;
};
export default PrivateRoute;
