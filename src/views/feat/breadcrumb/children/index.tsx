import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const ChildrenIndex: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <p style={{ marginBottom: '20px' }}>层级模式</p>
      <Button type="primary" onClick={() => navigate('/feat/breadcrumb/children/detail')}>
        跳转层级详情页
      </Button>
    </div>
  )
}

export default ChildrenIndex
