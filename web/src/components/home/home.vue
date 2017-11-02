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

		
		<router-view></router-view>
	
	</div>
</template>

<script type="text/javascript">
	import './home.scss'
	import '../icon-font/iconfont.js'
	import router from  '../../router/'
	import http from '../../utils/httpClient.js'
    import loading from '../loading/loading.vue'
	//$children
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
			var footer = document.querySelector('.footer');
            footer.style.display = 'block';  
		},
		components: {
            loading
         }
	}
</script>
<style lang="scss">
.icon {
   width: 2.3em; height: 2.3em;
   vertical-align: -0.15em;
   fill: #fff;
   overflow: hidden;
   color:#fff;
}
</style>