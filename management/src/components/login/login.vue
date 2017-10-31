<template>
	<div>
		<input type="text" v-model="username">
		<input type="password" v-model="password">
		<input type="button" value="Login" @click="loginHandler">
		<loading v-show="loadingShow"></loading>
	</div>
</template>

<script type="text/javascript">
	import loading from '../loading/loading.vue'
	import http from '../../utils/httpClient.js'
	import router from '../../router/'

	export default {
		data(){
			return {
				username: '',
				password: '',
				loadingShow: false
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
		}
	}
</script>