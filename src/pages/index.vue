<template>
    <div>
        {{date.toLocaleDateString()}} - {{ user.nickname }}, 欢迎你使用本系统。
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data(){
        return {
            date: new Date()
        }
    },
    computed: {
        ...mapState([
            'user'
        ])
    }

}
</script>