import { ConfigProvider, App as AntProvider, theme } from 'antd'
import RouterProvider from '@/routers/index.tsx'
import { useSelector } from '@/redux/index.ts'
import dayjs from 'dayjs' //时间格式转换库
import zhCN from 'antd/locale/zh_CN' //antd中文语言包，默认英文
import enUS from 'antd/locale/en_US'
import 'dayjs/locale/zh-cn' //dayjs中文语言包，默认英文(antd切换中英文时，需要配合dayjs使用)

dayjs.locale('zh-cn')

const App: React.FC = () => {
  const { isDarkMode, language, themeColor, borderRaduis } = useSelector((state) => state.global)

  return (
    <ConfigProvider
      locale={language === 'zhCN' ? zhCN : enUS}
      theme={{
        token: { colorPrimary: themeColor, colorLink: themeColor, borderRadius: borderRaduis },
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <AntProvider>
        <RouterProvider />
      </AntProvider>
    </ConfigProvider>
  )
}

export default App
