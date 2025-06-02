import { useOutlet } from "react-router-dom";

// 页面元素
const OutletElement = (props: any) => {
  const outlet = useOutlet();
  return props.render(outlet);
};

export default OutletElement;
