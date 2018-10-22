<template>
  <div>
    <div class="container post" v-html="html">
      123
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: [''],
  data () {
    return {
      markdown: '',
      html: ''
    }
  },

  components: {},

  computed: {},

  beforeMount () {},

  mounted () {
    this.init()
  },

  methods: {
    init () {
      debugger
      let hljs = require('highlight.js')
      let md = require('markdown-it')()
      let _this = this
      this.$axios(this.HOST + '/markdown', {
        params: {
          id: this.$route.query.id
        }
      })
        .then(res => {
          debugger
          _this.markdown = res.data[0].markdown
          _this.html = md.render(_this.markdown)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  watch: {}

}

</script>
<style lang='' scoped>

</style>
