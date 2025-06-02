
import React, { FC, memo, useState } from 'react';
import { Space, Flex, Menu, Modal, Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import classNames from 'classnames';
import s from './ChatListHeader.module.scss';
import { SearchChat } from '../chat-search/ChatSearch';

import { EvoIcon, SelectorAssistant } from '@/libs/b-components';

export interface IChatListHeaderProps {
  onNewChat?: () => void
}
export const ChatListHeader: FC<IChatListHeaderProps> = memo((props) => {
  const { onNewChat } = props
  return (
    <div className={s.header}>
      <Space>
        <Button
          className={classNames('evo-button-icon')}
          onClick={onNewChat}
          variant="filled"
          color="default"
          icon={<EvoIcon size={'small'} type="icon-message" />}
        >
          <span style={{ fontSize: 13 }}>新对话</span>
        </Button>
        <SelectorAssistant showAddAssistant>
          <Button
            className={classNames('evo-button-icon')}
            variant="filled"
            color="default"
            icon={<EvoIcon size={'small'} type="icon-assistant" />}
          >
            <span style={{ fontSize: 13 }}>助手</span>
          </Button>
        </SelectorAssistant>
      </Space>

      <div className={s.actions}>
        <SearchChat />
      </div>
    </div>
  )
});