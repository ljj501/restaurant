<template>
    <div class="content">
            <navleft  api="getWebClass"></navleft>
            <foodslist api='getWebGoods'></foodslist>
            <div class="footer">
                <div class="left">
                    <i class="car" @click="showlist">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-gouwuche"></use>
                        </svg>
                    </i>
                    <i class="all">0</i>
                </div>
                <div class="yes" @click="yes">
                    去下单
                </div>
            </div>
            <div class="tc">
                您确定不再看看其他菜品吗
                <button class="confirm" @click="confirm">确定下单</button>
                <button @click='back'>我再看看</button>
            </div>
    </div>

</template>
<script type="text/javascript">
    import './detail.scss'
    import foodslist from '../content/foodslist.vue'
    import navleft from '../content/navleft.vue'
    import http from '../../utils/httpClient.js'
    import loading from '../loading/loading.vue'
    import router from  '../../router/'

    export default{
        data:function(){
            return {
                dataset:{}
            }
        },
        methods:{
            yes:function(){
                if($('.l-cover').length <= 1 ){

                    $('.tc').css({'display':'block'});
                    var $cover = $('<div/>').addClass('l-cover')
                    $('.box').append($cover) 
                }
            },
            back:function(){
                 $('.tc').css({'display':'none'});
                 $('.l-cover').remove()
                 $('.box').find('table').remove()
            },
            confirm:function(){
                $('.tc').css({'display':'none'});
                $('.l-cover').remove()
                $('.box').find('table').remove()
                // router.push('./order')
                var self = this;
                http.post({
                    url:'sentWetOrder',
                    params:self.dataset,
                    vm:self
                }).then(res => {
                    console.log(res.data)
                     router.push('./order')
                })
            },
            showlist:function(){
                if($('.box').find('table').length == 0){
                    var $cover = $('<div/>').addClass('l-cover')
                    $('.box').append($cover) 

                    var orderprice = $('.all').text();

                    var $nums = $('.num')
                    var $thead = $('<thead/>').css({'background':'#eceff1'})
                    var $Tr = $('<tr/>').appendTo($thead);
                    var $choose = $('<td/>').html('已选商品').appendTo($Tr).css({'color':'#3190e8'})
                    var $space = $('<td/>').appendTo($Tr)
                    var $clear = $('<td>').html('清空').appendTo($Tr)
                    var $table = $('<table/>').append($thead)
                    var $tbody = $('<tbody/>')

                    var temp = [];
                    for(var num of $nums){
                        if(num.innerText > 0){
                            var $tr = $('<tr/>');
                            var childrens = num.parentNode.parentNode.children;

                            var name = childrens[0].innerText;
                            var price = childrens[3].innerText;
                            var num = childrens[4].children[1].innerText;
                            
                            var obj = {name:name,num:num,price:price}
                            temp.push(obj)
                            
                            // console.log(arr)
                            var $name = $('<td/>').html(name)
                            var $prices = $('<td/>').html('¥'+price*num).addClass('prices')
                            var $num = $('<td/>').html(num)
                            $tr.append($name,$prices,$num)
                        }
                        $tbody.append($tr)
                    }
                    var arr = {rank:1,orderprice:orderprice,data:temp}
                    this.dataset = arr;
                    console.log(this.dataset)
                    $table.append($tbody)
                    $('.box').append($table)
                }else if($('.box').find('table').length > 0 ){
                    $('.box').find('.l-cover').remove()
                    $('.box').find('table').remove()
                }
            }
        },
        components: {
            navleft,
            foodslist,
            loading
        }
    }
</script>