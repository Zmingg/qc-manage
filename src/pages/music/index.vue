<template>
    <div>
        <el-input class="input" v-model="searchKey" placeholder="检索歌曲" @input="searchAudio"></el-input>
        <ul class="audios-list input" @click="getAudio">
            <li class="audios-item" :data-aid="audio.aid" v-for="audio in searchResult">
                {{ audio.title }}
            </li>
        </ul>
        <div class="audio-form" v-show="updating">
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
                <el-button slot="append" icon="el-icon-upload2" @click="selectLyric"></el-button>
            </el-input>

            <el-select class="input short" v-model="sidsArr" multiple filterable placeholder="请选择">
                <el-option
                        v-for="singer in singers"
                        :key="singer.sid"
                        :label="singer.name"
                        :value="singer.sid">
                </el-option>
            </el-select>
            <el-select class="input short" v-model="audio.did" filterable placeholder="请选择">
                <el-option
                        v-for="disc in discs"
                        :key="disc.did"
                        :label="disc.title"
                        :value="disc.did">
                </el-option>
            </el-select>
            <div class="control">
                <el-button class="button" type="success" @click="updateAudio">确认修改</el-button>
                <el-button class="button" type="danger" @click="deleteAudio">删除曲目</el-button>
            </div>

        </div>
    </div>
</template>
<script>
import Api from '../../api/music/music';
import { upload } from '../../api/qiniu';
export default {
    data() {
        return {
            audio: {
                title: '',
                sids: ''
            },
            audios: [],
            discs: [],
            singers: [],
            searchKey: '',
            searchResult: [],
            updating: false
        }
    },

    computed: {
        sidsArr: {
            get(){
                let arr = this.audio.sids.split(',');
                for (let i in arr) {
                    arr[i] = + arr[i];
                }
                return arr;
            },
            set(val){
                this.audio.sids = val.toString();
            }
        }
    },

    mounted() {
        this.getAudios();
        this.getSingers();
        this.getDiscs();
    },

    methods: {
        getAudios: async function () {
            let res = await Api.audio.all();
            if(res.ok) {
                this.audios = res.data;
            }
        },
        getSingers: async function () {
            let res = await Api.singer.all();
            if(res.ok) {
                this.singers = res.data;
            }
        },
        getDiscs: async function () {
            let res = await Api.disc.all();
            if(res.ok) {
                this.discs = res.data;
            }
        },
        searchAudio: function () {
            if (this.searchKey==='') {
                this.searchResult = [];
                return;
            }
            let _result = [];
            for (let audio of this.audios) {
                if (audio.title.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0) {
                    _result.push(audio);
                }
            }
            this.searchResult = _result;
        },
        getAudio: async function (e) {
            if (e.target.tagName !== 'LI') {
                return;
            }
            let aid = e.target.dataset.aid;
            let res = await Api.audio.get(aid);
            if (res.ok) {
                this.audio = res.data;
                this.updating = true;
            }
        },
        selectLyric: function () {
            let input = document.createElement('input');
            input.type = 'file';
            input.onchange = () => {
                let options = {
                    server: 'music',
                    prefix: 'lyric'
                };
                let audio = this.audio;
                upload(input.files[0], options, {
                    next(res){},
                    error(err){},
                    complete(res){
                        input = null;
                        audio.lyric = res.key;
                    }
                });
            };
            let clickTime = setTimeout(()=>{
                clearTimeout(clickTime);
                clickTime = null;
                input.click();
            }, 500);
        },

        updateAudio: async function () {
            let res = await Api.audio.update(this.audio);
            if (res.ok) {
                this.reset();
            }
        },

        deleteAudio: async function () {
            let res = await Api.audio.delete(this.audio.aid);
            if (res.ok) {
                this.reset();
            }
        },

        reset: function () {
            this.updating = false;
            this.searchKey = '';
            this.searchResult = [];
            this.getAudios();
        }
    }
}
</script>
<style scoped>
.audios-list {
    max-width: 400px;
    width: 100%;
}
.input {
    margin-top: 10px;
    width: 100%;
}
.short {
    max-width: 200px;
}
.audios-list::after {
    content: '';
    clear: both;
    display: block;
}
.audios-item {
    height: 40px;
    line-height:30px;
    margin-right: 10px;
    margin-bottom: 5px;
    padding: 5px 15px;
    font-size: 13px;
    background: #d0d0d0;
    float: left;
}
.audio-form {
    max-width: 400px;
    width: 100%;
}
.control {
    margin-top: 10px;
}
</style>