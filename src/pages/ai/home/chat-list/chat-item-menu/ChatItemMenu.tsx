
import React, { FC, memo, useState } from 'react';
import { Form, MenuProps, Space, Flex, Menu, Modal, Button, Result } from "antd";
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useNavigate } from "react-router-dom";
import classNames from 'classnames';
import { useMemoizedFn } from 'ahooks';
import s from './ChatItemMenu.module.scss';
import { FlexFillContent, MenuItem } from '@/libs/b-components'


export interface IChatMenuRenameForm {
  title: string;
}
export interface IChatItemMenuProps {
  onAction?: (winId: string, action: string) => void;
  chatIns: any;
}

export const ChatItemMenu: FC<IChatItemMenuProps> = memo((props) => {
  const { onAction } = props
  // const [chatCtrl] = useGlobalCtx((ctx) => ctx.chatCtrl);
  // const [curWinId] = useGlobalCtx((ctx) => ctx.curWinId);
  // const [winId] = useCellValue(chatIns.configState.getCellSync('id'));
  const [winId] = useState('id');
  const [renameVisible, setRenameVisible] = useState(false);
  const [form] = Form.useForm<any>();


  const handleMenuClick = useMemoizedFn((key: string) => {
    if (!winId) return;
    onAction?.(winId, key);
    switch (key) {
      case 'rename':
        setRenameVisible(true);
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
  const dropdownMenu: MenuProps = React.useMemo(() => {
    const menuProps: MenuProps = {
      items: [
        {
          key: 'rename',
          label: '重命名',
        },
        {
          key: 'export',
          label: '导出',
          children: [
            {
              key: 'export_md',
              label: '导出到 Markdown',
            },
            {
              key: 'export_image',
              label: '导出到图片',
            },
          ],
        },
        {
          type: 'divider',
        },
        {
          key: 'delete',
          label: '删除',
          danger: true,
        },
      ],
      onClick: ({ key }) => handleMenuClick(key),
    };
    return menuProps;
  }, [handleMenuClick]);

  const closeRename = useMemoizedFn(() => setRenameVisible(false));
  const handleRename = useMemoizedFn(async (formData: IChatMenuRenameForm) => {
    // chatIns.configState.setCellValueSync('manualTitle', formData.title);
    closeRename();
  });
  return (
    <>
      <MenuItem.MenuOperationDropdown
        menus={dropdownMenu}
      ></MenuItem.MenuOperationDropdown>
      <ModalForm
        open={renameVisible}
        title="重命名"
        width={400}
        form={form}
        autoFocusFirstInput
        initialValues={{
          title: 'manualTitle',
        }}
        modalProps={{
          destroyOnClose: true,
          onCancel: closeRename,
        }}
        submitTimeout={1000}
        onFinish={handleRename}
      >
        <ProFormText
          name={'title'}
          label="聊天名称"
          rules={[
            {
              required: true,
              message: '聊天名称不能为空',
            },
          ]}
          placeholder="请输入名称"
        />
      </ModalForm>
    </>
  )
});