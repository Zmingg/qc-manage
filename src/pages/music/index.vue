<template>
    <div>
        <span>热门单曲</span>
        <ul>
            <li v-for="audio in audios">
                {{ audio.title }}
            </li>
        </ul>
    </div>
</template>
<script>
import { apiHotAudios, apiLists } from '../../api/music';
export default {
    data() {
        return {
            audios: []
        }
    },

    mounted() {
        this.getAudios();
    },

    methods: {
        getAudios: async function () {
            let res = await apiHotAudios();
            if(res.ok) {
                this.audios = res.data;
            }
        }
    }
}
</script>