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
				<i class="car" @click="showlist">
					<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-gouwuche"></use>
					</svg>
				</i>
				<i class="all">0</i>
			</div>
			<div class="yes" @click="confirm">
				去结算
			</div>
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
			confirm:function(){
				console.log(this.dataset)
				var self = this;
	            http.post({
	            	url:'/orderlist',
	            	params:this.dataset,
	            	vm:self
	            }).then(res => {
	            	console.log(res.data)
	            })
			},
			showlist:function(){
				
				if($('.box').find('table').length == 0){
					var $cover = $('<div/>').addClass('cover')
					$('.box').append($cover) 

					var orderprice = $('.all').text();

					var $nums = $('.num')
					var $thead = $('<thead/>').css({'background':'#eceff1'})
					var $tr = $('<tr/>').appendTo($thead);
					var $choose = $('<td/>').html('已选商品').appendTo($tr).css({'color':'#3190e8'})
					var $space = $('<td/>').appendTo($tr)
					var $clear = $('<td>').html('清空').appendTo($tr)
					var $table = $('<table/>').append($thead)
					var $tbody = $('<tbody/>')

					var temp = [];
					for(var num of $nums){
						if(num.innerText > 0){
							var $tr = $('<tr/>');
							var childrens = num.parentNode.parentNode.children;

							var name = childrens[0].innerText;
							var price = childrens[3].innerText;
							var num = childrens[4].children[1].innerText;
							
							var obj = {name:name,num:num,price:price}
							temp.push(obj)
							
							// console.log(arr)
							var $name = $('<td/>').html(name)
							var $prices = $('<td/>').html('¥'+price*num).addClass('prices')
							var $num = $('<td/>').html(num)
							$tr.append($name,$prices,$num)
						}
						$tbody.append($tr)
					}
					var arr = {rank:1,orderprice:orderprice,data:temp}
					this.dataset = arr;

					$table.append($tbody)
					$('.box').append($table)
				}else if($('.box').find('table').length > 0 ){
					$('.box').find('.cover').remove()
					$('.box').find('table').remove()
				}
			}
		},
		mounted:function(){
			router.push('/detail');
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