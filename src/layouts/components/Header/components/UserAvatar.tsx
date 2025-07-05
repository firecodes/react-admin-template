import { useNavigate } from 'react-router-dom'
import { setToken } from '@/redux/modules/user.ts'
import { setGlobalState } from '@/redux/modules/global.ts'
import { setAuthMenuList } from '@/redux/modules/auth.ts'
import { useDispatch, useSelector } from '@/redux/index.ts'
import { MenuProps, Dropdown, Avatar } from 'antd'
import { modal } from '@/hooks/useMessage.ts'
import { HOME_PATH } from '@/config/index.ts'
import {
  HomeOutlined,
  UserOutlined,
  FormOutlined,
  LoginOutlined,
  ExclamationCircleOutlined,
  WindowsOutlined
} from '@ant-design/icons'

const UserAvatar: React.FC = () => {
  const dispatch = useDispatch()
  const { isOpenDrawer } = useSelector((state) => state.global)

  // 退出登录
  const navigate = useNavigate()
  const handleLogout = () => {
    modal.confirm({
      title: '温馨提示💖',
      content: '您确定要退出登录吗？',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch(setToken(''))
        dispatch(setAuthMenuList([]))
        navigate('/login', { replace: true })
      }
    })
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>首页</span>,
      icon: <HomeOutlined style={{ fontSize: '14px' }} />,
      onClick: () => navigate(HOME_PATH)
    },
    {
      key: '2',
      label: <span>个人信息</span>,
      icon: <UserOutlined style={{ fontSize: '14px' }} />,
      disabled: true
    },
    {
      key: '3',
      label: <span>修改密码</span>,
      icon: <FormOutlined style={{ fontSize: '14px' }} />,
      disabled: true
    },
    {
      key: '4',
      label: <span>系统设置</span>,
      icon: <WindowsOutlined style={{ fontSize: '14px' }} />,
      onClick: () => dispatch(setGlobalState({ key: 'isOpenDrawer', value: !isOpenDrawer }))
    },
    {
      type: 'divider'
    },
    {
      key: '5',
      label: <span>退出登录</span>,
      icon: <LoginOutlined style={{ fontSize: '14px' }} />,
      onClick: handleLogout
    }
  ]

  return (
    <>
      <Dropdown menu={{ items }} placement="bottom" arrow>
        <Avatar
          style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
          size={42}
          src="https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_1280.png"
        />
      </Dropdown>
    </>
  )
}

export default UserAvatar
