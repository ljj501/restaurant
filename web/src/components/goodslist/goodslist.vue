<template>
	<div>
		<h1>goods list</h1>
		<datagrid api="getgoods" cols="name,age,hobby"></datagrid>
	</div>
</template>

<script type="text/javascript">
	import datagrid from '../datagrid/datagird.vue'
	//generate three buttons
	//$prent
	export default {
		components: {
			datagrid
		}
	}
</script>