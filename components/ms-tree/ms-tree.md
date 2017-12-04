## 树组件

### 基本用法

```html
<div :controller="tree">
    <ms-tree :widget="{checkable: true,tree: @data, checkedKeys: @checkedKeys, expandedKeys: @expandedKeys, onCheck:@handleCheck}"></ms-tree>
</div>
```

```js
import * as avalon from 'avalon2';
import 'ane';

avalon.define({
    $id: "tree",
    data: [
        {key: 1, title: "aaa", children: [
                {key: 7, title: 1111, children: []},
                {key: 8, title: 2222, children: [
                        {key: 14, title: 777, children: []}
                    ]},
                {key: 9, title: 3333, children: [
                        {key: 15, title: 8888, children: []},
                        {key: 16, title: 9999, children: [
                                {key: 17, title: '司徒正美', children: []}
                            ]}
                    ]}
            ]},
        {key: 2, title: "bbb", children: [
                {key: 10, title: 4444, children: []},
                {key: 11, title: 5555, children: []},
                {key: 12, title: 6666, children: []}
            ]},
        {key: 3, title: "ccc", children: []},
        {key: 4, title: "ddd", children: []},
        {key: 5, title: "eee", children: [
                {key: 13, title: 1234, children: []}
            ]},
        {key: 6, title: "fff", children: []}
    ],
    expandedKeys: [1, 8],
    checkedKeys: [10, 11, 12],
    handleCheck(checkedKeys) {
        console.log(checkedKeys);
    }
})
```

### 组件参数

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| checkable | 是否现实复选框 | boolean | false |
| tree | 树数据 | TreeNode\[\] | \[\] |
| expandedKeys | 展开的父节点的 key 集合 | string\[\] | \[\] |
| checkedKeys | 勾选的节点的 key 集合 | string\[\] | \[\] |
| onCheck | 勾选节点的回调，只有当 checkable 为 true 时有效 | function(checkedKeys, e:{checked: bool, checkedNodes, node, event}) | noop |
| onSelect | 选择节点的回调 | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | noop |


TreeNode

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| title | 标题 | string | - |
| key | 节点标识 | string | - |
| children | 子节点 | TreeNode\[\] | - |

> 关于 TreeNode 的更多配置，请参考 [z-tree 官方文档](http://www.treejs.cn/v3/main.php)
