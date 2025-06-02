import { useEffect, useRef } from "react";
// 导入three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 物体位移
const Demo4 = () => {
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
    // 创建子物体材质
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // 创建父物体材质
    const parentCubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // 创建网格物体 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // 创建父物体
    const parentCube = new THREE.Mesh(cubeGeometry, parentCubeMaterial);

    // 将子物体添加到父物体中
    parentCube.add(cube);
    // 设置父物体位置 局部坐标 没有父物体的位置，就是世界坐标
    parentCube.position.set(-4, 0, 0);
    // 将几何体添加到场景中
    scene.add(parentCube);
    // 设置物体位置
    cube.position.set(4, 0, 0);

    // 设置立方体的放大
    cube.scale.set(1.5, 1.5, 1.5);
    // 绕着x轴旋转
    cube.rotation.x = Math.PI / 4;

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
    
    return () => {
      // 组件销毁时，清除动画效果
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default Demo4;
