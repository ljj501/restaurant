<template>
	<div>
	  <el-table :data="dataset" stripe border highlight-current-row style="width: 100%" size='small' align="center">
	    <el-table-column v-for="(val,key) in colsArray" :prop="val.fields" :label="val.showName" :width='length[key]'>
	    	<template scope="scope">

	    		<div v-if="tableName =='dishname'? true : false">
    	          <el-input v-show="scope.row.edit" size="small" v-model="scope.row[val.fields]" v-if="filter.indexOf(val.fields)>-1? true : false"></el-input>
    	          <span v-show="scope.row.edit" v-else-if="val.fields=='picture'?false : true" 
    	          :class="scope.row[val.fields]=='正在卖'?'z-putaway':(scope.row[val.fields]=='已下架'?'z-outaway':'')">{{ scope.row[val.fields] }}</span>
    	          <img v-show="scope.row.edit"  v-else :src="scope.row[val.fields]" style="width:44px;height:44px;"/>
    	          <span v-show="!scope.row.edit" :class="scope.row[val.fields]=='正在卖'?'z-putaway':(scope.row[val.fields]=='已下架'?'z-outaway':'')" v-if="val.fields=='picture'?false : true">{{ scope.row[val.fields] }}</span>
    	          <img v-show="!scope.row.edit"  v-else :src="scope.row[val.fields]" style="width:44px;height:44px;"/>
    	        </div>

	    		<div v-else-if="tableName =='saleorder'? true : false">
    	          <span v-show="!scope.row.edit" :class="scope.row[val.fields]=='未付款'?'z-nopay':(scope.row[val.fields]=='已付款'?'z-pay':'')">{{ scope.row[val.fields] }}</span>
    	        </div>

    	        <div v-else-if="tableName =='orderdetalis'? true : false">
    	          <span v-show="!scope.row.edit" :class="scope.row[val.fields]=='未做'?'z-nopay':(scope.row[val.fields]=='已做'?'z-pay':(scope.row[val.fields]=='取消'?'z-cancel':''))">{{ scope.row[val.fields] }}</span>
    	        </div>

    	        <div v-else="tableName =='dishclass'? true : false">
    	          <span v-show="!scope.row.edit" :class="scope.row[val.fields]=='正在卖'?'z-putaway':(scope.row[val.fields]=='已下架'?'z-outaway':'')">{{ scope.row[val.fields] }}</span>
    	        </div>

	    	</template>
	    </el-table-column>
	    <el-table-column label="操作">
	    	<template scope="scope">

	    		<div v-if="tableName =='dishname'? true : false">
	    	      <el-button :type="scope.row.edit?'success':'primary'" @click='handleEdit(scope.$index, scope.row,scope)' size="mini">{{scope.row.edit?'完成':'编辑'}}</el-button>
	    	      <el-button
	    	        size="mini"
	    	        :type="scope.row.status=='正在卖'?'danger':'warning'"
	    	        @click="handleDelete(scope.$index, scope.row)">{{scope.row.status=='正在卖'?'下架':'恢复'}}</el-button>
	    	    </div>

	    	    <div v-else-if="tableName =='saleorder'? true : false">
	    	    	<el-button type="success" size="mini" class='z-detalis' @click="orderDetalis(scope.row.ordercode)">查看详情</el-button>
	    	    </div>

	    	    <div v-else-if="tableName =='orderdetalis'? true : false">
	    	    	<el-button type="success" size="mini" class="z-detalis" @click="confirm(scope.row)" :disabled="(scope.row.status == '未做' || scope.row.status == '取消') ? scope.row.disable = false : scope.row.disable = true">下厨</el-button>
	    	    </div>

	    	    <div v-else="tableName =='dishclass'? true : false">
	    	    	<el-button
	    	        size="mini"
	    	        :class="scope.row.status=='正在卖'?'z-danger':'z-warning'"
	    	        :type="scope.row.status=='正在卖'?'danger':'warning'"
	    	        @click="handleDeleteClass(scope.$index, scope.row)">{{scope.row.status=='正在卖'?'下架':'恢复'}}</el-button>
	    	    </div>

	    	</template>
	    </el-table-column>
	  </el-table>
	  <turnpage :total='totalNumber' :params='params' :pageSize="pageSize"></turnpage>
	  <loading v-show="loadingShow"></loading>
	</div>
