import { ProConfigProvider } from '@ant-design/pro-components';
import { ConfigProvider, theme } from 'antd';
import { FC, ReactNode } from 'react';

interface IProps {
  // 子组件
  children?: ReactNode;
}

// 配置pro的全局属性
const EcConfigProvider: FC<IProps> = (props) => {
  const { children } = props;

  return (
    // Antd Pro  全局化组件配置
    <ProConfigProvider dark token={{ borderRadius: 4 }}>
      {/* Antd 全局化组件配置 */}
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorBgBase: '#0d141d',
            borderRadius: 4,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ProConfigProvider>
  );
};

export default EcConfigProvider;
