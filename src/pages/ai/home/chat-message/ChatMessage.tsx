
import React, { FC, memo, useState } from 'react';
import { Drawer, Flex, Menu, Modal, Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import s from './ChatMessage.module.scss';
import { useHomeProvider } from '../home-processor/HomeProvider'

// import { FlexFillContent, MenuItem } from '@/libs/b-components';
import { ChatMessageHeader } from './chat-message-header/ChatMessageHeader'

export interface IChatMessageProps { }
export const ChatMessage: FC<IChatMessageProps> = memo((props) => {
  const [drawerVisible, collapseDrawer] = useHomeProvider((s) => [
    s.drawerVisible,
    s.collapseDrawer,
  ]);

  return (
    <div className={s.container}>
      <ChatMessageHeader />
      <div className={s.content}>
        <Drawer
          title="设置"
          placement="right"
          onClose={() => collapseDrawer()}
          open={drawerVisible}
          width={400}
          getContainer={false}
          style={{ position: 'absolute' }}
          rootStyle={{ position: 'absolute' }}
        >
          (<span>设置</span>)
        </Drawer>
      </div>
    </div>
  )
});