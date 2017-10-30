<template>
  <div>
	<el-container>
	   <el-aside width="200px">
	   		<div class="logo"><span>点餐系统后台</span></div>
			<ul>
					<li @click="crumbs"><span class="el-icon-document"><router-link to="/salesorder">&nbsp;&nbsp;销售订单</router-link></span></li>
					<li @click="crumbs"><span class="el-icon-share"><router-link to="/goodsform" >&nbsp;&nbsp;菜品分类</router-link></span></li>
					<li @click="crumbs"><span class="el-icon-menu"><router-link to="/goodslist">&nbsp;&nbsp;菜品管理</router-link></span></li>
			</ul>
	   </el-aside>
	 	<el-container>
	    	<el-header>
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item  @click="crumbs" v-for='val in crumbsData' :to='val'>{{val.name}}</el-breadcrumb-item>

				</el-breadcrumb>
	    	</el-header>
	    	<el-main>
				<router-view></router-view>
	    	</el-main>
	 	</el-container>
	</el-container>
  </div>
</template>

<script type="text/javascript">
	import './home.scss'
	export default {
    data: () => ({
    	crumbsData:[{name:'home'}]
    }),
    methods: {
		crumbs: function(e){	
				console.log(this.$route.matched);
				var crumbsArray = [];
				for(var i=0;i<this.$route.matched.length;i++){
					crumbsArray.push({name:this.$route.matched[i].name})
				}
				this.crumbsData = crumbsArray;
		}
		
	},
	mounted:function(){
			let canvas=this.$refs.cvs.$el;
			canvas.native = function(){
				console.log(canvas);
			}
			

		}
  }
</script>
