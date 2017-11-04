<template>
   <div class="t-content">
        <div class="orderlist">
            <div class="carnone" v-show="initStatus">
                <h3>购物车为空T.T</h3>
                <router-link class="linklist" to="/">先去逛逛吧~</router-link>
            </div>
            <div class="carshow">
                <div class="edit"><span>请您稍侯,本店大厨正在为您下厨</span></div>
                <div class="carlist" v-for="(obj,index) in orderData" v-if="obj.status=='已做'||obj.status=='未做'">
                    <div class="t-left fl">
                        <span class="name">{{obj.name}}</span>
                        <p>￥<span class="price">{{obj.price}}</span></p>
                    </div>
                    <div class="right fl">
                        <span class="num">{{'x '+obj.num}}</span>
                        <span v-if="obj.status=='已做'">
                            <span class="status" :style="{background:cookStatus[2]}">{{cookStatus[0]}}</span>
                            <span class="deleted" v-show="btnList" @click="alert" style="background:#188FE6;">{{btnStatus[2]}}</span>
                        </span>
                        <span v-else-if="obj.status=='未做'">
                            <span class="status" :style="{background:cookStatus[3]}">{{cookStatus[1]}}</span>
                            <span class="deleted" v-show="btnList" @click="alert">{{btnStatus[3]}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class='t-footer'>
            <div class="home">
                <router-link to="/detail">
                    <span class="tcon iconfont icon-fanhui"></span>
                </router-link>
                <span class="t-total">￥{{ttotal}}</span>
            </div>
            <div class="modifi"  @click="modifi">
                <span class="tcon iconfont icon-xiugai"></span>
            </div>
        </div>
        <div class="t-cover" v-show="cover">
            <div class="message">
                <p v-show='message'>您的菜正在下厨,不能删除，请您稍等...</p>
                <p v-show="!message">这么好吃的特色菜,您确定要取消么？</p>
                <div v-if="message">
                    <span class="tt-btn" @click="alert">返回</span>
                </div>
                <div v-if="!message">
                    <span class="t-giveup" @click="alert" v-show="!message">确定</span>
                    <span class="t-btn" @click="alert">返回</span>

                </div>
                
            </div>
        </div>
   </div>
</template>

<script type="text/javascript">
    import './order.scss'
    import http from '../../utils/httpClient.js'
    import loading from '../loading/loading.vue'
    import router from  '../../router/'
    var dele;
    var count= 0;
    export default {
        props:['api'],
        data: () => ({
            initStatus:false,
            cover:false,
            message:false,
            ttotal:0,
            cookStatus:['已下厨','未下厨','#188FE6','#cce'],
            btnStatus:['修改','确认','-','x'],
            btnList:false,
            orderData:[]
        }),
        sockets:{
            connect:function(){
                
            },
            receiveStatus:function(){

                var self = this;
                setTimeout(function(){
                       var Tdata= self.orderData;
                       for(var i=0;i<Tdata.length;i++){
                           self.ttotal += Tdata[i].num*Tdata[i].price;
                       }
                       http.post({
                           url: 'Webgetorder',
                           vm:self
                       }).then(res => {
                           self.orderData = res.data[1];
                           var arry = res.data[1]
                           for(var i=0;i<arry.length;i++){
                               if(arry[i].status!='取消'){
                                   self.ttotal += arry[i].num*arry[i].price;
                               }
                           }
                       })
                },500)
            }
        },
        methods:{
            modifi:function(e){
                count++;
                var edit = e.target.parentNode;
                var son = edit.children;
                if(e.target.parentNode){
                    if(count == 1){
                        edit.style.color='#D0EAE4';
                        this.btnList=true;
                    }else if(count == 2){
                        count=0;
                        edit.style.color='#3190e8';
                        this.btnList=false;
                        }
                }
            },
            alert:function(e){
                var self = this;
                if(e.target.innerHTML=='-'){
                    this.cover=true;
                    this.message=true;
                }else if(e.target.innerHTML=='x'){
                    this.cover=true;
                    this.message=false;
                    dele = e.target.parentNode.parentNode.parentNode;
                }
                if(e.target.className=='t-btn' || e.target.className=='tt-btn'){
                    this.cover=false;
                }else if(e.target.className=='t-giveup'){
                    this.cover=false;
                    var name = $(dele).children('.t-left').children('.name').text();
                    console.log(name);
                    dele.remove();
                    http.post({
                        url: 'Webdeleted',
                        params:{name:name},
                        vm:self
                    }).then(res => {
                        console.log(res)
                        self.orderData = res.data[1];
                        http.post({
                            url: 'Webgetorder',
                            vm:self
                        }).then(res => {
                            self.orderData = res.data[1];
                            var arry = res.data[1]
                            self.ttotal = 0;
                            for(var i=0;i<arry.length;i++){
                                if(arry[i].status!='取消'){
                                    self.ttotal += arry[i].num*arry[i].price;
                                }
                            }
                        })

                    })

                }
            }
        },
        mounted:function(){
            var Tdata= this.orderData;
            for(var i=0;i<Tdata.length;i++){
                this.ttotal += Tdata[i].num*Tdata[i].price;
            }
            var self = this;
            http.post({
                url: 'Webgetorder',
                vm:self
            }).then(res => {
                self.orderData = res.data[1];
                var arry = res.data[1]
                for(var i=0;i<arry.length;i++){
                    if(arry[i].status!='取消'){
                        self.ttotal += arry[i].num*arry[i].price;
                    }
                }
            })
        },
        components:{
            loading
        }
            
    }
</script>
