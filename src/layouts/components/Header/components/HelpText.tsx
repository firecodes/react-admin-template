import { QuestionCircleOutlined } from '@ant-design/icons'

const HelpText: React.FC = () => {
  const outLinedStyle = { fontSize: '20px', color: '#9b9c9d', cursor: 'pointer' }

  return (
    <QuestionCircleOutlined
      style={outLinedStyle}
      onClick={() => window.open('https://gitee.com/west-mexico/react-admin-template')}
    />
  )
}

export default HelpText
