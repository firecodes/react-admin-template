
import React, { FC, memo, useState } from 'react';
import { Tooltip, Space, Flex, Menu, Modal, Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import s from './ChatMessageHeader.module.scss';
import { EvoIcon, FlexFillWidth } from '@/libs/b-components';
import { useHomeProvider } from '../../home-processor/HomeProvider'

export interface IChatMessageHeaderProps { }
export const ChatMessageHeader: FC<IChatMessageHeaderProps> = memo((props) => {
  const [collapseSlider, collapseDrawer] = useHomeProvider((s) => [
    s.collapseSlider,
    s.collapseDrawer,
  ]);
  const [chatTitle, setchatTitle] = useState('title')
  return (
    <div className={classNames(s.header, 'app-region-drag')}>
      <div className={classNames(s.left, 'app-region-no-drag')}>
        <Tooltip title="展开侧边栏">
          <Button
            className={'evo-button-icon'}
            type="text"
            icon={<EvoIcon size={'small'} type="icon-sidebar" />}
            onClick={collapseSlider}
          />
        </Tooltip>
      </div>
      <FlexFillWidth className={s.center}>
        <div className={classNames(s['chat-title'], 'app-region-no-drag')}>{chatTitle}</div>
      </FlexFillWidth>
      <div className={classNames(s.right, 'app-region-no-drag')}>
        {<Tooltip title="模型设置">
          <Button type="text" icon={<SettingOutlined />} onClick={collapseDrawer} />
        </Tooltip>}
      </div>
    </div>
  )
});