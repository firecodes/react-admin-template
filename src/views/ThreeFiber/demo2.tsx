/* eslint-disable react/no-unknown-property */
import { Canvas, GridHelperProps } from '@react-three/fiber'
import { OrbitControls, DragControls, Box, Text, Environment, Sky, Grid } from '@react-three/drei'
import { useMemo, useState, useEffect, useRef, FC } from 'react'
import { create } from 'zustand'
import * as THREE from 'three'
import { Flex } from 'antd'

// 类型定义
type CubeType = 'ground' | 'platform'

interface Cube {
  id: number
  pos: [number, number, number]
  type: CubeType
}

interface StoreState {
  cubes: Cube[]
  selectedType: CubeType
  addCube: (pos: [number, number, number], type: CubeType) => void
  updateCube: (id: number, pos: [number, number, number]) => void
  setType: (type: CubeType) => void
}

// 状态管理
const useStore = create<StoreState>((set: any) => ({
  cubes: [],
  selectedType: 'ground',
  addCube: (pos: [number, number, number], type: CubeType) => set((state: any) => ({
    cubes: [...state.cubes, { id: Math.random(), pos, type }]
  })),
  updateCube: (id, pos) => set((state: any) => ({
    cubes: state.cubes.map((cube: any) =>
      cube.id === id ? { ...cube, pos } : cube
    )
  })),
  setType: (type) => set({ selectedType: type })
}))

// 部署预览网格组件
interface DeployPreviewProps {
  position: THREE.Vector3
  onSelectPosition: (pos: [number, number, number]) => void
}

const DeployPreview: FC<DeployPreviewProps> = ({ position, onSelectPosition }) => {
  // 生成9个相邻格子的位置
  const previewPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let x = -1; x <= 1; x++) {
      for (let z = -1; z <= 1; z++) {
        positions.push([
          Math.round(position.x) + x,
          0,
          Math.round(position.z) + z
        ]);
      }
    }
    return positions;
  }, [position]);

  // 计算鼠标位置最近的网格点
  const findNearestPosition = (pos: THREE.Vector3): [number, number, number] => {
    let minDist = Infinity;
    let nearest: [number, number, number] = [0, 0, 0];

    previewPositions.forEach(gridPos => {
      const dist = Math.hypot(pos.x - gridPos[0], pos.z - gridPos[2]);
      if (dist < minDist) {
        minDist = dist;
        nearest = gridPos;
      }
    });

    return nearest;
  };

  // 当拖动结束时自动选择最近的网格点
  useEffect(() => {
    const nearest = findNearestPosition(position);
    onSelectPosition(nearest);
  }, [position, onSelectPosition]);

  return (
    <>
      {previewPositions.map((pos, index) => (
        <mesh key={index} position={pos}>
          <boxGeometry args={[1, 0.1, 1]} />
          <meshBasicMaterial
            color="#00ff88"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </>
  );
};

// 可交互方块组件
interface DraggableCubeProps {
  cube: Cube
}

const DraggableCube: FC<DraggableCubeProps> = ({ cube }) => {
  const [dragging, setDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<THREE.Vector3 | null>(null);
  const updateCube = useStore((state: any) => state.updateCube);
  const meshRef = useRef<THREE.Mesh>(null);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDrag = () => {
    if (meshRef.current) {
      setDragPosition(meshRef.current.position.clone());
    }
  };

  const handleSelectPosition = (pos: [number, number, number]) => {
    updateCube(cube.id, pos);
  };

  const handleDragEnd = () => {
    setDragging(false);
    setDragPosition(null);
      console.log('meshRef?.current?.position: ', meshRef?.current);

    // 将方块的高度归零
    updateCube(cube.id, [
      dragPosition?.x || cube.pos[0],
      0,
      dragPosition?.z || cube.pos[2],
    ]);
    if (meshRef.current) {
      meshRef?.current?.position.set(0,0,5);
    
    }
  };

  return (
    <>
      {dragging && dragPosition && (
        <DeployPreview 
          position={dragPosition}
          onSelectPosition={handleSelectPosition}
        />
      )}
      <DragControls
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        <Box
          ref={meshRef}
          args={[0.8, 0.8, 0.8]}
          position={cube.pos}
          material-color={cube.type === 'ground' ? '#4CAF50' : '#2196F3'}
        >
          <meshStandardMaterial />
        </Box>
      </DragControls>
    </>
  );
};

// 控制面板组件
const ControlsPanel: FC = () => {
  const addCube = useStore(state => state.addCube)
  const selectedType = useStore(state => state.selectedType)

  return (
    <div className="controls">
      <button
        style={{ background: selectedType === 'ground' ? '#4CAF50' : '' }}
        onClick={() => useStore.setState({ selectedType: 'ground' })}
      >
        地面方块
      </button>
      <button
        style={{ background: selectedType === 'platform' ? '#2196F3' : '' }}
        onClick={() => useStore.setState({ selectedType: 'platform' })}
      >
        高台方块
      </button>
      <button onClick={() => {
        const y = selectedType === 'ground' ? 0 : 0.5
        addCube([0, y, 0], selectedType)
      }}>
        新建方块
      </button>
    </div>
  )
}

// 主场景组件
const FiberSc: FC = () => {
  const cubes = useStore(state => state.cubes)

  return (
    <Flex vertical style={{ height: '100vh' }} >
      <ControlsPanel />
      <Canvas camera={{ position: [10, 10, 10] }}  >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]}
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
        />
        <Sky distance={300} turbidity={8} sunPosition={[1, 0, 0]} inclination={0} azimuth={0.3} rayleigh={6} mieCoefficient={0.005} mieDirectionalG={0.8} />
        {cubes.map(cube => (
          <DraggableCube key={cube.id} cube={cube} />
        ))}
        <OrbitControls makeDefault />
      </Canvas>
    </Flex>
  )
}

export default FiberSc