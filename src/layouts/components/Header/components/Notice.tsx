import { Avatar, List, Popover, Badge, Tabs, Empty } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import type { TabsProps } from 'antd'

const AllMessageList: React.FC = () => {
  const data = [
    {
      title: 'Ant Design Title 1'
    },
    {
      title: 'Ant Design Title 2'
    },
    {
      title: 'Ant Design Title 3'
    },
    {
      title: 'Ant Design Title 4'
    }
  ]

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  )
}

const Notice: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `全部（${4}）`,
      children: <AllMessageList />
    },
    {
      key: '2',
      label: `待办（${0}）`,
      children: <Empty description="暂无待办" />
    },
    {
      key: '3',
      label: `已办（${0}）`,
      children: <Empty description="暂无已办" />
    }
  ]

  const PopoverContent = <Tabs defaultActiveKey="1" items={items} />

  return (
    <Popover placement="bottom" trigger="click" overlayClassName="header-notice" content={PopoverContent}>
      <Badge dot={true}>
        <BellOutlined style={{ fontSize: '20px', color: '#9b9c9d', cursor: 'pointer' }} />
      </Badge>
    </Popover>
  )
}

export default Notice
