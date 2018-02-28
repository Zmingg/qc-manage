<template>
    <div class="box">
        <h5>Blog Update</h5>

        <el-input size="small" class="input" v-model="blog.title" placeholder="请输入标题">
            <i slot="suffix" class="el-input__icon">文章标题&nbsp</i>
        </el-input>

        <el-select size="small" v-model="blog.cate_id" placeholder="请选择类别" class="input">
            <el-option
                    v-for="cate in cates"
                    :key="cate.id"
                    :label="cate.name"
                    :value="cate.id">
                <span style="float: left">{{ cate.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ cate.alias }}</span>
            </el-option>
        </el-select>

        <el-input size="small" class="input" v-model="blog.tags">
            <i slot="suffix" class="el-input__icon">标签 ( 以 , 隔开 )</i>
        </el-input>

        <el-date-picker size="small" class="input"
                        v-model="datetime"
                        type="datetime"
                        placeholder="选择日期">
        </el-date-picker>

        <el-input size="small" class="input" disabled v-model="blog.thumb_img">
            <el-button slot="append" @click="thumbPreview">查看缩略图</el-button>
            <el-button slot="append" id="thumb">重新上传</el-button>
        </el-input>

        <el-input size="small" class="input-full"
                type="textarea"
                :rows="2"
                placeholder="暂无摘要内容"
                v-model="blog.abstract">
        </el-input>

        <div id="editor"></div>

        <el-button size="small" class="short" @click="update">确认更新</el-button>

        <img-select v-show="imgAdding" @close="closeImgSelect" @insert="insertImg"></img-select>

        <thumb-preview ref="thumb"></thumb-preview>

    </div>
</template>
<script>
import { blogDetail, blogUpdate } from '../../api/blog';
import { cateList } from '../../api/cate';
import { domain, uploader } from '../../api/qiniu';
import Quill from 'quill';
import ImgSelect from '../../components/blog/img-select.vue';
import ThumbPreview from '../../components/blog/thumb-preview.vue';
import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
export default {
    components: {
        ElInput,
        ElButton,
        ImgSelect,
        ThumbPreview
    },
    data(){
        return {
            blog: {},
            cates: [],
            imgAdding: false,
            range: {},
        }
    },

    computed: {
        datetime: {
            get(){
                return new Date(this.blog.created_at * 1000);
            },
            set(val){
                this.blog.created_at = val
                    ? val.getTime() / 1000
                    : new Date().getTime() / 1000;

            }
        }
    },

    created(){
        this.getDetail();
        this.getCates();
    },

    mounted(){
        let thumb = uploader('thumb','thumb');
        thumb.bind('FileUploaded',(up, file, info)=>{
            let res = JSON.parse(info.response);
            this.blog.thumb_img = res.key;
        });
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
            this.quill.clipboard.dangerouslyPasteHTML(this.blog.content);
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
        getCates: async function () {
            let res = await cateList();
            if (res.ok) {
                this.cates = res.data;
            }
        },
        update: async function () {
            this.blog.content = this.quill.container.firstChild.innerHTML;
            let res = await blogUpdate(this.blog);
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
        thumbPreview: function () {
            this.$refs.thumb.$emit('open', domain + this.blog.thumb_img);
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
    overflow-y: auto;
}
h5 {
    margin-bottom: 5px;
}
.input {
    margin-bottom: 5px;
    width: 100%;
    max-width: 500px;
}
.input-full {
    margin-bottom: 5px;
    width: 100%;
}
.short {
    display: block;
    width: 100%;
    max-width: 200px;
    margin: 10px auto;
}
#editor {
    flex: 1;
    min-height: 200px;
}
</style>