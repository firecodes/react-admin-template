import { useEffect, useRef } from "react";
// 导入three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 三角面几何体
const Demo8 = () => {
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
    camera.position.set(2, 2, 3);
    // 设置相机视角 默认是正上方
    camera.lookAt(0, 0, 0);
    // 添加到场景中
    scene.add(camera);

    // 添加世界坐标辅助器
    const axesHelper = new THREE.AxesHelper(10);
    // 添加到场景中
    scene.add(axesHelper);

    // 立方体 BoxGeometry（长宽高：Float）
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    // 胶囊体 CapsuleGeometry（胶囊体底面半径，胶囊体顶面半径，胶囊体圆圈数，胶囊体垂直方向分段数）
    const capsuleGeometry = new THREE.CapsuleGeometry(1, 1, 3, 8);
    const capsuleMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
    capsule.position.set(2, 0, 0);
    scene.add(capsule);

    // 圆形  CircleGeometry（半径，圆形边数）
    const circleGeometry = new THREE.CircleGeometry(1, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.position.set(-2, 0, 0);
    scene.add(circle);

    // 圆锥体 ConeGeometry（圆锥体底面半径，圆锥体顶面半径，圆锥体圆圈数，圆锥体垂直方向分段数）
    const coneGeometry = new THREE.ConeGeometry(1, 2, 20);
    const coneMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.set(0, 0, -2);
    scene.add(cone);

    // 圆柱体 CylinderGeometry（圆柱体底面半径，圆柱体顶面半径，圆柱体圆圈数，圆柱体垂直方向分段数）
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
    const cylinderMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(0, 0, 2);
    scene.add(cylinder);

    // 球体 SphereGeometry（半径，球体圆圈数，垂直方向分段数，水平方向分段数）
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 2, 0);
    scene.add(sphere);

    // 环面几何体 TorusGeometry（环面的外半径，环面的内半径，环面圆圈数，环面垂直方向分段数，环面水平方向分段数）
    const geometry = new THREE.TorusGeometry(0.8, 0.4, 10, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.set(0, -2, 0);
    scene.add(torus);

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
      // 组件销毁时，清除动画效果
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default Demo8;
