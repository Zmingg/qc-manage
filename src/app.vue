<template>
    <div class="app">
        <header>
            <Top></Top>
        </header>
        <main>
            <div class="content">
                <div class="content-real">
                    <router-view></router-view>
                </div>
            </div>
            <nav class="nav">
                <ul>
                    <li><router-link to="/">Index</router-link></li>
                    <li><router-link to="/blog">Blog</router-link></li>
                </ul>
            </nav>
        </main>
        <footer>
            <Bottom></Bottom>
        </footer>
    </div>
</template>
<script>
import Top from './components/top.vue';
import Bottom from './components/bottom.vue';
export default {
    components:{
        Top, Bottom
    },
    data(){
        return {
            title: 'This is Manage for Blog.'
        }
    },
    computed: {

    },
    mounted(){
        console.log(this.title);
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
}
</style>
<style scoped>
.app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
header,footer {
    width: 100%;
    height: 100px;
}
main {
    width: 100%;
    height: 200px;
    flex: 1;
}
nav {
    float: left;
    width: 150px;
    height: 100%;
    margin-left: -100%;
    padding: 10px;
    text-align: center;
    border-right: solid 1px #666;
}
.content {
    float: left;
    width: 100%;
    height: 100%;
}
.content-real {
    height: 100%;
    margin-left: 150px;
    padding: 10px 15px;
}
</style>