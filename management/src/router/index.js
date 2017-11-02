import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginComponent from '../components/login/login.vue'
import HomeComponent from '../components/home/home.vue'
import GoodsListComponent from '../components/goodslist/goodslist.vue'
import GoodsFormComponent from '../components/goodsform/goodsform.vue'
import SalesOrderComponent from '../components/salesorder/salesorder.vue'
import OrderdetalisComponent from '../components/orderdetalis/orderdetalis.vue'
import DishclassComponent from '../components/dishclass/dishclass.vue'

Vue.use(VueRouter)

var router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeComponent,
			children: [{
				path: 'goodslist',
				name: 'goodslist',
				component: GoodsListComponent
			},{
				path: 'goodsform',
				name: 'goodsform',
				component: GoodsFormComponent
			},{
				path: 'salesorder',
				name: 'salesorder',
				component: SalesOrderComponent
			},{
				path: 'orderdetalis',
				name: 'orderdetalis',
				component: OrderdetalisComponent
			},{
				path: 'dishclass',
				name: 'dishclass',
				component: DishclassComponent
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