
import React, { FC, memo, useState, useMemo, useLayoutEffect } from 'react';
import { Flex, Menu, Modal, Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import s from './ChatList.module.scss';
import { useMemoizedFn } from 'ahooks';
import type { MenuProps } from 'antd';
import { debounce } from 'lodash';

import { FlexFillContent, MenuItem } from '@/libs/b-components';
import { ChatListHeader } from './chat-list-header/ChatListHeader'
import { ChatItemMenu } from './chat-item-menu/ChatItemMenu';

import {
  IN_30_DAY_TEXT,
  IN_7_TEXT,
  MORE_EARLY_TEXT,
  TODAY_TEXT,
  formatDateGroup,
} from '@/libs/utils';

export interface IChatListItem {
  id: string;
  title: string | React.ReactNode;
  createdTime: number;
  dateGroup: string;
  chatIns: any;
}


export interface IChatListrops { }
export const ChatList: FC<IChatListrops> = memo((props) => {
  const navigate = useNavigate();
  // const [chatCtrl] = useGlobalCtx((ctx) => ctx.chatCtrl);
  // const [curWinId] = useGlobalCtx((ctx) => ctx.curWinId);

  // const defaultMessageModel = useSettingSelector((s) => s.defaultMessageModel);
  const [defaultMessageModel]: any = useState('')
  // const selectedKeys = useMemo(() => [curWinId], [curWinId]);
  const selectedKeys: any = useState([])

  const handleNewChat = useMemoizedFn(async () => {
    if (!defaultMessageModel) {  // TODO 待完善，弹框设置
      Modal.confirm({
        title: '未设置默认模型',
        content: '您还没有设置默认会话模型，需要先设置默认模型才能开始对话',
        okText: '去设置',
        cancelText: '取消',
        onOk: () => { },
      });
      return;
    }
    // const win = await chatCtrl.createWindow();
    // win.updateConfigModels([defaultMessageModel]);
  });

  const handleSelect = useMemoizedFn((info) => {
    const { key } = info;
    // chatCtrl.setCurrentWin(key);
  });

  const handleMenuAction = useMemoizedFn(async (winId: string, action: string) => {
    switch (action) {
      case 'rename':
        console.log('重命名:', winId);
        break;
      case 'export_md':
        console.log('导出到 Markdown:', winId);
        break;
      case 'export_image':
        console.log('导出到图片:', winId);
        break;
      case 'delete':
        // chatCtrl.removeWindow(winId);
        console.log('删除:', winId);
        break;
    }
  });

  // const { groupedChatList } = useChatList();
  const [chatList, setChatList] = useState<IChatListItem[]>([]);
  useLayoutEffect(() => {
    const computeChatList = () => {
      let windowConfig = {
        id: '123',
        createdTime: Date.now(),
      }
      let windowIns = {
        title: '今天 深度搜索',
        ...windowConfig
      }
      setChatList([{
        id: windowConfig.id,
        title: windowIns.title || '未标题',
        createdTime: windowConfig.createdTime,
        dateGroup: formatDateGroup(windowConfig.createdTime),
        chatIns: windowIns,
      }])
      // const listLayout = chatCtrl.windowLayout.get();
      // const tasks = listLayout.map((id) =>
      //   chatCtrl.getWindow(id).then(async (windowIns) => {
      //     await windowIns.ready();
      //     const windowConfig = windowIns.getConfigState();
      //     return {
      //       id: windowConfig.id,
      //       title: windowIns.title.get() || '未标题',
      //       createdTime: windowConfig.createdTime,
      //       dateGroup: formatDateGroup(windowConfig.createdTime),
      //       chatIns: windowIns,
      //     };
      //   })
      // );
      // Promise.all(tasks).then(setChatList);
    };
    const debounceComputeChatList = debounce(computeChatList, 50);
    debounceComputeChatList();
    return () => { };
  }, []);

  const groupedChatList = useMemo(() => {
    // 按日期分组
    const groupedChats = chatList.reduce((groups, chat) => {
      const date = chat.dateGroup;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(chat);
      return groups;
    }, {} as Record<string, IChatListItem[]>);

    const sortedList: Array<{ groupName: string; chats: IChatListItem[] }> = [];
    const todayGroup = groupedChats[TODAY_TEXT];
    const in7DayGroup = groupedChats[IN_7_TEXT];
    const in30DayGroup = groupedChats[IN_30_DAY_TEXT];
    const moreEarlyGroup = groupedChats[MORE_EARLY_TEXT];
    todayGroup && sortedList.push({ groupName: TODAY_TEXT, chats: todayGroup });
    in7DayGroup && sortedList.push({ groupName: IN_7_TEXT, chats: in7DayGroup });
    in30DayGroup && sortedList.push({ groupName: IN_30_DAY_TEXT, chats: in30DayGroup });
    moreEarlyGroup && sortedList.push({ groupName: MORE_EARLY_TEXT, chats: moreEarlyGroup });
    return sortedList;
  }, [chatList]);

  const menus: MenuProps['items'] = React.useMemo(() => {
    return groupedChatList.map((record: any) => {
      return {
        key: record.groupName,
        label: record.groupName,
        type: 'group',
        children: record.chats.map((chatInfo: any) => ({
          key: chatInfo.id,
          label: (
            <>
              <MenuItem
                name={chatInfo.title}
                operationContent={
                  <ChatItemMenu onAction={handleMenuAction} chatIns={chatInfo.chatIns} />
                }
              />
            </>
          ),
        })),
      };
    });
  }, [groupedChatList]);

  return (
    <Flex vertical className={s.container}>
      {<ChatListHeader onNewChat={handleNewChat} />}
      <FlexFillContent>
        <Menu
          className={'evo-menu'}
          mode="inline"
          items={menus}
          onSelect={handleSelect}
          selectedKeys={selectedKeys}
        />
      </FlexFillContent>
    </Flex>
  )
});