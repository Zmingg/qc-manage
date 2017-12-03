<template>
    <router-view></router-view>
</template>
<script>
import Index from './pages/home.vue';
import storage from  './lib/storage';
import { mapMutations } from 'vuex';
export default {
    components:{
        Index
    },
    data(){
        return {
            title: 'This is Manage for Blog.'
        }
    },
    mounted(){
        let user = (new storage).get('user');
        if (user){
            this.USER_SIGN_IN(user);
        }
    },
    methods: {
        ...mapMutations([
            'USER_SIGN_IN'
        ])
    }
}
</script>
<style>
* {
    margin: 0;
    padding: 0;
    list-style-type: none;
    box-sizing: border-box;
}
html,body {
    width: 100%;
    height: 100%;
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    font-size: 15px;
    -webkit-font-smoothing: antialiased;
}
img {
    max-width: 100%;
}
</style>