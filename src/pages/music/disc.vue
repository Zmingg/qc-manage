<template>
    <div class="main">
        <el-input class="input" v-model="searchKey" placeholder="检索专辑" @input="searchDisc"></el-input>
        <ul class="discs-list input" @click="getDisc">
            <li class="discs-item" :data-did="disc.did" v-for="disc in searchResult">
                {{ disc.title }}
            </li>
        </ul>

        <div class="disc-form" v-show="creating || updating">
            <el-input class="input" v-model="disc.title" placeholder="请输入">
                <i slot="suffix" class="el-input__icon">专辑名&nbsp</i>
            </el-input>
            <el-select class="input" v-model="disc.sid" filterable placeholder="请选择歌手">
                <el-option
                        v-for="singer in singers"
                        :key="singer.sid"
                        :label="singer.name"
                        :value="singer.sid">
                </el-option>
            </el-select>
            <div style="margin-right: 100px;float: left;">
                <el-date-picker  class="input short"
                                 v-model="release"
                                 type="date"
                                 format="yyyy 年 MM 月 dd 日"
                                 placeholder="发布日期">
                </el-date-picker>
                <el-input class="input short" v-model="disc.count">
                    <i slot="suffix" class="el-input__icon">播放计数&nbsp</i>
                </el-input>
            </div>
            <div class="img-upload" @click="imgUpload">
                <img :src="thumb"/>
            </div>
            <input type="file" id="img-upload" hidden/>
            <el-input class="input"
                      type="textarea"
                      :autosize="{ minRows: 6 }"
                      placeholder="请输入简介"
                      v-model="disc.summary">
            </el-input>
            <el-button class="button" type="success" v-show="creating" @click="saveDisc">添加</el-button>
            <el-button class="button" type="primary" v-show="updating" @click="updateDisc">修改</el-button>
            <el-button class="button" type="danger" v-show="updating" @click="deleteDisc">删除</el-button>
            <el-button class="button" @click="reset">取消</el-button>
        </div>
        <el-button v-show="!creating&&!updating" class="button" type="success" @click="createDisc">添加新专辑</el-button>
    </div>
</template>
<script>
import Api from '../../api/music/music';
import { domain, upload } from '../../api/qiniu';
export default {
    data(){
        return {
            singers: [],
            disc: {
                did: 0,
                title: '',
                sid: 1,
                release_time: 1487376000,
                summary: '',
                img: 'image/default',
                count: 0
            },
            discs: [],
            searchKey: '',
            searchResult: [],
            creating: false,
            updating: false
        }
    },
    computed: {
        release: {
            get(){
                return new Date(this.disc.release_time * 1000);
            },
            set(val){
                this.disc.release_time = val
                    ? val.getTime() / 1000
                    : new Date().getTime() / 1000;
            }
        },
        thumb: function() {
            return domain.musicP + this.disc.img;
        }
    },
    mounted(){
        this.getAllDiscs();
        this.getSingers();
    },
    methods: {
        getSingers: async function () {
            let res = await Api.singer.all();
            if (res.ok) {
                this.singers = res.data;
            }
        },
        getAllDiscs: async function () {
            let res = await Api.disc.all();
            if (res.ok) {
                this.discs = res.data;
            }
        },
        searchDisc: function () {
            this.creating = false;
            if (this.searchKey==='') {
                this.searchResult = [];
                return;
            }
            let _result = [];
            for (let disc of this.discs) {
                if (disc.title.indexOf(this.searchKey) >= 0) {
                    _result.push(disc);
                }
            }
            this.searchResult = _result;
        },
        getDisc: async function (e) {
            if (e.target.tagName !== 'LI') {
                return;
            }
            let did = e.target.dataset.did;
            let res = await Api.disc.get(did);
            if (res.ok) {
                this.disc = res.data[0];
                this.updating = true;
                this.creating = false;
            }
        },
        updateDisc: async function () {
            let res = await Api.disc.update(this.disc);
            if (res.ok) {
                this.getAllDiscs();
                this.reset();
            }
        },
        deleteDisc: async function () {
            let res = await Api.disc.delete(this.disc.did);
            if (res.ok) {
                this.getAllDiscs();
                this.reset();
            }
        },
        createDisc: function () {
            this.reset();
            this.creating = true;
        },
        imgUpload: function () {
            let input = document.getElementById('img-upload');
            if (!input.onchange) {
                input.onchange = () => {
                    let file = input.files[0];
                    let options = {
                        server: 'music',
                        prefix: 'image'
                    };
                    let disc = this.disc;
                    upload(file, options, {
                        next(res){},
                        error(err){
                            console.log(err)
                        },
                        complete(res){
                            console.log(res);
                            disc.img = res.key;
                        }
                    });
                };
            }
            let clickTime = setTimeout(()=>{
                clearTimeout(clickTime);
                clickTime = null;
                input.click();
            }, 500);
        },
        saveDisc: async function () {
            if (this.disc.name === '') {
                return;
            }
            let res = await Api.disc.create(this.disc);
            if (res.ok) {
                this.getAllDiscs();
                this.reset();
            }
        },
        reset: function () {
            this.searchKey = '';
            this.searchResult = [];
            this.disc = {
                did: 0,
                title: '',
                sid: 1,
                release_time: 1487376000,
                summary: '',
                img: 'image/default',
                count: 0
            };
            this.creating = this.updating = false;
        }
    }
}
</script>
<style scoped>
.main {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
.disc-form {
    max-width: 400px;
    width: 100%;
}
.input {
    margin-top: 10px;
    width: 100%;
}
.short {
    max-width: 300px;
}
.button {
    margin-top: 10px;
}
.discs-list::after {
    content: '';
    clear: both;
    display: block;
}
.discs-item {
    height: 40px;
    line-height:30px;
    margin-right: 10px;
    margin-bottom: 5px;
    padding: 5px 15px;
    font-size: 13px;
    background: #d0d0d0;
    float: left;
}
.img-upload {
    float: left;
    width: 90px;
    height: 90px;
    background: #000;
    margin-top: 10px;
    margin-left: -90px;
}
</style>