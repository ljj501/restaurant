<template>
    <div class="foodslist">
        <dl>
            <dt v-for="item in arr">
                <strong :id=item.classify>{{item.classify}}<i>...</i></strong>
               <dd v-for="obj in dataset" v-if="obj.classify == item.classify">
               <h4 data-main='name'>{{obj.name}}</h4>
               <i class="imgbox"><img src="../../img/timg.jpg" /></i>
               <p>飒飒来看拉克丝撒旦啥卡看I我卡死当时发生撒旦撒萨芬</p>
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
                // dataset: [{'id':1,'classify':'米线','name':'甘草米线'},{'id':2,'classify':'米线','name':'湿草米线'},{'id':3,'classify':'米线','name':'班草米线'},{'id':4,'classify':'米线','name':'无敌米线'},{'id':5,'classify':'河粉','name':'甘草河粉'},{'id':6,'classify':'河粉','name':'湿艹河粉'},{'id':7,'classify':'河粉','name':'班草河粉'},{'id':8,'classify':'河粉','name':'无敌河粉'}],
                dataset:[],
                num:0,
                arr:[],
                loadingShow: false,
            }
        },
        props: ['api'],
        methods:{   
            add:function(event){
                var father = event.target.parentNode;
                var del = father.children[0];
                var number = father.children[1];
                var all = document.getElementsByClassName('all')[0];
                var yes = document.getElementsByClassName('yes')[0];
                var car = document.getElementsByClassName('car')[0];
                var allPrice = all.innerText;

                del.style.display="block";
                number.style.display="block";
                number.innerText++;
                allPrice = allPrice*1 + 1*1000;
                all.innerHTML = allPrice;
                if(allPrice > 0 ){
                    yes.style.backgroundColor='#4cd964';
                    car.style.backgroundColor='#3190e8';
                }
            },
            del:function(event){
                var father = event.target.parentNode;
                var number = father.children[1];
                var add = father.children[2];
                var all = document.getElementsByClassName('all')[0];
                var allPrice = all.innerText;
                var yes = document.getElementsByClassName('yes')[0];
                var car = document.getElementsByClassName('car')[0];

                number.innerText--;
                if(number.innerText <1){
                    event.target.style.display='none';
                    number.style.display='none';
                }
                allPrice = allPrice*1 - 1*1000;
                all.innerHTML = allPrice;
   
                 if(allPrice == '0' ){
                    yes.style.backgroundColor='#535356';
                    car.style.backgroundColor='#3d3d3f';
                }
            }

        },
        updated:function(){
            this.arr = this.$parent.$children[0].dataset;
        },
        mounted: function(){
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