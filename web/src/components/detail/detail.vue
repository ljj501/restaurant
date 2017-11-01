<template>
    <div class="content">
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