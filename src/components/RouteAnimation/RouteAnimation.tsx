import { useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Style.css";

interface IProps {
  // 子元素
  children: JSX.Element;
  // 随机值，用于触发动画加载，不传则根据路由改变触发
  random?: string | number;
  // 动画时长 默认300ms
  timeout?: number;
  // 动画样式
  type?: string | "fade" | "scale" | "slide" | "down";
}

// 路由动画组件
function RouteAnimation(props: IProps) {
  const { children, random, timeout, type } = props;
  // 路由信息
  const location = useLocation();

  return (
    <TransitionGroup
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    >
      <CSSTransition
        key={random ?? location.pathname}
        unmountOnExit
        timeout={timeout ?? 300}
        classNames={type ? "ec-" + type : "ec-slide"}
      >
        <div style={{ height: "100%", overflow: "auto" }}>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default RouteAnimation;
