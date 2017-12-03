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
            <nav>
                <qc-nav></qc-nav>
            </nav>
        </main>
        <footer>
            <Bottom></Bottom>
        </footer>
    </div>
</template>
<script>
import Top from '../components/top.vue';
import Bottom from '../components/bottom.vue';
import QcNav from '../components/nav/nav.vue';
export default {
    components:{
        Top, Bottom, QcNav
    },
    data(){
        return {
            title: 'This is Manage for Blog.'
        }
    },
    computed: {

    },
    mounted(){

    }
}
</script>
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
    width: 220px;
    height: 100%;
    margin-left: -100%;
    text-align: center;
}
.content {
    float: left;
    width: 100%;
    height: 100%;
}
.content-real {
    height: 100%;
    margin-left: 220px;
    padding: 10px 15px;
}
</style>