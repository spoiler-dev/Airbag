<template>
  <div>
    <div class="container post" id="login">
      <h4 class="login-title">🎏 欢迎来到我的博客</h4>
      <el-form ref="form" :model="form" label-width="90px" label-position="top">
        <el-form-item label="用户名：">
          <el-input v-model="form.name">
            <i slot="prefix" class="el-input__icon el-icon-caret-right"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input type="password" v-model="form.password">
            <i slot="prefix" class="el-input__icon el-icon-caret-right"></i>
          </el-input>
        </el-form-item>
        <el-button @click="onSubmit" id="submit">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: '',
  props: [''],
  data () {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },

  components: {},

  computed: {},

  beforeMount () {},

  mounted () {
    this.$nextTick(() => {
      $('#opts a').eq(3).siblings().children('.opt').removeClass('active')
      $('#opts a').eq(3).children('.opt').addClass('active')
    })
  },

  methods: {
    onSubmit () {
      let _this = this
      let postData = this.$qs.stringify({
        name: this.form.name,
        password: this.form.password
      })
      this.$axios({
        method: 'post',
        url: this.HOST + '/login',
        data: postData
      })
        .then(res => {
          if (res.data.access) {
            _this.$message({
              showClose: true,
              message: '登录成功!',
              type: 'success',
              center: true
            })
            _this.$store.state.access = true
            _this.$router.push({
              name: 'martix'
            })
          } else {
            _this.$message({
              showClose: true,
              message: '无访问权限!',
              type: 'error',
              center: true
            })
            _this.$store.state.access = false
          }
          // console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  watch: {}
}
</script>

<style lang='scss' scoped>
@import './style.scss';
</style>

<style scoped>
#login >>> .el-form-item__label {
  float: left !important;
  color: #b2b2b2 !important;
  margin: 0 !important;
  padding: 0 !important;
  line-height: 20px !important;
}

#login >>> .el-input__inner {
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  border-bottom: 1px solid #cccccc !important;
  border-radius: 0 !important;
  color: #4c4c4c !important;
  font-weight: 600 !important;
}

#login >>> .el-button:focus {
  outline: 0;
}
</style>
