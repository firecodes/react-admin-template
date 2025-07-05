import { useEffect, useState } from 'react'
import { Drawer, theme, Input, ColorPicker, Slider, InputNumber, Radio } from 'antd'
import type { InputNumberProps, RadioChangeEvent } from 'antd'
import { setGlobalState } from '@/redux/modules/global'
import { useDispatch, useSelector } from '@/redux/index.ts'
import lightImg from '@/assets/images/bg_light.svg'
import darkImg from '@/assets/images/bg_dark.svg'
import './ThemeSetting.less'

const { useToken } = theme
const colorList: string[] = ['#1677FF', '#5A54F9', '#9E339F', '#ED4192', '#E0282E', '#F4801A', '#F2BD27', '#00B96B']

const SystemTheme: React.FC = () => {
  const { token } = useToken()
  const dispatch = useDispatch()
  const { isOpenDrawer, isDarkMode, borderRaduis, themeColor } = useSelector((state) => state.global)

  const [activeMode, setActiveMode] = useState<number>(1)
  const [radioValue, setRadioValue] = useState<number>(1)
  const isCustom: boolean = colorList.includes(themeColor)

  useEffect(() => {
    isDarkMode ? setActiveMode(2) : setActiveMode(1)
  }, [])

  // 定义抽屉容器样式
  const drawerStyles = {
    content: { color: token.colorTextBase }
  }
  const onChange: InputNumberProps['onChange'] = (newValue) => {
    dispatch(setGlobalState({ key: 'borderRaduis', value: newValue as number }))
  }
  const onChangeRadio = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value)
  }
  // 事件处理函数-选择主题模式
  function switchMode(mode: boolean) {
    mode ? setActiveMode(2) : setActiveMode(1)
    dispatch(setGlobalState({ key: 'isDarkMode', value: mode }))
  }
  // 事件处理函数-选择主题颜色
  function switchColor(color: string) {
    dispatch(setGlobalState({ key: 'themeColor', value: color }))
  }

  return (
    <Drawer
      open={isOpenDrawer}
      title="主题设置"
      styles={drawerStyles}
      onClose={() => dispatch(setGlobalState({ key: 'isOpenDrawer', value: !isOpenDrawer }))}
    >
      {/* 主题设置 */}
      <div className="drawer-content">
        <span className="content-title">模式：</span>
        <ul className="mode-list">
          <li className="content-mode" onClick={() => switchMode(false)}>
            <img className={activeMode === 1 ? 'icon-mode-active' : 'icon-mode'} src={lightImg} alt="dark" />
            <span className="title-mode">默认</span>
          </li>
          <li className="content-mode" onClick={() => switchMode(true)}>
            <img className={activeMode === 2 ? 'icon-mode-active' : 'icon-mode'} src={darkImg} alt="dark" />
            <span className="title-mode">暗黑</span>
          </li>
        </ul>
      </div>

      {/* 主色设置 */}
      <div className="drawer-content">
        <span className="content-title">主色：</span>
        <div className="select-color">
          <Input value={themeColor} style={{ width: '120px' }} onChange={(e) => switchColor(e.target.value)}></Input>
          <ul className="color-list">
            {colorList.map((color) => (
              <li
                className={themeColor === color ? 'color-item active' : 'color-item'}
                key={color}
                style={{ background: color }}
                onClick={() => switchColor(color)}
              ></li>
            ))}

            <ColorPicker onChange={(_, css) => switchColor(css)}>
              <li className={isCustom ? 'color-item' : 'color-item active'}></li>
            </ColorPicker>
          </ul>
        </div>
      </div>

      {/* 圆角设置 */}
      <div className="drawer-content">
        <span className="content-title">圆角：</span>
        <div className="select-color">
          <InputNumber min={1} max={20} value={borderRaduis} style={{ width: '120px' }} onChange={onChange} />
          <Slider min={1} max={20} onChange={onChange} value={borderRaduis} />
        </div>
      </div>

      {/* 宽松度设置 */}
      <div className="drawer-content">
        <span className="content-title">宽松度：</span>
        <div className="select-color">
          <Radio.Group onChange={onChangeRadio} value={radioValue}>
            <Radio value={1}>默认</Radio>
            <Radio value={2}>紧凑</Radio>
          </Radio.Group>
        </div>
      </div>
    </Drawer>
  )
}

export default SystemTheme
