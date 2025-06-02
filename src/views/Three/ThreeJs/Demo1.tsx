import { useEffect, useRef } from 'react';
// 导入three.js
import * as THREE from 'three';

// 旋转的方块
const Demo1 = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(mountRef.current);
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
      1000, // 远平面 最远能看到的距离
    );
    // 设置相机位置 x,y,z
    camera.position.set(0, 0, 7);
    // 设置相机视角 默认是正上方
    camera.lookAt(0, 0, 0);
    // 添加到场景中
    scene.add(camera);

    // 创建几何体 物体
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    // 创建材质
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // 创建网格物体 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // 将几何体添加到场景中
    scene.add(cube);

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    // 设置渲染的尺寸大小
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    // 将webgl渲染的canvas内容添加到body
    mount.appendChild(renderer.domElement);

    // 动画效果
    function animate() {
      // 调用requestAnimationFrame方法，每隔一段时间调用animate方法
      requestAnimationFrame(animate);
      // 旋转物体
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      // 渲染场景 使用渲染器，通过相机将场景渲染进来
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      // 组件销毁时，清除动画效果
      mount.removeChild(renderer.domElement);
    };
  });

  return <div ref={mountRef} style={{ width: '100%', height: 700 }} />;
};

export default Demo1;
