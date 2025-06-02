import { Button, Flex } from 'antd';
import ContextBox from '@/components/ContextBox/ContextBox';
import { useState } from 'react';

// Flex实现滚动响应式
const FlexAutoRoll = () => {
  // 展开关闭
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ContextBox title="Flex布局 实现100%高度动态自适应布局">
      <Flex style={{ height: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid red',
            height: '100%',
            width: 300,
            padding: 16,
          }}
        >
          <Flex
            justify="space-between"
            align="center"
            style={{
              flex: 'none',
              border: '1px solid red',
              padding: 16,
              height: isOpen ? 200 : 60,
            }}
          >
            <div>头部自适应高度</div>
            <Button
              type="link"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? '收起' : '展开'}
            </Button>
          </Flex>
          <div
            style={{
              flex: 1,
              height: '100%',
              overflow: 'auto',
            }}
          >
            {Array.from({ length: 50 }).map((_, index) => (
              <div
                style={{
                  textAlign: 'center',
                  margin: '4px 0px',
                  padding: '4px 0px',
                  background: '#1D2C41',
                }}
                key={index}
              >
                {index}
              </div>
            ))}
          </div>
        </div>
        <div style={{ paddingLeft: 16, fontSize: 20 }}>
          <div>父组件:</div>
          <div style={{ color: 'yellow', paddingLeft: 30 }}>
            <p>display: flex</p>
            <p>flexDirection: column</p>
          </div>
          <div>Header组件:</div>
          <div style={{ color: 'yellow', paddingLeft: 30 }}>
            <p>flex: none</p>
          </div>
          <div>Content组件:</div>
          <div style={{ color: 'yellow', paddingLeft: 30 }}>
            <p>flex: 1</p>
          </div>
        </div>
      </Flex>
    </ContextBox>
  );
};

export default FlexAutoRoll;
