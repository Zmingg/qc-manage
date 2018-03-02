<template>
    <div class="login">
        <div class="login-box">
            <div class="login-row">
                <el-alert v-show="error!==''"
                        :title="error"
                        type="error"
                          @close="closeError">
                </el-alert>
            </div>
            <div class="login-row">
                <el-input v-model="user.name" placeholder="用户名" class="login-input"></el-input>
            </div>
            <div class="login-row">
                <el-input v-model="user.pass" placeholder="密码" class="login-input"></el-input>
            </div>
            <div class="login-row bottom">
                <el-button class="login-button" @click="signIn">登录</el-button>
                <el-button class="login-button" type="success" disabled>注册</el-button>
            </div>

        </div>
    </div>
</template>
<script>
import { userSignIn } from '../api/user';
import { mapMutations, mapActions } from 'vuex';
export default {
    data(){
        return {
            user: {
                name: '',
                pass: ''
            },
            error: ''
        }
    },
    methods: {
        ...mapActions({
            signInAct: 'signIn'
        }),
        signIn: async function () {
            let res = await this.signInAct(this.user);
            if (res.ok) {
                this.$router.push({
                    path: '/'
                });
            } else {
                this.error = res.data;
            }
        },
        closeError: function () {
            this.error = '';
        }
    }


}
</script>
<style>
.login {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -40px;
}
.login-box {
    width: 100%;
    height: 300px;
    max-width: 280px;
    padding: 20px;
}
.login-row {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.login-row > span {
    width: 100px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.bottom {
    margin-bottom: 0;
}
.login-button {
    flex: 1;
}
</style>
