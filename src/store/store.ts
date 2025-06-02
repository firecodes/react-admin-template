import { create } from 'zustand';

// 定义store的状态类型
interface CounterState {
  // 画布比例
  canvasScale: number;
  // set 画布比例
  setCanvasScale: (scale: number) => void;
}

// 创建一个全局状态存储store
const useStore = create<CounterState>((set) => ({
  // 画布展示比例
  canvasScale: 1,
  // set 画布比例
  setCanvasScale: (scale: number) => set({ canvasScale: scale }),
}));

export default useStore;
