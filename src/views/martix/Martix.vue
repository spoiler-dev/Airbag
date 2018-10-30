<template>
  <div>
    <div class="container post">
      <el-tabs type="border-card">
        <el-tab-pane :lazy=true>
          <span slot="label"><i class="el-icon-menu"></i> 文章中心</span>
          <!-- 文章中心 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="日期">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="标题">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>标题: {{ scope.row.title }}</p>
                  <p>主题图片: {{ scope.row.path }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.title }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="主题图片">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>标题: {{ scope.row.title }}</p>
                  <p>主题图片: {{ scope.row.path }}</p>
                </el-popover>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.path }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 弹窗 -->
        <el-dialog title="内容编辑" :visible.sync="dialogFormVisible" width="40%" center>
          <el-form :model="formEdit" label-width="90px">
            <el-form-item label="文章标题：">
              <el-input v-model="formEdit.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="文章标题：">
              <el-input v-model="formEdit.title"></el-input>
            </el-form-item>
            <el-form-item label="发布日期：">
              <el-date-picker type="date" placeholder="选择日期" v-model="formEdit.date" style="width: 100%;" format="yyyy 年 MM 月 dd 日" value-format="yyyy 年 MM 月 dd 日"></el-date-picker>
            </el-form-item>
            <el-form-item label="图片：" id="path">
              <el-input type="text" v-model="formEdit.path"></el-input>
            </el-form-item>
            <el-form-item label="Markdown：" id="markdown">
              <el-input type="textarea" v-model="formEdit.markdown"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleUpdate">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 工作台 -->
        <el-tab-pane :lazy=true>
          <span slot="label"><i class="el-icon-edit"></i> 发布</span>
          <el-form ref="form" :model="form" label-width="90px">
            <el-form-item label="文章标题：">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="发布日期：">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;" format="yyyy 年 MM 月 dd 日" value-format="yyyy 年 MM 月 dd 日"></el-date-picker>
            </el-form-item>
            <!-- 上传图片 -->
            <el-form-item label="主题图片：">
              <el-upload
                :action="action"
                class="upload-demo"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList2"
                list-type="picture"
                name="file"
                ref="handleUpload"
                :on-success="success">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              </el-form-item>
            <el-form-item label="图片：" id="path">
              <el-input type="text" v-model="form.path"></el-input>
            </el-form-item>
            <el-form-item label="Markdown：" id="markdown">
              <el-input type="textarea" v-model="form.markdown"></el-input>
            </el-form-item>
            <p id="submit">
              <el-button type="primary" size="medium" round @click="handleSubmit">立即创建</el-button>
            </p>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: [''],
  data () {
    return {
      dialogFormVisible: false,
      form: {
        title: '',
        markdown: '',
        date: '',
        path: ''
      },
      formEdit: {
        id: '',
        title: '',
        markdown: '',
        date: '',
        path: ''
      },
      action: this.HOST + '/upload',
      tableData: [],
      fileList2: []
    }
  },

  components: {},

  computed: {},

  beforeMount () {},

  mounted () {
    this.init()
    this.$nextTick(() => {
      $('#opts a').eq(3).siblings().children('.opt').removeClass('active')
      $('#opts a').eq(3).children('.opt').addClass('active')
    })
  },

  methods: {
    init () {
      let _this = this
      let arr = []
      this.$axios(this.HOST + '/list')
        .then(res => {
          for (let i = 0, l = res.data.length; i < l; i++) {
            arr.push({
              date: res.data[i].date,
              title: res.data[i].title,
              path: res.data[i].path,
              id: res.data[i]._id
            })
          }
          _this.tableData = arr
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleEdit (index, row) {
      let _this = this
      this.$axios(this.HOST + '/markdown', {
        params: {
          id: row.id
        }
      })
        .then(res => {
          _this.formEdit = {
            id: res.data[0]._id,
            date: res.data[0].date,
            title: res.data[0].title,
            path: res.data[0].path,
            markdown: res.data[0].markdown
          }
          _this.dialogFormVisible = true
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
      console.log(index, row)
    },
    handleDelete (index, row) {
      let _this = this
      this.$axios(this.HOST + '/del', {
        params: {
          id: row.id
        }
      })
        .then(res => {
          _this.$message({
            showClose: true,
            message: '删除成功!',
            type: 'success',
            center: true
          })
          _this.init()
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
      console.log(index, row)
    },
    // 文章新增
    handleSubmit () {
      let _this = this
      // axios 服务
      this.$axios(this.HOST + '/add', {
        params: {
          title: this.form.title,
          date: this.form.date,
          markdown: this.form.markdown,
          path: this.form.path
        }
      })
        .then(res => {
          _this.$message({
            message: '文章发布成功!',
            type: 'success'
          })
          _this.$router.push({
            name: 'home'
          })
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    // 上传图片
    handleUpload (param) {
      let formData = new FormData()
      let file = param.file
      let headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } }
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file)
      this.$axios.post(this.HOST + '/upload', formData, headerConfig).then(res => {
        console.log(res)
      })
    },
    success (response, file, fileList) {
      this.form.path = response.path
    },
    // 编辑文章
    handleUpdate () {
      let _this = this
      this.$axios(this.HOST + '/update', {
        params: {
          id: this.formEdit.id,
          title: this.formEdit.title,
          date: this.formEdit.date,
          markdown: this.formEdit.markdown,
          path: this.formEdit.path
        }
      })
        .then(res => {
          _this.$message({
            message: '文章修改成功!',
            type: 'success'
          })
          _this.dialogFormVisible = false
          _this.init()
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  watch: {}

}
</script>
<style scoped>
  .el-upload__input {
    display: none;
  }
  #markdown >>> textarea{
    min-height: 300px !important;
  }
  #submit {
    text-align: center;
  }
  @media only screen and (max-width: 570px){
    .el-button+.el-button {
      margin-left: 0px;
    }

    .container.post >>> .el-dialog {
      width: 100% !important;
    }

  }
</style>
