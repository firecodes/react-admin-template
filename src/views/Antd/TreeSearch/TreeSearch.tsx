import React, { useMemo, useState } from 'react';
import { Input, TreeDataNode } from 'antd';
import ContextBox from '@/components/ContextBox/ContextBox';
import DirectoryTree from 'antd/es/tree/DirectoryTree';

const { Search } = Input;

interface TreeDataType {
  id: number;
  name: string;
  children?: TreeDataType[];
}

// 可搜索的Tree
const TreeSearch = () => {
  // 搜索值
  const [searchValue, setSearchValue] = useState('');
  // 默认树结构
  const defaultTreeData: TreeDataType[] = [
    {
      id: 1,
      name: '上海',
      children: [
        {
          id: 11,
          name: '上海市',
          children: [
            {
              id: 111,
              name: '闵行区',
              children: [
                { id: 1111, name: '莘庄镇' },
                { id: 1112, name: '某某镇' },
              ],
            },
            { id: 112, name: '静安区' },
          ],
        },
      ],
    },
    {
      id: 2,
      name: '湖南省',
      children: [
        {
          id: 22,
          name: '衡阳市',
          children: [{ id: 222, name: '衡南县' }],
        },
      ],
    },
  ];

  // 递归树结构
  const loopData = (data: TreeDataType[]): TreeDataNode[] => {
    const res: TreeDataNode[] = [];
    data.forEach((item) => {
      const childrenResult = item.children ? loopData(item.children) : [];
      const hasMatch =
        childrenResult.length > 0 || item.name.includes(searchValue);
      if (hasMatch) {
        const strTitle = item.name as string;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span key={item.id}>
              {beforeStr}
              <span style={{ color: 'yellow' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span key={item.id}>{strTitle}</span>
          );
        res.push({
          key: item.id,
          title,
          children: childrenResult,
        });
      }
    });
    return res;
  };

  // 监听数据改变
  const treeData = useMemo(() => {
    return loopData(defaultTreeData);
  }, [defaultTreeData, searchValue]);

  return (
    <ContextBox title="Tree 实现可筛选搜索功能">
      <div style={{ width: 300 }}>
        <Search
          enterButton
          style={{ marginBottom: 8 }}
          placeholder="请输入"
          onSearch={(value) => setSearchValue(value)}
        />
        <DirectoryTree<TreeDataNode>
          style={{ padding: 16 }}
          expandAction="doubleClick"
          showIcon={false}
          defaultExpandAll
          treeData={treeData}
        />
      </div>
    </ContextBox>
  );
};

export default TreeSearch;
