import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginComponent from '../components/login/login.vue'
import HomeComponent from '../components/home/home.vue'
import OrderComponent from '../components/order/order.vue'
import GoodsListComponent from '../components/goodslist/goodslist.vue'
import GoodsFormComponent from '../components/goodsform/goodsform.vue'
import DetailComponent from '../components/detail/detail.vue'
Vue.use(VueRouter)

var router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeComponent,
			children: [{
				path:'order',
				name:'order',
				component:OrderComponent
			},{
				path:'detail',
				name:'detail',
				component:DetailComponent
			}]
		},
		{
			path: '/login',
			name: 'login',
			component: LoginComponent
		}
	]
})

export default router