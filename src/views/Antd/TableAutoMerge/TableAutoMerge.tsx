import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';

// Table动态合并单元格
const TableAutoMerge = () => {
  const [tableData, setTableData] = useState<any>([]);

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    {
      title: '分类',
      dataIndex: 'category',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '值',
      dataIndex: 'value',
      onCell: (row: any) => ({ rowSpan: row.rowSpan || 0 }),
    },
  ];

  useEffect(() => {
    getData(false);
  }, []);

  function getData(type: boolean) {
    const data = [
      {
        id: 1,
        category: '水果',
        name: '桃子',
        value: 111,
      },
      {
        id: 3,
        category: '水果',
        name: '梨子',
        value: 111,
      },
      {
        id: 4,
        category: '蔬菜',
        name: '茄子',
        value: 222,
      },
      {
        id: 2,
        category: '家禽',
        name: '牛',
        value: 333,
      },
      {
        id: 5,
        category: '家禽',
        name: '羊',
        value: 333,
      },
      {
        id: 6,
        category: '家禽',
        name: '猪',
        value: 333,
      },
    ];
    if (type) {
      const res = handleData(
        data.sort((a, b) => b.id - a.id),
        'value',
      );
      setTableData(res);
    } else {
      const res = handleData(data, 'value');
      setTableData(res);
    }
  }

  // 处理数据合并
  function handleData(array: any, key: string) {
    if (array.length === 0) return;
    const arr = [...array];
    let startItem: any = arr[0];
    startItem.rowSpan = 1;
    arr.forEach((item, index) => {
      const nextItem = arr[index + 1] || {};
      if (item[key] === nextItem[key]) {
        startItem.rowSpan++;
      } else {
        startItem = nextItem;
        startItem.rowSpan = 1;
      }
    });
    return arr;
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Table动态合并单元格</h2>
      <Button type="primary" onClick={() => getData(true)}>
        排序
      </Button>
      <Table
        rowKey="id"
        dataSource={tableData}
        columns={columns}
        bordered
        style={{ width: 800 }}
        pagination={false}
      />
    </div>
  );
};

export default TableAutoMerge;
