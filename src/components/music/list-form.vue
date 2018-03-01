<template>
    <div class="form" v-if="state!==''">
        <div style="margin-right: 100px;float: left;">
            <el-input class="input" v-model="data.title" >
                <i slot="suffix" class="el-input__icon">歌单名&nbsp</i>
            </el-input>
            <el-input class="input" v-model="data.tags" >
                <i slot="suffix" class="el-input__icon">标签（，隔开）&nbsp</i>
            </el-input>
            <el-input class="input" v-model="data.count" >
                <i slot="suffix" class="el-input__icon">播放量&nbsp</i>
            </el-input>
        </div>
        <div class="img-upload" @click="imgUpload">
            <img :src="thumb"/>
        </div>
        <input type="file" id="img-upload" hidden/>
        <el-select class="input" v-model="aids" multiple filterable placeholder="请选择">
            <el-option
                    v-for="audio in audios"
                    :key="audio.aid"
                    :label="audio.title"
                    :value="audio.aid">
                <span style="float: left">{{ audio.title }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px; margin-right: 20px">{{ audio.singer }}</span>
            </el-option>
        </el-select>
        <div class="control">
            <el-button class="button" size="small" type="success" v-if="state==='create'" @click="createList">确认添加</el-button>
            <el-button class="button" size="small" type="success" v-if="state==='edit'" @click="updateList">确认修改</el-button>
            <el-button class="button" size="small" type="danger" v-if="state==='edit'" @click="deleteList">删除歌单</el-button>
            <el-button class="button" size="small" @click="close">取消</el-button>
        </div>
    </div>
</template>
<script>
import Api from '../../api/music/music';
import { domain, upload } from '../../api/qiniu';
export default {
    props: ['data', 'state', 'close'],
    data() {
        return {
            audios: [],
        }
    },
    computed: {
        aids: {
            get() {
                if (this.data.aids==='')
                    return [];
                let arr = this.data.aids.split(',');
                for (let i in arr) {
                    if (!arr.hasOwnProperty(i)) continue;
                    arr[i] = + arr[i];
                }
                return arr;
            },
            set(val) {
                this.data.aids = val.toString();
            }
        },
        thumb: function() {
            return domain.musicP + this.data.img + '/thumb';
        }
    },
    mounted() {
        this.getAudios();
    },
    methods: {
        async getAudios() {
            let res = await Api.audio.all();
            if (res.ok) {
                this.audios = res.data;
            }
        },
        imgUpload () {
            let input = document.getElementById('img-upload');
            if (!input.onchange) {
                input.onchange = () => {
                    let file = input.files[0];
                    let options = {
                        server: 'music',
                        prefix: 'image'
                    };
                    let list = this.data;
                    upload(file, options, {
                        next(res){},
                        error(err){
                            console.log(err)
                        },
                        complete(res){
                            list.img = res.key;
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

        async createList () {
            let res = await Api.list.create(this.data);
            if (res.ok) {
                this.close();
            }
        },

        async updateList () {
            let res = await Api.list.update(this.data);
            if (res.ok) {
                this.close();
            }
        },

        async deleteList () {
            let res = await Api.list.delete(this.data.lid);
            if (res.ok) {
                this.close();
            }
        },

    }

}
</script>
<style scoped>
.form {
    width: 100%;
    max-width: 500px;
}
.input {
    margin-bottom: 5px;
    width: 100%;
}
.img-upload {
    float: left;
    width: 90px;
    height: 90px;
    background: #000;
    margin-top: 10px;
    margin-left: -90px;
}
.control {
    margin-top: 10px;
}
</style>