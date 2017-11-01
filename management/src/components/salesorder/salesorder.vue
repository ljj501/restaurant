<template>
    <div>
        <datagrid api="getOrder" :cols='props' :searchData='tranData'></datagrid>
    </div>
</template>

<script type="text/javascript">
    import datagrid from '../datagrid/datagird.vue'

    export default {
        data(){
            return {
                props:[
                    {fields:'id',showName:'ID'},
                    {fields:'ordercode',showName:'订单编码'},
                    {fields:'rank',showName:'桌号'},
                    {fields:'orderprice',showName:'订单总额'},
                    {fields:'ordertime',showName:'下单时间'},
                    {fields:'status',showName:'状态'}
                ],
                length:['80px', '', '120px', '140px', '180px', '100px', '80px']
            }
        },
        props:['search'],
        computed:{
            tranData:function(){
                return this.search;
            }
        },
        watch:{
            tranData:function(val, oldval){
                console.log(val, oldval);
            }
        },
        components: {
            datagrid
        }
    }
</script>