import ContextBox from '@/components/ContextBox/ContextBox';
import {
  EditableProTable,
  ProCard,
  ProColumns,
  ProFormField,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

type DataSourceType = {
  id: number;
  title?: string;
  value?: number;
};

const defaultData: DataSourceType[] = new Array(5).fill(1).map((_, index) => {
  return {
    id: Date.now() + index,
    title: `活动名称${index}`,
    value: index,
  };
});

// 编辑表格示例
const EditableProTableView = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>(
    () => defaultData,
  );
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 120,
      valueType: 'index',
    },
    {
      title: '活动名称',
      dataIndex: 'title',
      width: 100,
    },
    {
      title: '参数',
      dataIndex: 'value',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '操作',
      width: 100,
      renderFormItem: () => {
        return <Button type="link">操作</Button>;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <ContextBox title="EditableProTable 编辑表格示例">
      <EditableProTable<DataSourceType>
        headerTitle="可编辑表格"
        columns={columns}
        rowKey="id"
        value={dataSource}
        // onChange={(data) => setDataSource([...data])}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
            value:dataSource.length+1
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={() => {
                // dataSource 就是当前数据，可以调用 api 将其保存
                console.log(dataSource);
              }}
            >
              保存数据
            </Button>,
          ];
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </ContextBox>
  );
};

export default EditableProTableView;
