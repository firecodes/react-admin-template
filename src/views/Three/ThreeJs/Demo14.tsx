import { useEffect, useRef } from "react";
// 导入three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 阵列立方体透视
const Demo14 = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    // DOM元素
    const mount = mountRef.current;
    // 1、创建场景
    const scene = new THREE.Scene();

    // 2、创建相机
    const camera = new THREE.PerspectiveCamera(
      45, // 视角度
      mount.clientWidth / mount.clientHeight, // 宽高比
      0.1, // 近平面 最近能看到的距离
      10000 // 远平面 最远能看到的距离
    );
    // 设置相机位置 x,y,z
    camera.position.set(2000, 2000, 2000);
    // 设置相机视角 默认是正上方
    camera.lookAt(1000, 0, 1000);
    // 添加到场景中
    scene.add(camera);

    // 添加世界坐标辅助器
    const axesHelper = new THREE.AxesHelper(300);
    // 添加到场景中
    scene.add(axesHelper);

    // 创建几何体 物体
    const cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
    // 创建子物体材质
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffff00,
      // 透明度
      transparent: true,
      opacity: 0.8,
    });
    // 创建网格物体 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // 将几何体添加到场景中
    scene.add(cube);
    // 设置物体位置
    cube.position.set(0, 0, 0);
    // 批量创建网格模型
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial); //网格模型对象Mesh
        // 在XOZ平面上分布
        mesh.position.set(i * 200, 0, j * 200);
        scene.add(mesh); //网格模型添加到场景中
      }
    }

    // 创建环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    // 添加到场景中
    scene.add(ambientLight);

    // 创建平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    directionalLight.position.set(50, 100, 60);
    // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
    directionalLight.target = cube;
    // 添加到场景中
    scene.add(directionalLight);

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
    // 相机控件.target属性在OrbitControls.js内部表示相机目标观察点，默认0,0,0
    controls.target.set(1000, 0, 1000);
    //update()函数内会执行camera.lookAt(controls.targe)
    controls.update();

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

export default Demo14;
