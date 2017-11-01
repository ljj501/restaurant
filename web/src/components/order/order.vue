<template>
   <div class="t-content">
        <div class="orderlist">
            <div class="carnone" v-show="initStatus">
                <h3>购物车为空T.T</h3>
                <router-link class="linklist" to="/">先去逛逛吧~</router-link>
            </div>
            <div class="carshow">
                <div class="edit"><span>请您稍侯,本店大厨正在为您下厨</span></div>
                <div class="carlist" v-for="(obj,index) in orderData">
                    <div class="left fl">
                        <span class="name">{{obj.name}}</span>
                        <p>￥<span class="price">{{obj.price}}</span></p>
                    </div>
                    <div class="right fl">
                        <span class="num">{{obj.num}}</span>
                        <span v-if="obj.status=='true'">
                            <span class="status" :style="{color:cookStatus[2]}">{{cookStatus[0]}}</span>
                            <span class="deleted" v-show="btnList" @click="alert" style="background:#cce;">{{btnStatus[2]}}</span>
                        </span>
                        <span v-else-if="obj.status=='false'">
                            <span class="status" :style="{color:cookStatus[3]}">{{cookStatus[1]}}</span>
                            <span class="deleted" v-show="btnList" @click="alert">{{btnStatus[3]}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class='t-footer'>
            <div class="home">
                <router-link to="/detail">
                    <span class="tcon iconfont icon-icon-site"></span>
                    <span class="word">首页</span>
                </router-link>
                
            </div>
            <div class="modifi"  @click="modifi">
                <span class="tcon iconfont icon-xiugai"></span>
                <span class="word">修改</span>
            </div>
        </div>
        <div class="cover" v-show="cover">
            <div class="message">
                <p v-show='message'>您的菜正在下厨,不能删除，请您稍等...</p>
                <p v-show="!message">这么好吃的特色菜,您确定要取消么？</p>
                <span class="t-giveup" @click="alert" v-show="!message">确定</span>
                <span class="t-btn" @click="alert">返回</span>
            </div>
        </div>
   </div>
</template>

<script type="text/javascript">
    import './order.scss'
    var dele;
    export default {
        data: () => ({
            initStatus:false,
            cover:false,
            message:false,
            cookStatus:['已下厨','未下厨','#58bc58','#000'],
            btnStatus:['修改','确认','-','x'],
            btnList:false,
            orderData:[{name:'红烧肘子',price:28,num:1,status:'false'},{name:'鱼香茄子',price:28,num:2,status:'false'},{name:'五柳炸蛋',price:28,num:3,status:'true'},{name:'鱼香茄子',price:28,num:2,status:'false'},{name:'五柳炸蛋',price:28,num:3,status:'true'},{name:'鱼香茄子',price:28,num:2,status:'false'},{name:'五柳炸蛋',price:28,num:3,status:'true'},{name:'鱼香茄子',price:28,num:2,status:'false'},{name:'五柳炸蛋',price:28,num:3,status:'true'},{name:'鱼香茄子',price:28,num:2,status:'false'},{name:'五柳炸蛋',price:28,num:3,status:'true'}]
        }),
        methods:{
            modifi:function(e){
                var edit = e.target.parentNode;
                var son = edit.children;
                if(e.target.parentNode){
                    if(son[1].innerHTML==this.btnStatus[0]){
                        son[1].innerHTML=this.btnStatus[1];
                        edit.style.color='#3190e8';
                        this.btnList=true;
                    }else if(son[1].innerHTML==this.btnStatus[1]){
                        son[1].innerHTML=this.btnStatus[0];
                        edit.style.color='#58bc58';
                        this.btnList=false;
                        }
                }
            },
            alert:function(e){
                if(e.target.innerHTML=='-'){
                    this.cover=true;
                    this.message=true;
                }else if(e.target.innerHTML=='x'){
                    this.cover=true;
                    this.message=false;
                    dele = e.target.parentNode.parentNode.parentNode;
                }
                if(e.target.className=='t-btn'){
                    this.cover=false;

                }else if(e.target.className=='t-giveup'){
                    this.cover=false;
                    dele.remove();
                }
            }
        },
        mounted:function(){
            var footer = document.querySelector('.footer');
            footer.style.display = 'none';  
        }
            
    }
</script>
