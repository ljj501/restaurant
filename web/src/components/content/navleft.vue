<template>
    <div class="navleft">
        <ul >
            <li v-for="(obj,index) in dataset" v-if="obj.status != '已下架'" @click="active">
            <a :href="'#'+obj.classify">{{obj.classify}}</a></li>
        </ul>
        <loading v-show="loadingShow"></loading>
    </div>
</template>

<script type="text/javascript">
    import http from '../../utils/httpClient.js'
    import loading from '../loading/loading.vue'
    
    export default {
        data: function(){
            return {
                dataset:[],
                loadingShow: false,
            }
        },
        props: ['api'],
        methods:{
            active:function(event){
                var currentA = event.target;
                var lis = currentA.parentNode.parentNode.children;
                for(var i=0;i<lis.length;i++){
                    lis[i].children[0].className='';
                }
                currentA.className='active';
            }
        },
        mounted: function(){
            var self = this;
            http.post({
                url: self.api,
                vm:self
            }).then(res => {
                console.log(self.$parent.$children[1].jj)
                self.dataset = res.data[1];
                console.log(self.dataset)
                self.$parent.$children[1].jj()
            })

        },
        components: {
            loading
        }
    }
</script>