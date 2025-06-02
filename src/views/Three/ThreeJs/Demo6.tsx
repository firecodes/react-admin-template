import { useEffect, useRef } from "react";
// 导入three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 导入lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

// GUI面板
const Demo6 = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    // DOM元素
    const mount = mountRef.current;
    // 1、创建场景
    const scene = new THREE.Scene();

    // 2、创建相机
    const camera = new THREE.PerspectiveCamera(
      75, // 视角
      mount.clientWidth / mount.clientHeight, // 宽高比
      0.1, // 近平面 最近能看到的距离
      1000 // 远平面 最远能看到的距离
    );
    // 设置相机位置 x,y,z
    camera.position.set(2, 2, 7);
    // 设置相机视角 默认是正上方
    camera.lookAt(0, 0, 0);
    // 添加到场景中
    scene.add(camera);

    // 添加世界坐标辅助器
    const axesHelper = new THREE.AxesHelper(10);
    // 添加到场景中
    scene.add(axesHelper);

    // 创建几何体 物体
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    // 创建物体材质
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // 设置材质为线框模式
    cubeMaterial.wireframe = true;
    // 创建网格物体 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // 设置物体位置
    cube.position.set(0, 0, 0);
    // 将几何体添加到场景中
    scene.add(cube);

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    // 设置渲染的尺寸大小
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    // 将webgl渲染的canvas内容添加到body
    mount.appendChild(renderer.domElement);

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置带有阻尼的惯性
    controls.enableDamping = true;
    // 设置阻尼系数
    controls.dampingFactor = 0.05;

    // 动画效果
    function animate() {
      //如果后期需要控制器带有阻尼效果，或者自动旋转等效果，就需要加入controls.update()
      controls.update();
      // 调用requestAnimationFrame方法，每隔一段时间调用animate方法
      requestAnimationFrame(animate);
      // 渲染场景 使用渲染器，通过相机将场景渲染进来
      renderer.render(scene, camera);
    }
    animate();

    // 创建GUI面板
    const gui = new GUI();

    // 改变交互界面style属性
    gui.domElement.style.right = "16px";
    gui.domElement.style.top = "16px";

    // add(控制对象，对象具体属性，其他参数)

    // 添加立方体配置组
    const folder = gui.addFolder("立方体配置");
    // 链式写法
    folder.add(cube.position, "x", -5, 5, 1).name("立方体X轴位置");
    // 事件处理
    folder
      .add(cube.position, "y", -5, 5, 1)
      .name("立方体Y轴位置")
      // 数值变化时触发
      .onChange((value) => {
        console.log("立方体Y轴位置发生变化", value);
      });
    // 拆分写法
    folder
      .add(cube.position, "z")
      .min(0)
      .max(10)
      .step(0.1) // 步长
      .name("立方体Z轴位置")
      // 数值变化结束后触发
      .onFinishChange((value) => {
        console.log("立方体Z轴位置发生变化", value);
      });

    // 立方体材质配置
    gui.add(cubeMaterial, "wireframe").name("立方体线框模式");

    const colors = { cubeColor: "#ff0000" };
    gui
      .addColor(colors, "cubeColor")
      .name("立方体颜色")
      .onChange((value) => {
        cube.material.color.set(value);
      });

    const obj = {
      position: 0,
      bool: true,
    };

    // 参数3数据类型：数组(下拉菜单)
    gui
      .add(obj, "position", [-2, 0, 2])
      .name("位移")
      .onChange((value) => {
        cube.position.y = value;
      });

    // 参数3数据类型：对象(下拉菜单)
    gui
      .add(obj, "position", { left: -2, center: 0, right: 2 })
      .name("位移")
      .onChange((value) => {
        cube.position.x = value;
      });

    const handleResize = () => {
      // 重置渲染器宽高比
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      // 重置相机宽高比
      camera.aspect = mount.clientWidth / mount.clientHeight;
      // 更新相机投影矩阵
      camera.updateProjectionMatrix();
    };

    // 监听窗口变化
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // 销毁gui面板
      gui.destroy();
      // 组件销毁时，清除动画效果
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default Demo6;
