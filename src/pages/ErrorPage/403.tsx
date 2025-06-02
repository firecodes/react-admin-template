import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

// 403无权访问该页面
function Error403() {
  // 路由导航
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️"
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          返回上一页
        </Button>
      }
    />
  );
}

export default Error403;
