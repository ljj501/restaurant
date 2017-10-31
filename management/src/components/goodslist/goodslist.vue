<template>
	<div>
		<datagrid api="getDish" :cols='props' :searchData='tranData'></datagrid>
	</div>
</template>

<script type="text/javascript">
	import datagrid from '../datagrid/datagird.vue'

	export default {
		data(){
			return {
				props:[
					{fields:'id',showName:'序号'},
					{fields:'name',showName:'名字'},
					{fields:'classify',showName:'品类'},
					{fields:'number',showName:'编号'},
					{fields:'picture',showName:'图片'},
					{fields:'price',showName:'价格'},
					{fields:'time',showName:'烹饪时长'},
					{fields:'creatDate',showName:'创建时间'},
					{fields:'status',showName:'状态'}
				]
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