import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const FlatIndex: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>平级模式</div>
      <Button type="primary" onClick={() => navigate('/feat/breadcrumb/flatDetail')}>
        跳转平级详情页
      </Button>
    </div>
  )
}

export default FlatIndex
