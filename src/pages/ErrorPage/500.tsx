import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

// 500网络问题页面
function Error500() {
  // 路由导航
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title="500"
      subTitle="抱歉，您的网络不见了~🤦‍♂️🤦‍♀️"
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          返回上一页
        </Button>
      }
    />
  );
}

export default Error500;
