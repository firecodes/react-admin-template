import { Table } from 'antd';
import { FC } from 'react';

export interface IApiTable {
  value: string;
  note: string;
  type: string;
  default?: string;
  version: string;
}

interface IProps {
  data: IApiTable[];
}

const ApiTable: FC<IProps> = (props) => {
  const { data } = props;

  const columns = [
    {
      title: '参数',
      dataIndex: 'value',
    },
    {
      title: '说明',
      dataIndex: 'note',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '默认值',
      dataIndex: 'default',
    },
    {
      title: '版本',
      dataIndex: 'version',
    },
  ];

  return (
    <Table
      rowKey="key"
      title={() => <span>EcChart API</span>}
      dataSource={data}
      columns={columns}
      pagination={false}
      bordered
    />
  );
};

export default ApiTable;
