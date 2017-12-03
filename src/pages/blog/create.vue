<template>
    <div class="box">
        <h5>Blog Update {{user.id}}</h5>

        <el-input class="input" v-model="blog.title" placeholder="请输入标题">
            <i slot="suffix" class="el-input__icon">文章标题&nbsp</i>
        </el-input>

        <el-select v-model="blog.cate_id" placeholder="请选择类别" class="input">
            <el-option
                    v-for="cate in cates"
                    :key="cate.id"
                    :label="cate.name"
                    :value="cate.id">
            </el-option>
        </el-select>


        <el-input class="input" v-model="blog.tags">
            <i slot="suffix" class="el-input__icon">标签 ( 以 , 隔开 )</i>
        </el-input>

        <el-date-picker class="input"
                        v-model="datetime"
                        type="datetime"
                        placeholder="选择日期">
        </el-date-picker>

        <el-input class="input"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="blog.abstract">
        </el-input>

        <div id="editor"></div>

        <el-button class="short" @click="create">确认添加</el-button>

        <img-select v-show="imgAdding" @close="closeImgSelect" @insert="insertImg"></img-select>

    </div>
</template>
<script>
import { mapState } from 'vuex';
import { blogCreate } from '../../api/blog';
import { cateList } from '../../api/cate';
import Quill from 'quill';
import ImgSelect from '../../components/blog/img_select.vue';
export default {
    components: {
        ImgSelect
    },
    data(){
        return {
            blog: {
                created_at: 0
            },
            cates: [],
            imgAdding: false,
            range: {}
        }
    },

    computed: {
        ...mapState([
            'user'
        ]),
        datetime: {
            get(){
                return new Date(this.blog.created_at * 1000);
            },
            set(val){
                this.blog.created_at = val
                    ? ~~(val.getTime() / 1000)
                    : ~~(new Date().getTime() / 1000);
            }
        }
    },

    created(){
        this.getCates();
        this.blog.created_at = ~~(new Date().getTime() / 1000);
    },

    mounted(){
        this.initEditor();
    },

    methods: {
        initEditor: function () {
            let toolbarContainer = [
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],

                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'direction': 'rtl' }],                         // text direction
                [{ 'indent': '-1'}, { 'indent': '+1' }],

                ['link'],
                ['image'],
                ['clean']                                         // remove formatting button
            ];
            let self = this;
            let toolbarOptions = {
                container: toolbarContainer,
                handlers: {
                    // handlers object will be merged with default handlers object
                    'image': function () {
                        self.imgAdding = true;
                        self.range = self.quill.getSelection();
                    }
                }
            }
            this.quill = new Quill('#editor', {
                theme: 'snow',
                modules: {
                    toolbar: toolbarOptions
                },
            });
        },
        getCates: async function () {
            let res = await cateList();
            if (res.ok) {
                this.cates = res.data;
                this.blog.cate_id = this.cates[0].id;
            }
        },
        create: async function () {
            this.blog.delta = JSON.stringify(this.quill.getContents().ops);
            this.blog.content = this.quill.container.firstChild.innerHTML;
            this.blog.updated_at = this.blog.created_at;
            this.blog.user_id = this.user.id;
            this.blog.thumb_img = 'thumb_img';
            let res = await blogCreate(this.blog);
            if (res.ok) {
                this.$router.go(-1);
            }

        },
        closeImgSelect: function () {
            this.imgAdding = false;
        },
        insertImg: function (url) {
            this.quill.insertEmbed(this.range.index, 'image', url, 'image');
        },

    }
}
</script>
<style>
    @import "https://cdn.quilljs.com/1.3.4/quill.snow.css";
</style>
<style scoped>
    .box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    h5 {
        margin-bottom: 5px;
    }
    .input {
        margin-bottom: 5px;
    }
    .short {
        width: 100%;
        height: 30px;
        max-width: 200px;
        margin-top: 10px;
    }
    #editor {
        flex: 1;
    }
</style>