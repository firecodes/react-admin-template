import { App } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import type { NotificationInstance } from 'antd/es/notification/interface'

let message: MessageInstance
let notification: NotificationInstance
let modal: Omit<ModalStaticFunctions, 'warn'>

/**
 * @description 封装antd的message、notification、modal,用于全局使用，并且适配主题色变化
 * @description 文档：https://ant-design.antgroup.com/components/app-cn
 * @returns null
 */
export default () => {
  const staticFunction = App.useApp()
  message = staticFunction.message
  modal = staticFunction.modal
  notification = staticFunction.notification
  return null
}

export { message, notification, modal }
