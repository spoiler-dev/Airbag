<template>
  <div>
    <div class="container post container-index">
      <div class="entry-content" v-html="html" ></div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/atom-one-dark.css'
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
      let hljs = require('highlight.js')
      // Actual default values
      let md = require('markdown-it')({
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>'
            } catch (__) {}
          }
          return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
        }
      })
      let _this = this
      this.$axios(this.HOST + '/markdown', {
        params: {
          id: this.$route.query.id
        }
      })
        .then(res => {
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

<style lang="scss" scoped>
@import './style.scss';
</style>

