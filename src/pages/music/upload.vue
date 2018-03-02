<template>
    <div>
        <h5>上传歌曲</h5>
        <el-button slot="append" @click="selectAudio">上传歌曲文件</el-button>
        <input type="file" id="audio-upload" hidden/>
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

                        <el-select class="input" v-model="audio.sids" multiple filterable placeholder="请选择">
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
                        <el-checkbox v-model="audio.hq" label="HQ" border :true-label="1" :false-label="0"></el-checkbox>
                        <el-button type="success" @click="saveAudio(audio)"> 保存 </el-button>
                    </el-collapse-item>
                </el-collapse>
            </li>
        </ul>
    </div>
</template>
<script>
import { upload } from '../../api/qiniu';
import Api from '../../api/music/music';
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

    mounted() {
        this.getSingers();
        this.getDiscs();
    },

    methods: {
        getSingers: async function () {
            let res = await Api.singer.all();
            if (res.ok) {
                this.singers = res.data;
            }
        },
        getDiscs: async function () {
            let res = await Api.disc.all();
            if (res.ok) {
                this.discs = res.data;
            }
        },
        saveAudio: async function (audio) {
            let res = await Api.audio.create({
                title: audio.title,
                sub_title: audio.sub_title,
                did: audio.did,
                src: audio.src,
                lyric: audio.lyric,
                hq: audio.hq,
                sids: audio.sids
            });
            if (res.ok) {
                let audios = this.audios;
                for (let i in audios) {
                    if(!audios.hasOwnProperty(i))
                        continue;
                    if (audios[i].name === audio.name) {
                        audios.splice(i, 1);
                    }
                }
            }
        },
        selectAudio: function () {
            let input = document.getElementById('audio-upload');
            input.onchange = () => {
                let file = input.files[0];
                let audio = {
                    name: file.name,
                    title: file.name,
                    sub_title: '',
                    sids: [1],
                    did: 1,
                    src: '',
                    lyric: '',
                    percent: 0
                };

                this.audios.push(audio);
                let options = {
                    server: 'music',
                    prefix: 'audio'
                };
                upload(file, options, {
                    next(res){
                        audio.percent = res.total.percent;
                    },
                    error(err){
                        console.log(err)
                    },
                    complete(res){
                        input = null;
                        audio.src = res.key;
                    }
                });
            };
            let clickTime = setTimeout(()=>{
                clearTimeout(clickTime);
                clickTime = null;
                input.click();
            }, 500);
        },

        selectLyric: function (audio) {
            let input = document.createElement('input');
            input.type = 'file';
            input.onchange = () => {
                this.uploadLyric(input.files[0], (key) => {
                    input = null;
                    audio.lyric = key;
                    console.log(key)
                });
            };
            let clickTime = setTimeout(()=>{
                clearTimeout(clickTime);
                clickTime = null;
                input.click();
            }, 500);
        },
        uploadLyric: function (file, callback) {
            let options = {
                server: 'music',
                prefix: 'lyric'
            };
            upload(file, options, {
                next(res){},
                error(err){},
                complete(res){
                    callback(res.key)
                }
            })
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
    width: 100%;
}
</style>