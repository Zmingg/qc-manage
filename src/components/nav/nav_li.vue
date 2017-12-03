<template>
    <li @click.stop="handle(nav)">
        <div class="item" :class="{ active: active,child: isChild}" >
            <i v-if="nav.icon" class="icon" :class="nav.icon"></i>
            <span v-if="nav.name">{{ nav.name }}</span>
        </div>
        <ul v-if="nav.children" :style="{height:ulHeight+'px'}">
            <nav-li v-for="child,index in nav.children" :key="index" :nav="child" :isChild="true" ></nav-li>
        </ul>
    </li>
</template>
<script>
export default {
    name: 'NavLi',
    props: ['nav','isChild'],
    data(){
        return {
            open: false,
            height: '',
            ulHeight: 0
        }
    },
    computed: {
        active: function () {
            return (this.nav.path && this.nav.path === this.$route.fullPath);
        }
    },
    mounted(){
        this.height = this.$el.clientHeight;
    },
    methods: {
        handle: function (nav) {
            if(nav.path){
                this.go(nav.path);
            } else {
                this.toggle();
            }
        },
        go: function (url) {
            this.$router.push(url);
        },
        toggle: function () {
            this.open = !this.open;
            if (this.open&&this.nav.children) {
                this.ulHeight = this.height * this.nav.children.length;
            } else {
                this.ulHeight = 0;
            }
        }
    }
}
</script>
<style scoped>
li span {
    display: inline-block;
}
.item {
    margin: 0;
    padding-left: 50px;
    text-align: left;
    transition: 0.5s;
    -webkit-transition: 0.5s;
    cursor: pointer;
}
.item:hover {
    color: #fafc9b;
    background: #3e4c51;
}
.icon {
    margin-right: 5px;
    display: inline-block;
}
.child {
    padding-left: 80px;
}

ul {
    overflow: hidden;
    transition: 0.3s;
    -webkit-transition: 0.3s;
}
.active {
    color: #e7e395;
    background: #3e4c51;
    font-weight: bold;
}
.open {
    background: rgb(67, 74, 80);
}
</style>