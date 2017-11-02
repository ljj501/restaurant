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
          crumbsData:[{name:'home'}],
          show:true
        }
    },
    methods: {
        addDish:function(){
            console.log(this.$store);
            router.push('/goodsform');
            this.show = false;

        },
        returnDish:function(){
            this.show = true;
        },
        crumbs: function(e){    
                console.log(this.$route.matched);
                var crumbsArray = [];
                for(var i=0;i<this.$route.matched.length;i++){
                    crumbsArray.push({name:this.$route.matched[i].name})
                }
                this.crumbsData = crumbsArray;
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