</template>

<script type="text/javascript">
	import http from '../../utils/httpClient.js'
	import loading from '../loading/loading.vue'
	import turnpage from './turnpage.vue'
	import './datagird.scss'
	import router from '../../router/'

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
				filter:['name', 'price', 'time']
			}
		},
		props: ['api', 'cols', 'searchData'],
		computed:{
			resData:function(){
				return this.searchData;
			},
			length:function(){
				return this.$parent.length;
			},
			tableName:function(){
				var apiAll = {
					'getDish':'dishname',
					'getOrder':'saleorder',
					'getOrderDetalis':'orderdetalis',
					'getClassDish':'dishclass'
				}
				return apiAll[this.api];
			},
			pageSize:function(){
				var apiAll = {
					'getDish':6,
					'getOrder':10,
					'getOrderDetalis':10,
					'getClassDish':10
				}
				return apiAll[this.api];
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
			var opts = {
					url: this.api,
					vm:this,
					loading:'loadingShow'
				}
			if(this.api == 'getOrderDetalis'){
				opts.params = {ordercode:this.$store.state.orderNo}
			}
			this.showData(opts);
		},
		sockets: {  
	        connect: function(){  
	          console.log('socket connected')  
	        },
	        receiveOrder: function(data){
	        	http.post({
	        		url:'getMaxOrder',
	        		params:{}
	        	}).then(res=>{
	        		if(res.data){
	        			var newOrderCode = 'd'+("00000"+(res.data[0].ordercode.slice(1)*1+1)).substr(-6,6);
	        			var newOrder = {
	        				ordercode:newOrderCode,
	        				rank:data.rank,
	        				orderprice:data.orderprice,
	        				ordertime:(new Date()),
	        				status:'未付款'
	        			}
	        			for(var i=0; i<data.data.length;i++){
	        				data.data[i].ordercode = newOrderCode;
	        				data.data[i].rank = data.rank;
	        				data.data[i].status = '未做';
	        			}
	        			var newOrderDetalis = {
	        				orderDetalis:JSON.stringify(data.data)
	        			}
	        			http.post({
	        				url:'setNewOrder',
	        				params:newOrder
	        			}).then(res=>{
	        			});
	        			http.post({
	        				url:'setNewOrderDetalis',
	        				params:newOrderDetalis
	        			}).then(res=>{
	        			});
	        		}
	        	})
	        } 
		},
		methods:{
			showData:function(opts){
				var self = this;
				http.post(opts).then(res => {
					if(res.data[0]){
						self.totalNumber = res.data[0][0]["count(id)"];
						res.data[1].forEach(function(item){
						if(item.creatDate){
							item.creatDate = item.creatDate.slice(0,10);
						}else if(item.ordertime){
							console.log(item.ordertime);
							var newOrderTime = item.ordertime.split('T');
							newOrderTime[1] =newOrderTime[1].slice(0,-5);
							item.ordertime = newOrderTime.join(' ');
						}
							item.edit = false;
							item.confirm = false;
							item.disable = false;
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
			},
			handleDeleteClass(index, row) {
			    row.status == '正在卖'? row.status = '已下架':row.status = '正在卖';
		        if(row.edit == false){
		    	    var opts = {
		    	    	url:'changeClass',
		    	    	vm: this,
		    	    	loading:'loadingShow',
		    	    	params:row
		    	    }
		    	    this.showData(opts);
		        }
			},
			orderDetalis(ordercode) {
				this.$store.state.orderNo = ordercode;
				router.push('/orderdetalis');
			},
			confirm(row){
				row.confirm = true;
				row.disable = true;
				row.status = '已做';
	    	    var opts = {
	    	    	url:'changeOrder',
	    	    	vm: this,
	    	    	loading:'loadingShow',
	    	    	params:{id:row.id}
	    	    }
	    	    this.showData(opts);
			}

		},
		components: {
			loading,
			turnpage
		}
	}
</script>