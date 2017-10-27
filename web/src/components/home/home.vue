<template>
	<div>
		<div class="toolbar">
			<!-- Comonent1 -->
			<input type="button" value="添加商品">
			<!-- Component2 -->
			<input type="button" value="添加商品">
			<input type="button" value="添加商品">
			<!-- Component3 -->
		</div>
		<div>
			<router-view></router-view>
		</div>
		
	</div>
</template>

<script type="text/javascript">
	//$children
	export default {
		methods: {
			generateToolBar: function(obj){
				//动态生成按钮
			}
		}
	}
</script>