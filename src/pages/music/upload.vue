<template>
    <div>
        <h5>上传歌曲</h5>
        <el-input class="input" v-model="audio.title" placeholder="请输入标题">
            <i slot="suffix" class="el-input__icon">曲目名&nbsp</i>
        </el-input>
        <el-button slot="append" id="audio-upload">上传歌曲文件</el-button>
    </div>
</template>
<script>
import { serverMusic, domain, uploader } from '../../api/upload';
export default {
    data() {
        return {
            audio: {
                title: ''
            }
        }
    },

    mounted() {
        console.log(domain.musicS);
        let audioUploader = uploader('audio-upload',serverMusic,domain.musicS,'audio');
        audioUploader.bind('UploadProgress',(up, file)=>{
            console.log(file.percent,file.speed);
        });
    },

    methods: {

    }
}
</script>
<style scoped>
h5 {
    margin-bottom: 5px;
}
.input {
    margin-bottom: 5px;
}

</style>