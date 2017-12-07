/**
 * 分页组件
 * @prop {Number} [current=1] 当前页
 * @prop {Number} [pageSize=10] 每页的数据量
 * @prop {Number} total 数据总量
 * @prop {Number} totalPage 总页数
 * @prop {Number} pageSizeOpt 每页显示数据量数组
 * @prop {Number} pageSizeVal 当前每页数据量
 * @event {Function} onChange 当页码,每页的数据量改变时触发，参数current,currentPageSize
 * 
 * @example
 * ```
 * <ms-pagination-all :widget="{current:@currentPage,pageSize:@pageSize,total:@total,onChange:@handlePageChange}"></ms-pagination-all>
 * ```
 */

import notification from '../ms-notification';
export default notification;

avalon.component('ms-pagination-easy', {
    template: require('./ms-pagination-easy.html'),
    defaults: {
      total: 0,
      pageSize: 0,
      totalPage: 0,
      current: 1,
      pageSizeOpt: [
        {
            label: '10条/页', value: '10'
        },{
            label: '20条/页', value: '20'
        },{
            label: '50条/页', value: '50'
        }   
      ],
      pageSizeVal: ['10'],
      pageSizeChange: function(e){
          this.pageSize = e.target.value;
          this.totalPage = Math.ceil(this.total/this.pageSize);
          this.current = 1;
          this.jumpPageVal = this.current;
          this.onChange(this.current, this.pageSize);
      },
      prevPage: function(){
            if(this.current >1){
                let tmpPage = (--this.current);
                this.jumpPageVal = tmpPage;
                this.onChange(tmpPage, this.pageSize);
            }
      },
      nextPage: function(){
          if(this.current < Math.ceil(this.total/this.pageSize)){
            let tmpPage = (++this.current);
            this.jumpPageVal = tmpPage;
            this.onChange(tmpPage, this.pageSize);
          }
      },
      jumpPageVal: '',
      jumpPageEvt: function(e){
         this.jumpPageVal = e.target.value;
         if(this.jumpPageVal > this.totalPage){
            notification.info({
                title: '温馨提示',
                message: '请输入小于总页数的正整数'
            });
            return;
         }
         //正则判断只能输入正整数
         var reg = new RegExp(/^[0-9]*[1-9][0-9]*$/);
         if(!reg.test(this.jumpPageVal)){
            notification.info({
                title: '温馨提示',
                message: '请输入正整数'
            });
            return;
         }
         this.current = this.jumpPageVal;
         this.onChange(this.current, this.pageSize);
      },
      onInit(event) {
          this.totalPage = Math.ceil(this.total/this.pageSize);
          this.jumpPageVal = this.current;
      },
      onReady(event) {
      },
      onDispose(event) {
      },
      onChange: avalon.noop,
    }
});