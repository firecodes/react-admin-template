import logo from '@/assets/react.svg';

switch (import.meta.env.MODE) {
  case 'production':
    break;
  case 'development':
    break;
  default:
    break;
}

// 全局参数
const config = {
  LOGO: logo,
  // 项目名称
  SYSTEM_NAME: `React Develop Demo`,
  // 当前版本号
  VERSIONS: '1.0.0',
};

export default config;
