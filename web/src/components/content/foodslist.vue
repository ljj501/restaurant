<template>
    <div class="foodslist">
        <dl>
           <dd v-for="obj in dataset" v-if="obj.classify == '米线'">{{obj.name}}</dd>
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
                dataset: [{'id':1,'classify':'米线','name':'甘草米线'},{'id':2,'classify':'米线','name':'湿草米线'},{'id':3,'classify':'米线','name':'班草米线'},{'id':4,'classify':'米线','name':'无敌米线'},{'id':5,'classify':'河粉','name':'甘草河粉'},{'id':6,'classify':'河粉','name':'湿艹河粉'},{'id':7,'classify':'河粉','name':'班草河粉'},{'id':8,'classify':'河粉','name':'无敌河粉'}],
                loadingShow: false,
            }
        },
        props: ['api'],
        methods:{
            active:function(event){
                var currentLi = event.target;
                var lis = currentLi.parentNode.children;
                for(var i=0;i<lis.length;i++){
                    lis[i].className='';
                }
                currentLi.className='active';    
            }
        },
        // mounted: function(){
        //     var self = this;
        //     http.get({
        //         url: self.api,
        //         vm:self
        //     }).then(res => {
        //         self.dataset = res.data
        //     })
        // },
        components: {
            loading
        }
    }
</script>