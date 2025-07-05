import { useEffect, useState } from 'react'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { message } from '@/hooks/useMessage.ts'

const iconStyle = {
  fontSize: '20px',
  color: '#9b9c9d',
  cursor: 'pointer'
}

const Fullscreen: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false) //是否进入全屏模式
  useEffect(() => {
    // 监听全屏状态
    document.addEventListener('fullscreenchange', lisetener)

    // 移除监听器
    return () => {
      document.removeEventListener('fullscreenchange', lisetener)
    }
  }, [])
  function lisetener() {
    const isFullscreen = document.fullscreenElement
    isFullscreen ? setIsFullscreen(true) : setIsFullscreen(false)
  }

  // 全屏切换
  const handleFullScreen = (full: boolean) => {
    const hasFullscreen = document.fullscreenEnabled
    if (!hasFullscreen) {
      message.open({
        type: 'error',
        content: '当前浏览器暂不支持全屏功能'
      })
      return
    }

    full ? document.documentElement.requestFullscreen() : document.exitFullscreen()
  }

  return (
    <>
      {isFullscreen ? (
        <FullscreenExitOutlined style={iconStyle} onClick={() => handleFullScreen(false)} />
      ) : (
        <FullscreenOutlined style={iconStyle} onClick={() => handleFullScreen(true)} />
      )}
    </>
  )
}

export default Fullscreen
