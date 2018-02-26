<template>
    <div>
        <h5>上传歌曲</h5>
        <el-button slot="append" id="audio-upload">上传歌曲文件</el-button>
        <ul class="state">
            <li v-for="audio,index in audios">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item :title="audio.name + ' - ' + audio.percent + '%'" :name="index">
                        <el-input class="input" v-model="audio.title" placeholder="请输入">
                            <i slot="suffix" class="el-input__icon">曲目名&nbsp</i>
                        </el-input>
                        <el-input class="input" v-model="audio.sub_title" placeholder="请输入">
                            <i slot="suffix" class="el-input__icon">副标题&nbsp</i>
                        </el-input>
                        <el-input class="input" :value="audio.src" disabled>
                            <i slot="suffix" class="el-input__icon">地址&nbsp</i>
                        </el-input>
                        <el-input  class="input" v-model="audio.lyric" disabled>
                            <el-button slot="append" icon="el-icon-upload2" @click="selectLyric(audio)"></el-button>
                        </el-input>



                        <el-select v-model="audio.sids" multiple filterable placeholder="请选择">
                            <el-option
                                    v-for="singer in singers"
                                    :key="singer.sid"
                                    :label="singer.name"
                                    :value="singer.sid">
                            </el-option>
                        </el-select>
                        <el-select v-model="audio.did" filterable placeholder="请选择">
                            <el-option
                                    v-for="disc in discs"
                                    :key="disc.did"
                                    :label="disc.title"
                                    :value="disc.did">
                            </el-option>
                        </el-select>
                        <el-button type="success" @click="saveAudio(audio)"> 保存 </el-button>
                    </el-collapse-item>
                </el-collapse>
            </li>
        </ul>
    </div>
</template>
<script>
import { serverMusic, domain, uploader, uploadToken } from '../../api/upload';
import { apiSingers, apiDiscs, apiAudioCreate } from '../../api/music';
import * as qiniu from 'qiniu-js';
export default {
    data() {
        return {
            audios: [],
            activeName: '0',
            singers: [],
            discs: [],
            singer: '',
            uploadToken: ''
        }
    },

    created() {
        this.getSingers();
        this.getDiscs();
        this.getToken();
    },

    mounted() {
        let audios = this.audios;
        let audioUploader = uploader('audio-upload',serverMusic,domain.musicS,'audio');
        audioUploader.bind('FilesAdded', (up, files)=>{
            plupload.each(files, function (file) {
                file.sids = [1];
                file.did = 1;
                file.src = '';
                file.lyric = '';
                audios.push(file);
            });
        });
        audioUploader.bind('FileUploaded',(up, file, info)=>{
            for (let audio of this.audios) {
                if (audio.id === file.id) {
                    audio.src = JSON.parse(info.response).key;
                }
            }
        });

        let lyricUploader = uploader('lyric-upload',serverMusic,domain.musicS,'lyric');

    },

    methods: {
        getSingers: async function () {
            let res = await apiSingers();
            if (res.ok) {
                this.singers = res.data;
            }
        },
        getDiscs: async function () {
            let res = await apiDiscs();
            if (res.ok) {
                this.discs = res.data;
            }
        },
        getToken: async function () {
            let res = await uploadToken('music');
            if (res.ok) {
                this.uploadToken = res.uptoken;
            }
        },
        saveAudio: async function (audio) {
            let res = apiAudioCreate({
                title: audio.title,
                sub_title: audio.sub_title,
                did: audio.did,
                src: audio.src,
                lyric: audio.lyric,
                sids: audio.sids
            });
        },
        selectLyric: function (audio) {

            let input = document.createElement('input');
            input.type = 'file';
            input.onchange = () => {
                this.uploadLyric(input.files[0], (key) => {
                    audio.lyric = key;
                    console.log(key)
                });
            };
            input.click();

        },
        uploadLyric: function (file, callback) {
            let config = {
                useCdnDomain: false,
                region: qiniu.region.z0
            };
            let putExtra = {
                fname: "",
                params: {},
                mimeType: null
            };
            let observable = qiniu.upload(file, file.name, this.uploadToken, putExtra, config);

            observable.subscribe((res) => {}, (err) => {
                console.log(err);
            }, (res) => {
                console.log(res);
                callback(file.name);
            });
        }
    }
}
</script>
<style scoped>
h5 {
    margin: 15px;
}
.input {
    margin-bottom: 5px;
}
.state {

}
</style>