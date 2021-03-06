## 分页组件(简易版)

### 总条数+当前页数+上下翻页+每页数据量选择

```html
<div :controller="doc-pagination-basic">
    <ms-pagination-easy :widget="{current:@current,pageSize:@pageSize,total:@total,onChange:@handlePageChange}"></ms-pagination-easy>
</div>
```

```js
import * as avalon from 'avalon2';
import 'ane';

const vm = avalon.define({
    $id: 'doc-pagination-basic',
    current: 1,
    pageSize: 10,
    total: 100,
    handlePageChange(currentPage,currenPageSize) {
        console.log('当前第' + currentPage + '页' + currenPageSize);
    }
});
```

### 组件参数

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| current | 当前页，从 1 开始 | number | 1 |
| pageSize | 每页条数 | number | 10 |
| total | 数据总数 | total | 0 |
| onChange | 翻页时的回调 | function(currentPage:number) | noop |

页码跳转的方法绑定在组件本身，也是通过修改pageSize和current的值，然后调用翻页时候的跳转