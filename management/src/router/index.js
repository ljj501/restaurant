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
			name: '主页',
			alias: 'home',
			component: HomeComponent,
			children: [{
				path: 'goodslist',
				name: '菜品管理',
				alias:'菜品管理',
				component: GoodsListComponent
			},{
				path: 'goodsform',
				name: '添加菜品',
				alias: '添加菜品',
				component: GoodsFormComponent
			},{
				path: 'salesorder',
				name: '销售订单',
				alias: '销售订单',
				component: SalesOrderComponent
			},{
				path: 'orderdetalis',
				name: '订单详情',
				alias: '订单详情',
				component: OrderdetalisComponent
			},{
				path: 'dishclass',
				name: '菜品分类',
				alias: '菜品分类',
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