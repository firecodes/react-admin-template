import { Result } from 'antd';

// 开发中
const Developing = () => {

  return (
    <Result
      status="404"
      title={`模块正在开发中...`}
      subTitle="The module is under development"
    />
  );
};

export default Developing;
