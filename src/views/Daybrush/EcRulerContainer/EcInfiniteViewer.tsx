import React from 'react';
import EcRulerContainer from './EcRulerContainer';
import useStore from '@/store/store';
import { Flex } from 'antd';
import ContextBox from '@/components/ContextBox/ContextBox';
import { useShallow } from 'zustand/shallow';

// 自制画布拖拽插件
function EcInfiniteViewer() {
  const { canvasScale } = useStore(useShallow((state) => ({
    canvasScale: state.canvasScale,
  })));

  return (
    <ContextBox title="EcInfiniteViewer 自制画布、标尺、拖拽、缩放">
      <div style={{ height: 790 }}>
        <EcRulerContainer>
          <Flex justify="center">
            <h2>画布比例：{(canvasScale * 100).toFixed(0) + '%'}</h2>
          </Flex>
        </EcRulerContainer>
      </div>
    </ContextBox>
  );
}

export default EcInfiniteViewer;
