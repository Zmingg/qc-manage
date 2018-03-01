<template>
    <div>
        <el-button class="button" type="success" size="mini" @click="handleCreate">新增歌单</el-button>
        <div class="list-table" v-if="state===''">
            <el-table
                    :data="lists"
                    style="width: 100%"
                    :cell-style="{fontSize:'15px'}"
                    size="small"
                    :default-sort = "{prop: 'lid', order: 'descending'}">
                <el-table-column
                        prop="title"
                        label="标题"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="tags"
                        label="标签">
                    <template slot-scope="scope" v-if="scope.row.tags!==''">
                        <el-tag class="tag" type="info" size="mini"
                                v-for="tag,index in scope.row.tags.split(',')" :key="index">
                            {{ tag }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="count"
                        label="播放"
                        align="center"
                        sortable >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        align="center"
                        width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination"
                    layout="prev, pager, next"
                    :current-page="curpage"
                    @current-change="getListPage"
                    :total="total">
            </el-pagination>
        </div>
        <list-form :data="list"
                   :state="state"
                   :close="reset">
        </list-form>
    </div>
</template>
<script>
import Api from '../../api/music/music';
import ListForm from '../../components/music/list-form.vue';
export default {
    components: {
        ListForm
    },
    data(){
        return {
            lists: [],
            curpage: 1,
            pages: 0,
            hasmore: false,
            total: 0,
            state: '',
            list: {}
        }
    },

    created(){
        this.getListPage();
    },

    methods: {
        async getListPage (page) {
            this.curpage = page;
            let res = await Api.list.page(this.curpage);
            if (res.ok) {
                this.lists = res.data.lists;
                this.pages = res.data.pages;
                this.hasmore = res.data.hasmore;
                this.total = res.data.total;
            }
        },
        handleEdit (list) {
            this.list = list;
            this.state = 'edit';
        },
        handleCreate () {
            this.list = {
                img: 'image/default',
                aids: ''
            };
            this.state = 'create';
        },
        reset () {
            this.state = '';
            this.getListPage();
        }
    }
}
</script>
<style scoped>
.list-table {
    max-width: 600px;
    width: 100%;
}
.pagination {
    text-align: center;
}
.tag {
    margin-right: 5px;
}
.button {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>