<template>
	<div class="background">
		<div class="box">
			<div class="title"><p>点餐后台管理系统</p></div>
			<div class="form">
				<div>
					<input type="text" v-model="username" placeholder="用户名" class="username">
					<p v-show="fStatus.user">请输入用户名</p>
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
				fStatus:{user:false,pass:false}
			}
		},
		methods: {
			loginHandler: function(){
				http.post('/login', {username: this.username, password: this.password}).then(res => {
					router.push({name: 'home'});
				})
			}
		},
		components: {
			loading
		},
		mounted:function(){
			$('.box').animate({top:'28%'}, 1000).animate({top:'20%'},1000);
		    function login(){
		        $('.button').click(function(){
		            if($(".username").val().trim() == '' || $(".password").val().trim() == ""){
		                alert("员工编码或登录密码不能为空");
		                return false;
		            }
		            $.post('http://localhost:88/Welogin',{username:$(".username").val(),password:$(".password").val()},function(req){
		                if(req.status){
		                    document.cookie = 'token='+req.token+';path=/';
		                    window.location.href = 'index.html';
		                } else {
		                    alert("登录不成功，请重新输入！");
		                }
		            });
		            return false;
		        });
    		}
    		login()
    			//判断用户是否登录
		    function issign(){
		            var cookies = document.cookie.split('; ');
		            var token = '';
		            cookies.forEach(function(item){
		              var temp = item.split('=');
		              if(temp[0] == 'token'){
		                token = temp[1];
		              }
		            });
		            $.ajax({
		              type: 'post',
		              url: `${this.baseUrl}/index`,
		              headers: {'Authorization': token},
		              success: function(response){
		                if(response.status ==false || response == undefined ){
		                  location.href = '../login.html'
		                }
		              }
		            })
		        }
		}
	}
</script>