import { useEffect, useRef } from "react";
// 导入three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 三角面几何体
const Demo7 = () => {
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

    // 创建几何体 正方形
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    // 创建材质1
    const cubeMaterial1 = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });
    // 创建材质2
    const cubeMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    });
    // 创建材质3
    const cubeMaterial3 = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
    });
    // 创建材质4
    const cubeMaterial4 = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
    });
    // 创建材质5
    const cubeMaterial5 = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
    });
    // 创建材质6
    const cubeMaterial6 = new THREE.MeshBasicMaterial({
      color: 0xffff00,
    });
    // 创建网格物体 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, [
      cubeMaterial1,
      cubeMaterial2,
      cubeMaterial3,
      cubeMaterial4,
      cubeMaterial5,
      cubeMaterial6,
    ]);
    // 将几何体添加到场景中
    scene.add(cube);
    // 设置物体位置
    cube.position.x = 2;

    // 创建几何体 三角面
    const geometry = new THREE.BufferGeometry();
    // 创建顶点数据 顶点是有序的，每三个为一个顶点 逆时针为正面
    // const vertices = new Float32Array([
    //   -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, 1.0,
    //   0.0, -1.0, 1.0, 0.0,
    // ]);
    // 索引复用
    const vertices = new Float32Array([
      -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
    ]);
    // 设置顶点属性
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    // 创建索引
    const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);
    // 设置索引属性
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    // 设置两个顶点组，形成两个材质
    geometry.addGroup(0, 3, 0); // 第一个材质，从0开始，共3个顶点，材质索引为0
    geometry.addGroup(3, 3, 1); // 第二个材质，从3开始，共3个顶点，材质索引为1

    // 创建材质1
    const material1 = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true, // 线框模式
    });
    // 创建材质2
    const material2 = new THREE.MeshBasicMaterial({
      color: "red",
      // 双面可见
      side: THREE.DoubleSide,
    });
    // 创建网格物体 根据几何体和材质创建物体
    const plane = new THREE.Mesh(geometry, [material1, material2]);
    // 将几何体添加到场景中
    scene.add(plane);

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

export default Demo7;
