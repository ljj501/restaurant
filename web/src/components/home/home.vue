<template>
	<div>
		<div class="toolbar">
			  <el-button type="primary" @click='addDish'>添加</el-button>
			  <el-button type="success">修改</el-button>
			  <el-button type="info">下架</el-button>
			  <div class='z-search'>
			  	<el-input placeholder="请输入内容" v-model="input" class="input-with-select">
			      <el-select v-model="select" slot="prepend" placeholder="请选择">
			        <el-option :label="val.showName" :value="val.fields" v-for="val in findClass"></el-option>
			      </el-select>
			      <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
			  	</el-input>
			  </div>
		</div>
		<div>
			<router-view :search='searchData'></router-view>
		</div>
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
			  }]
		    }
		},
		methods: {
			addDish:function(){
				router.push('/goodsform');
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
		}
	}
</script>