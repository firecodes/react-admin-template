/* eslint-disable react/no-unknown-property */
import { OrbitControls, Sky, useKeyboardControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { FC, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// 键盘控制组件
// function KeyboardControls() {
//   const { camera } = useThree()
//   const [sub] = useKeyboardControls()
//   const movementSpeed = 0.5

//   useFrame(() => {
//     const { forward, backward, left, right } = sub.get()
//     const direction = new THREE.Vector3()

//     if (forward) direction.z -= movementSpeed
//     if (backward) direction.z += movementSpeed
//     if (left) direction.x -= movementSpeed
//     if (right) direction.x += movementSpeed

//     camera.position.add(direction)
//   })

//   return null
// }

// 可拖动对象组件
function Draggable({ children, name }: any) {
  const ref = useRef<THREE.Mesh>()
  const { camera, scene, raycaster } = useThree()
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation()
      const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      )

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)
      console.log('intersects: ', intersects);

      if (intersects[0]?.object === ref.current) {
        setDragging(!dragging)
      }
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [dragging])

  useFrame(({ mouse }) => {
    if (dragging) {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children)
      for (const intersect of intersects) {
        if (intersect.object.userData?.ground) {
          ref.current!.position.copy(intersect.point)
          ref.current!.position.y = intersect.point.y + ref.current!.scale.y
          break
        }
      }
    }
  })

  return (
    <mesh
      ref={ref}
      userData={{ draggable: true, name }}
      castShadow
      receiveShadow
    >
      {children}
    </mesh>
  )
}

// 地面组件
function Ground() {
  return (
    <mesh
      rotation={[0, 0, 0]}
      position={[0, -1, 3]}
      scale={[100, 2, 100]}
      userData={{ ground: true }}
      receiveShadow
    >
      <boxGeometry />
      <meshPhongMaterial color="#f9c834" />
    </mesh>
  )
}

// 方块组件
function Box() {
  return (
    <Draggable name="BOX">
      <boxGeometry args={[6, 6, 6]} />
      <meshPhongMaterial color="#DC143C" />
    </Draggable>
  )
}

// 球体组件
function Sphere() {
  return (
    <Draggable name="SPHERE" position={[15, 4, -15]}>
      <sphereGeometry args={[4, 32, 32]} />
      <meshPhongMaterial color="#43a1f4" />
    </Draggable>
  )
}

// 圆柱体组件
function Cylinder() {
  return (
    <Draggable name="CYLINDER" position={[-15, 3, 15]}>
      <cylinderGeometry args={[4, 4, 6, 32]} />
      <meshPhongMaterial color="#90ee90" />
    </Draggable>
  )
}

// // 城堡组件
// function Castle() {
//   const obj = useLoader(OBJLoader, '/castle.obj')
//   const ref = useRef<THREE.Group>()

//   useEffect(() => {
//     if (obj) {
//       obj.traverse(child => {
//         if (child instanceof THREE.Mesh) {
//           child.castShadow = true
//           child.receiveShadow = true
//         }
//       })
//       ref.current!.position.set(-15, 0, -15)
//       ref.current!.scale.set(5, 5, 5)
//     }
//   }, [obj])

//   return (
//     <Draggable name="CASTLE">
//       <primitive object={obj} ref={ref} />
//     </Draggable>
//   )
// }

// 主场景组件
function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[-30, 50, -30]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera={{
          left: -70,
          right: 70,
          top: 70,
          bottom: -70
        }}
      />
      <Ground />
      <Box />
      <Sphere />
      <Cylinder />
      {/* <Castle /> */}
      <OrbitControls
        enableRotate={false}
        enablePan={true}
        panSpeed={0.5}
        screenSpacePanning={true}
      />
      {/* <KeyboardControls /> */}
    </>
  )
}
// 主场景组件
const FiberDemo3: FC = () => {
  return (

    <Canvas 
  
      camera={{
        fov: 30,
        near: 1,
        far: 1500,
        position: [-35, 70, 100] }}  >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]}
              cellSize={1}
              cellThickness={1}
              cellColor={'#6f6f6f'}
              sectionSize={4}
              sectionThickness={1.5}
              sectionColor={'#9d4b4b'}
              fadeDistance={100}
              fadeStrength={0.4}
              followCamera={true}
              infiniteGrid={true}
            /> */}
      <Sky distance={300} turbidity={8} sunPosition={[1, 0, 0]} inclination={0} azimuth={0.3} rayleigh={6} mieCoefficient={0.005} mieDirectionalG={0.8} />
      <Scene />
      <OrbitControls makeDefault />
    </Canvas>
  )
}
export default FiberDemo3