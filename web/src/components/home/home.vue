<template>
	<div class="box">
		<div class="header">
			<div class="right">
				<h3>欢迎光临真实惠</h3>
				<p>您的第二个家庭厨房,不要让今天的疲劳留到明天</p>
				<p class="fl">您当前的桌号为<span class="rank">01</span></p>
			</div>
			<div class="logo">
			<img src="src/img/15e386ec1875697.jpeg" height="200" width="200" alt="" />
			</div>
		</div>
		<div class="bar">
			<div><router-link to="detail" class='span'>商品详情</router-link></div>
			<div><router-link to="order" class='span'>我的订单</router-link></div>	
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	import './home.scss'
	import router from '../../router/index.js'
	import loading from '../loading/loading.vue'
	export default {
		data:function(){
			return{
				dataset:{}
			}
		},
		methods:{
			
		},
		mounted:function(){
			router.push('/detail');

		},
		components: {
            // loading
         }
	}
</script>
<style lang="scss">
</style>