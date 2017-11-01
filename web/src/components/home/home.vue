<template>
	<div class="box">
		<div class="header">
			<div class="right">
				<h3>欢迎光临真实惠</h3>
				<p class="fl">您当前的桌号为</p><span></span>
			</div>
			<div class="logo">
			<img src="src/img/15e386ec1875697.jpeg" height="200" width="200" alt="" />
			</div>
		</div>
		<div class="bar">
			<div><router-link to="detail" class='span'>商品详情</router-link></div>
			<div><router-link to="order" class='span'>我的订单</router-link></div>
		</div>

		<div class="footer">
			<div class="left">
				<i class="car"></i>
				<i class="all">0.00</i>
			</div>
			<div class="right">
				确认下单
			</div>
		</div>
		<router-view></router-view>
	
	</div>
</template>

<script type="text/javascript">
	import './home.scss'
	//$children
	export default {
		methods: {
			
		}
	}
</script>
<style lang="scss">
</style>