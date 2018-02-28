<template>
    <div>
        <el-input class="input" v-model="searchKey" placeholder="检索歌手" @input="searchSinger"></el-input>
        <ul class="singers-list input" @click="getSinger">
            <li class="singers-item" :data-sid="singer.sid" v-for="singer in searchResult">
                {{ singer.name }}
            </li>
        </ul>
        <el-alert v-show="error!==''"
            :title="error"
            type="error"
            :closable="false"
            show-icon>
        </el-alert>
        <div class="singer-form" v-show="creating || updating">
            <el-input class="input" v-model="singer.name" placeholder="请输入">
                <i slot="suffix" class="el-input__icon">歌手姓名&nbsp</i>
            </el-input>
            <el-input class="input"
                      type="textarea"
                      :autosize="{ minRows: 6 }"
                      placeholder="请输入简介"
                      v-model="singer.summary">
            </el-input>
            <el-button class="input" type="success" v-show="creating" @click="saveSinger">添加</el-button>
            <el-button class="input" type="primary" v-show="updating" @click="updateSinger">修改</el-button>
            <el-button class="input" type="danger" v-show="updating" @click="deleteSinger">删除</el-button>
            <el-button class="input" @click="reset">取消</el-button>
        </div>
        <el-button v-show="!creating&&!updating" class="input" type="success" @click="createSinger">添加新歌手</el-button>
    </div>
</template>
<script>
import api from '../../api/music/singer';
export default {
    data(){
        return {
            singer: {
                sid: 0,
                name: '',
                summary: ''
            },
            singers: [],
            searchKey: '',
            searchResult: [],
            creating: false,
            updating: false,
            error: ''
        }
    },
    mounted(){
        this.getAllSingers();
    },
    methods: {
        getAllSingers: async function () {
            let res = await api.all();
            if (res.ok) {
                this.singers = res.data;
            }
        },
        searchSinger: function () {
            this.creating = false;
            if (this.searchKey==='') {
                this.searchResult = [];
                return;
            }
            let _result = [];
            for (let singer of this.singers) {
                if (singer.name.indexOf(this.searchKey) >= 0) {
                    _result.push(singer);
                }
            }
            this.searchResult = _result;
        },
        getSinger: async function (e) {
            if (e.target.tagName !== 'LI') {
                return;
            }
            let sid = e.target.dataset.sid;
            let res = await api.get(sid);
            if (res.ok) {
                this.singer = res.data[0];
                this.updating = true;
                this.creating = false;
            }
        },
        updateSinger: async function () {
            let res = await api.update(this.singer);
            if (res.ok) {
                this.reset();
            }
        },
        deleteSinger: async function () {
            let res = await api.delete(this.singer.sid);
            if (res.ok) {
                this.reset();
            } else {
                this.error = res.data;
            }
        },
        createSinger: function () {
            this.updating = false;
            this.creating = true;
        },
        saveSinger: async function () {
            if (this.singer.name === '')
                return;
            let res = await api.create(this.singer);
            if (res.ok) {
                this.reset();
            }
        },
        reset: function () {
            this.error = '';
            this.searchKey = '';
            this.searchResult = [];
            this.singer = {
                sid: 0,
                name: '',
                summary: ''
            };
            this.creating = this.updating = false;
            this.getAllSingers();
        }
    }
}
</script>
<style scoped>
.singer-form {
    max-width: 400px;
    width: 100%;
}
.input {
    margin-top: 10px;
}
.singers-list::after {
    content: '';
    clear: both;
    display: block;
}
.singers-item {
    height: 40px;
    line-height:30px;
    margin-right: 10px;
    margin-bottom: 5px;
    padding: 5px 15px;
    font-size: 13px;
    background: #d0d0d0;
    float: left;
}
</style>