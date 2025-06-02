import { useEffect, useRef } from "react";
// 导入three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OBJLoader } from "three/examples/jsm/Addons.js";

// 导入3D模型
const Demo10 = () => {
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
      10000 // 远平面 最远能看到的距离
    );
    // 设置相机位置 x,y,z
    camera.position.set(200, 200, 3);
    // 设置相机视角 默认是正上方
    camera.lookAt(0, 0, 0);
    // 添加到场景中
    scene.add(camera);

    // 添加世界坐标辅助器
    const axesHelper = new THREE.AxesHelper(1000);
    // 添加到场景中
    scene.add(axesHelper);

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

    const obj = new OBJLoader();
    const gltf = new GLTFLoader();

    obj.load(
      "models/shuibeng.obj",
      function (object: any) {
        console.log("obj", object);
        object.position.set(0, 0, -20);
        // 设置模型大小
        scene.add(object);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    gltf.load(
      "models/building.glb",
      function (gltf: any) {
        gltf.scene.traverse(function (child: any) {
          if (child.isMesh) {
            // child.material = new THREE.MeshBasicMaterial({ wireframe: true });
          }
        });
        scene.add(gltf.scene);
        console.log("gltf", gltf);
        // 用于存储所有Mesh和Material
        const meshMaterials: any = [];
        gltf.scene.traverse(function (obj: any) {
          if (obj.isMesh) {
            console.log("gltf默认材质", obj.material);
            meshMaterials.push({
              mesh: obj,
              material: obj.material,
            });
          }
        });

        console.log("所有Mesh和Material:", meshMaterials);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    scene.add(ambientLight);

    // 添加点光源
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

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

export default Demo10;
