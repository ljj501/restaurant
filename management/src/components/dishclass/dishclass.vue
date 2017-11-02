<template>
    <div>
        <datagrid api="getClassDish" :cols='props' :searchData='tranData'></datagrid>
    </div>
</template>

<script type="text/javascript">
    import datagrid from '../datagrid/datagird.vue'

    export default {
        data(){
            return {
                props:[
                    {fields:'id',showName:'ID'},
                    {fields:'classify',showName:'分类'},
                    {fields:'number',showName:'分类编码'},
                    {fields:'status',showName:'状态'}
                ],
                length:['100px', '100px', '',  '140px', '180px']
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