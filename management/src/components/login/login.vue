<template>
	<div class="background">
		<div class="box">
			<div class="title"><p><q>有点菜</q>后台管理系统</p></div>
			<div class="form">
				<div>
					<input type="text" v-model="username" placeholder="用户名" class="username">
					<p v-show="fStatus.name">请输入用户名</p>
				</div>
				<div>
					<input type="password" v-model="password" placeholder="密码" class="password">
					<p v-show="fStatus.pass">请输入密码</p>
				</div>
				<div>
					<input type="button" value="Login" @click="loginHandler" class="button">
				</div>
					
				<p class="tip tzip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p>
			</div>
		</div>
		<loading v-show="loadingShow"></loading>
	</div>
</template>

<script type="text/javascript">
	import loading from '../loading/loading.vue'
	import http from '../../utils/httpClient.js'
	import router from '../../router/';
	import './login.scss'
	export default {
		data(){
			return {
				username: '',
				password: '',
				loadingShow: false,
				fStatus:{name:false,pass:false}
			}
		},
		methods: {
			loginHandler: function(){
			}
		},
		components: {
			loading
		},
		mounted:function(){
			var self = this;
			$('.box').animate({top:'28%'}, 1000).animate({top:'20%'},1000).animate({top:'22%'},600);
		    function login(){
		        $('.button').click(function(){
		            if($(".username").val().trim() == '' || $(".password").val().trim() == ""){
		                alert("用户名或登录密码不能为空");
		                return false;
		            }
				    var self = this;
		            http.post({
		                url: 'http://localhost:88/Welogin',
		                vm:self
		            }).then(res => {
		            	// consolesole.log(res.data)
		            	var name = $(".username").val();
		                var pass = $(".password").val();
		                for(var i=0;i<res.data[1].length;i++){
		                	if(name == res.data[1][i].name && pass == res.data[1][i].pass){
		                		 router.push("/goodslist");
		                	}else{
		                		$(`<div>
		                			<img src="../../../../web/src/img/error.jpg" alt="" />
		                		</div>`).appendTo('.background')
		                	}
		                }
		            })
		            return false;
		        });
				$('.username').blur(function(event) {
						var name = $(".username").val();
		                if(name.trim() == ''){
		                	$(".username").css({border:'1px solid red'});
		                	self.fStatus.name=true;
		                }else{
		                	$(".username").css({border:'1px solid #D0CDC7'});
		                	self.fStatus.name=false;
		                }
				});
				$('.password').blur(function(event) {
		                var pass = $(".password").val();
		                if(pass.trim() == ""){
		                	$(".password").css({border:'1px solid red'});
		                	self.fStatus.pass=true;
		                }else{
		                	$(".password").css({border:'1px solid #D0CDC7'});
		                	self.fStatus.pass=false;
		                }
				});
    		}
    		login()
		}
	}
</script>