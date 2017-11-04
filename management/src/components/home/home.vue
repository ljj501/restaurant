<template>
  <div>
	<el-container>
	   <el-aside width="200px">
	   		<div class="logo"><span>点餐系统后台</span></div>
			<ul>
				<li @click="crumbs" class="lj"><span class="el-icon-document" @click="cancelAdd"><router-link to="/salesorder">&nbsp;&nbsp;销售订单</router-link></span></li>
				<li @click="crumbs" class="lj"><span class="el-icon-share" @click="cancelAdd"><router-link to="/dishclass" >&nbsp;&nbsp;菜品分类</router-link></span></li>
				<li @click="crumbs" class="lj"><span class="el-icon-menu" @click="resetAdd"><router-link to="/goodslist">&nbsp;&nbsp;菜品管理</router-link></span></li>
			</ul>
	   </el-aside>
	 	<el-container>
	    	<el-header>
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item  v-for='(val, key) in crumbsData' :to='val' >{{val.name}}</el-breadcrumb-item>
				</el-breadcrumb>
	    	</el-header>
	    	<el-main>
				<div class="toolbar">
					  <el-button type="primary" @click='addDish' v-if="addBtn">添加</el-button>
					  <el-button type="success" @click='backOrder' v-if="this.$store.state.backBtn">返回销售订单</el-button>
					  <!-- <el-button type="success">修改</el-button>
					  <el-button type="info">下架</el-button> -->
					  <div class='z-search' v-if="this.$store.state.show">
					  	<el-input placeholder="请输入内容" v-model="input" class="input-with-select">
					      <el-select v-model="select" slot="prepend" placeholder="请选择">
					        <el-option :label="val.showName" :value="val.fields" v-for="val in findClass"></el-option>
					      </el-select>
					      <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
					  	</el-input>
					  </div>
				</div>
				<router-view :search='searchData'></router-view>
	    	</el-main>
	 	</el-container>
	</el-container>
  </div>
</template>

<script type="text/javascript">
	import './home.scss'
	import router from '../../router/'
	import http from '../../utils/httpClient.js'
	import loading from '../loading/loading.vue'

	export default {
		data() {
		    return {
		      input: '',
		      select: '',
		      findClass:[
				{fields:'name',showName:'名字'},
				{fields:'classify',showName:'品类'},
				{fields:'number',showName:'编号'},
				{fields:'price',showName:'价格'},
				{fields:'time',showName:'烹饪时长'},
				{fields:'creatDate',showName:'创建时间'},
				{fields:'status',showName:'状态'}
			  ],
			  searchData:[{
			  	findClass:'',
			  	findContent:'',
			  	findData:[],
			  	totalNumber:''
			  }],
			  crumbsData:[{name:'主页'}]
		    }
		},
		computed:{
			addBtn:function(){
				var a = (this.$store.state.show && this.$store.state.addBtn);
				return a;
			}
		},
		methods: {
			addDish:function(){
				router.push('/goodsform');
				this.$store.state.show = false;
			},
			cancelAdd: function(){
				this.$store.state.addBtn = false;
			},
			resetAdd: function(){
				this.$store.state.addBtn = true;
			},
			backOrder: function(){
				this.$store.state.backBtn = false;
				router.push('/salesorder');
			},
			crumbs: function(e){	
					var crumbsArray = [];
					for(var i=0;i<this.$route.matched.length;i++){
						crumbsArray.push({name:this.$route.matched[i].name})
					}
					this.crumbsData = crumbsArray;
					$('.lj').addClass('now').siblings().removeClass('now')
					this.$store.state.backBtn = false;
					
			},
			search:function(){
				var self = this;
				if(self.select == ''){
					self.$message({
					      message: '请选择品类',
					      type: 'error',
					      duration:1000,
					      showClose:true
					    });
					return false;
				}else if(self.input == ''){
					self.$message({
					      message: '搜索内容不能为空',
					      type: 'error',
					      duration:1000,
					      showClose:true
					    });
					return false;
				} else {
					var self = this;
					var opts = {
					    url: 'searchDish',
					    vm:this,
					    loading:'loadingShow',
					    params:{
					    	findClass:self.select,
					    	findContent:self.input
					    }
					}
					http.post(opts).then(res => {
						self.searchData[0].findClass = self.select;
						self.searchData[0].findContent = self.input;
						self.searchData[0].findData = res.data[1];
						self.searchData[0].totalNumber =res.data[0][0]["count(id)"];
					})
				}
			}
		},
		mounted:function(){
			
		    $('.lj').eq(2).addClass('now')

			$('.lj').click(function(){
				$(this).addClass('now').siblings().removeClass('now');
			})

		}
	}
</script>
