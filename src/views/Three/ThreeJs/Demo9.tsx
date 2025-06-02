import { useEffect, useRef } from "react";
// 导入three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 包围盒子
const Demo9 = () => {
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

    // 第一个球体
    const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
      })
    );
    scene.add(sphere1);

    // 第二个球体
    const sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      })
    );
    sphere1.position.set(-2, 0, 0);
    scene.add(sphere2);

    // 第三个球体
    const sphere3 = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshBasicMaterial({
        // 黄色
        color: 0xffff00,
      })
    );
    sphere2.position.set(2, 0, 0);
    scene.add(sphere3);

    const box = new THREE.Box3();
    const arrSphere = [sphere1, sphere2, sphere3];
    for (let i = 0; i < arrSphere.length; i++) {
      // 第一种方式：通过物体的geometry属性获取包围盒
      // 获取当前物体的包围盒
      // arrSphere[i].geometry.computeBoundingBox();
      // 获取包围盒
      // const boxItem = arrSphere[i].geometry.boundingBox;
      // 合并包围盒
      // arrSphere[i].updateWorldMatrix(true, true);
      // if (!boxItem) continue;
      // 将包围盒转换到事件坐标系
      // boxItem.applyMatrix4(arrSphere[i].matrixWorld);
      // 合并包围盒
      // boxItem && box.union(boxItem);

      // 第二种方式：通过物体的boundingBox属性获取包围盒
      // 获取包围盒
      const boxItem = new THREE.Box3().setFromObject(arrSphere[i]);
      // 合并包围盒
      box.union(boxItem);
    }

    // 创建包围盒辅助器
    const boxHelper = new THREE.Box3Helper(box, 0xffff00);
    // 添加到场景中
    scene.add(boxHelper);

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

export default Demo9;
