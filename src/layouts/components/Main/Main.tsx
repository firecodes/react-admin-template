import React, { useRef } from 'react'
import { useOutlet, useLocation } from 'react-router-dom'
// import { Layout } from 'antd'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

// const { Content } = Layout
// 二级路由视图出口
const LayoutMain: React.FC = () => {
  const outlet = useOutlet()
  const { pathname } = useLocation()

  const nodeRef = useRef(null)

  return (
    <SwitchTransition>
      <CSSTransition nodeRef={nodeRef} classNames="fade" key={pathname} timeout={300} exit={false}>
        {/* 此处加一层div为了消除 react-transition-group 的警告 */}
        <div ref={nodeRef} style={{ height: '100%', width: '100%' }}>
          {outlet}
        </div>
        {/* <Content ref={nodeRef}>{outlet}</Content> */}
      </CSSTransition>
    </SwitchTransition>
  )
}

export default LayoutMain
