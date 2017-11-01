<template>
    <div class="navleft">
        <ul >
            <li v-for="(obj,index) in dataset" :data-main=obj.classify @click="active">{{obj.classify}}</li>
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
                dataset: [{'id':1,'classify':'米线'},{'id':2,'classify':'米饭'},{'id':3,'classify':'腐竹'},{'id':4,'classify':'大米'},{'id':5,'classify':'河粉'},{'id':6,'classify':'肠粉'},{'id':7,'classify':'豆腐'},{'id':8,'classify':'豆芽'},{'id':9,'classify':'豆干'},{'id':9,'classify':'豆干'}],
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
        mounted: function(){
            var self = this;
            http.get({
                url: self.api,
                vm:self
            }).then(res => {
                self.dataset = res.data
            })
        },
        components: {
            loading
        },
        mounted:function(){
            var footer = document.querySelector('.footer');
            footer.style.display = 'block';  
        }
    }
</script>