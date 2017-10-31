
<template>
	<div>
	  <el-table :data="dataset" stripe border highlight-current-row style="width: 100%" size='small'>
	    <el-table-column v-for="(val,key) in colsArray" :prop="val.fields" :label="val.showName" :width='length[key]'>
	    	<template scope="scope">
    	          <el-input v-show="scope.row.edit" size="small" v-model="scope.row[val.fields]" v-if="filter.indexOf(val.fields)>-1? true : false"></el-input>
    	          <span v-show="scope.row.edit" v-else-if="val.fields=='picture'?false : true" 
    	          :class="scope.row[val.fields]=='正在卖'?'z-putaway':(scope.row[val.fields]=='已下架'?'z-outaway':'')">{{ scope.row[val.fields] }}</span>
    	          <img v-show="scope.row.edit"  v-else :src="scope.row[val.fields]" style="width:30px;height:30px;"/>
    	          <span v-show="!scope.row.edit" :class="scope.row[val.fields]=='正在卖'?'z-putaway':(scope.row[val.fields]=='已下架'?'z-outaway':'')" v-if="val.fields=='picture'?false : true">{{ scope.row[val.fields] }}</span>
    	          <img v-show="!scope.row.edit"  v-else :src="scope.row[val.fields]" style="width:30px;height:30px;"/>
	    	</template>
	    </el-table-column>
	    <el-table-column label="操作">
	    	<template scope="scope">
	    	      <el-button :type="scope.row.edit?'success':'primary'" @click='handleEdit(scope.$index, scope.row,scope)' size="mini">{{scope.row.edit?'完成':'编辑'}}</el-button>
	    	      <el-button
	    	        size="mini"
	    	        :type="scope.row.status=='正在卖'?'danger':'warning'"
	    	        @click="handleDelete(scope.$index, scope.row)">{{scope.row.status=='正在卖'?'下架':'恢复'}}</el-button>
	    	</template>
	    </el-table-column>
	  </el-table>

	  <turnpage :total='totalNumber' :params='params'></turnpage>
	  <loading v-show="loadingShow"></loading>
	</div>
</template>

<script type="text/javascript">
	import http from '../../utils/httpClient.js'
	import loading from '../loading/loading.vue'
	import turnpage from './turnpage.vue'
	import './datagird.scss'
	export default {
		data: function(){
			return {
				dataset: [],
				loadingShow: false,
				colsArray:this.cols,
				params:{
					pageNumber:1
				},
				totalNumber:0,
				findClass:'',
				findContent:'',
				edit:false,
				filter:['name', 'price', 'time'],
				length:['60px', '', '80px', '100px', '100px', '100px', '100px', '120px', '100px','90px']
			}
		},
		props: ['api', 'cols', 'searchData'],
		computed:{
			resData:function(){
				return this.searchData;
			} 
		},
		watch:{
			'params.pageNumber': function(val, oldVal){
				var turnPage = {};
				var self = this;
				if(self.findClass == '' || self.findContent == '' ){
					turnPage.pageNumber = self.params.pageNumber;
				} else {
					turnPage.pageNumber = self.params.pageNumber;
					turnPage.findClass = self.findClass;
					turnPage.findContent = self.findContent;
				}
				var opts = {
					url:'getTurnPage',
					vm: self,
					loading:'loadingShow',
					params:turnPage
				}
				self.showData(opts);
			},
			resData:{
				handler: function (val, oldVal) {
					this.dataset = val[0].findData;
					this.totalNumber = val[0].totalNumber;
					this.findClass = val[0].findClass;
					this.findContent = val[0].findContent;
				 },
				deep: true
			} 
		},
		mounted: function(){
			this.dataset = this.searchData;
			var opts = {
					url: this.api,
					vm:this,
					loading:'loadingShow'
				}
			this.showData(opts);
		},
		methods:{
			showData:function(opts){
				var self = this;
				http.post(opts).then(res => {
					if(res.data[0]){
						self.totalNumber = res.data[0][0]["count(id)"];
						res.data[1].forEach(function(item){
							item.creatDate = item.creatDate.slice(0,10);
							item.edit = false;
						});
						self.dataset = res.data[1];
					}
				})
			},
			handleEdit(index, row, scope) {
			    row.edit=!row.edit;
			    if(row.edit == false){
				    var opts = {
				    	url:'getChange',
				    	vm: this,
				    	loading:'loadingShow',
				    	params:row
				    }
				    this.showData(opts);
			    }
			},
			handleDelete(index, row) {
			    row.status == '正在卖'? row.status = '已下架':row.status = '正在卖';
		        if(row.edit == false){
		    	    var opts = {
		    	    	url:'getChange',
		    	    	vm: this,
		    	    	loading:'loadingShow',
		    	    	params:row
		    	    }
		    	    this.showData(opts);
		        }
			}
		},
		components: {
			loading,
			turnpage
		}
	}
</script>