<template>
    <div>
        <datagrid api="getOrderDetalis" :cols='props' :searchData='tranData'></datagrid>
    </div>
</template>

<script type="text/javascript">
    import datagrid from '../datagrid/datagird.vue'

    export default {
        data(){
            return {
                props:[
                    {fields:'ordercode',showName:'订单编码'},
                    {fields:'rank',showName:'桌号'},
                    {fields:'name',showName:'菜品名称'},
                    {fields:'num',showName:'菜品数量'},
                    {fields:'price',showName:'菜品单价'},
                    {fields:'status',showName:'状态'}
                ],
                length:['100px', '100px', '',  '140px', '180px', '100px', '80px']
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