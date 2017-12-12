## 选择组件

### 基本用法
###### mode:multiple =>设置多选 
###### disabled:true=>禁用
###### showSearch:true =>带搜索框
``` html
<div :controller="time_type" class='timeTypeBox'>
    <ms-select :widget="{col:'timeType',options:@time_type_options, value:@time_type_val,onChange:@get_time_type_val}"></ms-select>
    <div class='dateTimeBox' :if= '@timeTypeToggle'>
       <div class='startTimeBox' :controller='start_time'>
            <ms-datepicker :widget="{placeholder:'请选择开始时间',showTime:false,onChange:@get_start_time_val,value:@start_time_val}"></ms-datepicker>
       </div>
        <div class='endTimeBox' :controller='end_time'>
            <ms-datepicker :widget="{placeholder:'请选择结束时间',showTime:false,onChange:@get_end_time_val,value:@end_time_val}"></ms-datepicker>
       </div>
    </div>
    <a :click='searchList'>查询</a>
</div>
```

``` js
import * as avalon from 'avalon2';
import { createForm } from 'ane';

const timeType_vm = avalon.define({
    $id: 'time_type',
    time_type_options: [{label:'过去一周',value: 1}, {label:'过去一月',value: 2}, {label: '一段时间',value: 3}],
    time_type_val: [1],
    timeTypeToggle: false,
    time_type_Flag: 1,
    get_time_type_val: function(e){
        let _this = this;
        _this.time_type_Flag = e.target.value;
        if(e.target.value == 3){
            //设置开始时间跟结束时间[间隔为一周]
            startTime_vm.start_time_val = getTime(7);
            endTime_vm.end_time_val = getTime(0);
            this.timeTypeToggle = true;
        }else{
            this.timeTypeToggle = false;
        }
    },
    searchList: function(){
        if(this.time_type_Flag == 3){
            //开始时间不能大于结束时间,结束时间不能晚于当前时间
            if(getTimeByDateStr(startTime_vm.start_time_val)> getTimeByDateStr(endTime_vm.end_time_val)){
                alert("开始时间不能大于结束时间");
            };
            var start_time = startTime_vm.start_time_val;
            var end_time = endTime_vm.end_time_val;
            console.log(start_time +'========'+end_time);
        }
    }
});
const startTime_vm = avalon.define({
    $id: 'start_time',
    start_time_val: getTime(7),
    get_start_time_val: function(e){
        let _this = this;
        _this.start_time_val = e.target.value;
    }
});
const endTime_vm = avalon.define({
    $id: 'end_time',
    end_time_val: getTime(0),
    get_end_time_val: function(e){
       let _this = this;
        _this.end_time_val = e.target.value;
    }
});
function getTimeByDateStr(stringDate){
    var s1 = stringDate.split("-");
    var temp = new Date(s1[0], s1[1]-1, s1[2]);
    return new Date(s1[0], s1[1] - 1, s1[2]).getTime();
}
//将date()类型转为yyyy-mm-dd
function getTime(days){
        let tmpDate = new Date();
        var obj = {
             "yyyy": tmpDate.getFullYear(),
             "MM": tmpDate.getMonth()+1,
             'dd': tmpDate.getDate()
        }
        var formatDate = obj.yyyy+ '-'+ obj.MM+ '-'+ obj.dd;
        if(days == 0){
            return formatDate;
        }else{
            var dt = new Date(formatDate.replace(/-/, "/"));
            var endTime = dt.getTime() - 1000 * 60 * 60 * 24 * days;
            var calDate = new Date(endTime);
            var obj = {
                "yyyy": calDate.getFullYear(),
                "MM": calDate.getMonth()+1,
                'dd': calDate.getDate()
            }
            return  obj.yyyy+ '-'+ obj.MM+ '-'+ obj.dd;
        }
}

```

### 远程加载数据

``` html
<div :controller="doc-select-remote">
    <ms-select :widget="{mode:'multiple',showSearch:true,remote:true,remoteMethod:@fetchOptions}"></ms-select>
</div>
```

``` js
import * as avalon from 'avalon2';
import { createForm } from 'ane';
import * as $ from 'jquery';

avalon.define({
    $id: 'doc-select-remote',
    fetchOptions(query) {
        return $.getJSON('https://randomuser.me/api/?results=5').then(json => {
            return json.results.map(user => ({
                label: user.name.first + user.name.last,
                value: user.login.username
            }));
        });
    }
});
```

### 组件参数

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| value | 默认值 | string\[\] | \[\] |
| mode | 模式 | 'combobox' \| 'multiple' \| 'tags' | '' |
| options | 下拉选项，可以替代ms-select-option | {label:string,value:string,disabled:boolean}\[\] | \[\] |
| showSearch | 是否显示搜索框 | boolean | false |
| remote | 是否为远程搜索 | boolean | false |
| remoteMethod | remoteMethod 当remote为true时调用，包含远程搜索要执行的请求，要求返回一个Promise&#x3C;options&#x3E; | function(query) | noop |
| direction | 下拉框弹出方向，目前只有 `up`/`down` 两个选项 | string | `down` |
| onChange | 组件值改变回调 | function(e:{target:{value:string\[\]},type:string}) | noop |

> 继承 [ms-control 组件](#!/form-control) 的所有参数