import { useEffect } from 'react'
import { useSelector } from '@/redux/index.ts'

/**
 * @description: 暗夜模式切换
 */
const useSystemTheme = () => {
  const { isDarkMode } = useSelector((state) => state.global)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])
}

export default useSystemTheme
