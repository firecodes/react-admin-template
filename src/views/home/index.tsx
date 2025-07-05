import { Switch, Input, DatePicker, Space, Calendar } from 'antd'
import './index.less'

const { RangePicker } = DatePicker

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Space direction="vertical">
        <Switch />
        <RangePicker />
        <Input placeholder="Basic usage" />
        <Calendar fullscreen={false} />
      </Space>
    </div>
  )
}

export default HomePage
