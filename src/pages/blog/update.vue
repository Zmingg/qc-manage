<template>
    <div class="box">
        <h5>Blog Update</h5>

        <el-input class="input" v-model="blog.title" placeholder="请输入标题">
            <i slot="suffix" class="el-input__icon">文章标题&nbsp</i>
        </el-input>


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

        <el-button class="short" @click="update">确认更新</el-button>

    </div>
</template>
<script>
import { blogDetail, blogUpdate } from '../../api/blog';
import Quill from 'quill';
export default {
    data(){
        return {
            blog: {},
        }
    },

    computed: {
        datetime: {
            get(){
                return new Date(this.blog.created_at * 1000);
            },
            set(val){
                this.blog.created_at = val.getTime() / 1000;
            }
        }
    },

    created(){
        this.getDetail();
    },

    methods: {
        initEditor: function () {
            let toolbarOptions = [
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

                ['image'],
                ['clean']                                         // remove formatting button
            ];
            this.quill = new Quill('#editor', {
                theme: 'snow',
                modules: {
                    toolbar: toolbarOptions
                },
            });
            this.quill.setContents(JSON.parse(this.blog.delta));
        },
        getDetail: async function () {
            let res = await blogDetail(this.$route.params.id);
            if (res.ok) {
                this.blog = res.data;
                this.$nextTick(function () {
                    this.initEditor();
                })
            }
        },
        update: async function () {
            this.blog.delta = JSON.stringify(this.quill.getContents().ops);
            if (~~this.blog.id === 77) {
                let res = await blogUpdate(this.blog);
                console.log(res);
            }

        }
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