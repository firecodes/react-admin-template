import { Spin } from "antd";
import { CSSProperties } from "react";

interface PropsInterface {
  style?: CSSProperties;
  size?: "small" | "default" | "large";
}

// 页面初始化时加载动画
const LoadingPage = (props: PropsInterface) => {
  const { style, size } = props;

  return (
    <div
      style={{
        height: "50%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <Spin size={size ?? "default"} />
    </div>
  );
};

export default LoadingPage;
