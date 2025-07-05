import { Space } from 'antd'
import Notice from './components/Notice.tsx'
import HelpText from './components/HelpText.tsx'
import Fullscreen from './components/Fullscreen.tsx'
import UserAvatar from './components/UserAvatar.tsx'
import './Header.less'

const LayoutHeader: React.FC = () => {
  return (
    <header className="header-content">
      <img className="header-logo" src="/image/react.svg" alt="logo" />
      <h2 className="header-title">Admin Template</h2>

      <Space size={14}>
        <Notice />
        <HelpText />
        <Fullscreen />
        <UserAvatar />
      </Space>
    </header>
  )
}

export default LayoutHeader
