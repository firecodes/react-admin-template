import React, { memo } from 'react'
import * as AndtIcons from '@ant-design/icons'

interface IconProps {
  name?: string
  className?: string
}

export const Icon: React.FC<IconProps> = memo(function Icon({ name, className }) {
  const customIcons: { [key: string]: any } = AndtIcons
  if (!name) return
  return React.createElement(customIcons[name], { className })
})
