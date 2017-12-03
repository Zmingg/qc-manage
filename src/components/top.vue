<template>
    <div class="back">
        用户ID: {{ user.id }}
        <el-button size="small" @click="signOut">登出</el-button>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    computed: {
        ...mapState([
            'user'
        ])
    },
    methods: {
        ...mapActions({
            signOutAct: 'signOut'
        }),
        signOut: function () {
            this.signOutAct();
            this.$router.push('/pass');
        }
    }

}
</script>
<style scoped>
.back {
    width: 100%;
    height: 100%;
    background: #252525;
    color: #cfcfcf;
}
</style>