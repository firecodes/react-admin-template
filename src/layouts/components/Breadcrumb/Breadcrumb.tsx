import { useEffect } from 'react'
import { useMatches, Link } from 'react-router-dom'
import { Breadcrumb, Button } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { setGlobalState } from '@/redux/modules/global.ts'
import { useSelector, useDispatch, RootState } from '@/redux/index.ts'

const initList = [
  { title: <Link to={'/home/index'}>面包屑</Link> },
  { title: <Link to={'/home/index'}>暂未</Link> },
  { title: <Link to={'/home/index'}>施工</Link> }
]

const LayoutBreadcrumb: React.FC = () => {
  const matches = useMatches()
  const dispatch = useDispatch()
  const isCollapse = useSelector((state: RootState) => state.global.isCollapse)

  useEffect(() => {}, [matches])

  return (
    <>
      <Button
        type="text"
        style={{ marginRight: '10px' }}
        icon={isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(setGlobalState({ key: 'isCollapse', value: !isCollapse }))}
      ></Button>
      <Breadcrumb items={initList}></Breadcrumb>
    </>
  )
}

export default LayoutBreadcrumb
