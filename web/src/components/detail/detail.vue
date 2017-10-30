<template>
    <div class="content"  v-if="this.status = 'false'">
        <!-- <div class="navleft"> -->
            <!-- <ul>
                <li>热销榜</li>
                <li>米线</li> 
                <li>麻辣烫</li>
                <li>生煎</li>
                <li>粥</li>
                <li>大龙虾</li>
                <li>大闸蟹</li>
            </ul> -->
            <navleft  api=""></navleft>
      
            <foodslist></foodslist>
    </div>

</template>
<script type="text/javascript">
    import './detail.scss'
    import foodslist from '../content/foodslist.vue'
    import navleft from '../content/navleft.vue'
    export default{
        data:function(){
            return {
                status:'true'
            }
        },
        components: {
            navleft,
            foodslist
        }
    }
</script>