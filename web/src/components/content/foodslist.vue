<template>
    <div class="foodslist">
        <dl>
            <dt v-for="item in arr">
                <strong :id=item.classify>{{item.classify}}<i>...</i></strong>
               <dd v-for="obj in dataset" v-if="obj.classify == item.classify && obj.status != '已下架'">
               <h4 data-main='name'>{{obj.name}}</h4>
               <i class="imgbox"><img src="../../img/timg.jpg" /></i>
               <p>客官来吃吗客官来吃吗客官来吃吗客官来吃吗</p>
               <i class="pay">{{obj.price}}</i>
               <div class="operate">
                   <i class="del" @click="del">-</i>
                   <span class="num" data-mian='num'>{{num}}</span>
                   <i class="add" @click="add">+</i>
               </div>
               </dd>
           </dt>
        </dl>
        <loading v-show="loadingShow"></loading>
    </div>
</template>

<script type="text/javascript">
    import './foodslist.scss'
    import http from '../../utils/httpClient.js'
    import loading from '../loading/loading.vue'
    export default {
        data: function(){            
            return {
                dataset:[],
                num:0,
                arr:[],
                loadingShow: false,
                i:0
            }
        },
        props: ['api'],
        methods:{   
            add:function(event){
                this.i++;
                $('.i').css({'display':'block'}).text(this.i)
                var father = event.target.parentNode;
                var del = father.children[0];
                var number = father.children[1];
                var all = document.getElementsByClassName('all')[0];
                var yes = document.getElementsByClassName('yes')[0];
                var car = document.getElementsByClassName('car')[0];
                var price = father.parentNode.children[3].innerHTML;

                var allPrice = all.innerText;
                del.style.display="block";
                number.style.display="block";
                number.innerText++;
                allPrice = allPrice*1 + 1*price;
                all.innerHTML = allPrice;
                if(allPrice > 0 ){
                    yes.style.backgroundColor='#4cd964';
                    car.style.backgroundColor='#3190e8';
                }
            },
            del:function(event){
                this.i--;
                $('.i').css({'display':'block'}).text(this.i)
                if(this.i == 0){
                    $('.i').css({display:'none'})
                }
                var father = event.target.parentNode;
                var number = father.children[1];
                var add = father.children[2];
                var all = document.getElementsByClassName('all')[0];
                var allPrice = all.innerText;
                var yes = document.getElementsByClassName('yes')[0];
                var car = document.getElementsByClassName('car')[0];
                var price = father.parentNode.children[3].innerHTML;

                number.innerText--;
                if(number.innerText <1){
                    event.target.style.display='none';
                    number.style.display='none';
                }
                allPrice = allPrice*1 - 1*price;
                all.innerHTML = allPrice;
   
                 if(allPrice == '0' ){
                    yes.style.backgroundColor='#535356';
                    car.style.backgroundColor='#3d3d3f';
                }
            },
            jj:function(){
                var self = this;
                // console.log(self.arr)
                self.arr = self.$parent.$children[0].dataset;
                http.post({
                    url: self.api,
                    vm:self
                }).then(res => {
                    self.dataset = res.data[1]
                })
            }

        },
        updated:function(){
            this.arr = this.$parent.$children[0].dataset;
            console.log(this.arr)
        },
        mounted: function(){
            // console.log(this.api)
            var self = this;
            http.post({
                url: self.api,
                vm:self
            }).then(res => {
                self.dataset = res.data[1]
                console.log(self.dataset)
            })
        },
        components: {
            loading
        }
    }
</script>