import { useEffect } from 'react'
import { Spin } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './Loading.less'

// 进度条配置
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: true,
  trickleSpeed: 200,
  minimum: 0.3
})

const Loading: React.FC = () => {
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  }, [])

  return (
    <div className="loading-pages">
      <Spin size="large" />
    </div>
  )
}

export default Loading
