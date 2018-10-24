<template>
  <div>
    <div class="container post container-index">
      <!-- markdown -->
      <div class="entry-content" v-html="html" ></div>
      <!-- Reward -->
      <p class="reward">
        <a tabindex="0" role="button" id="button-reward" class="btn btn-outline-danger" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-html="true" data-content="<img src='/img/EQ.JPG' width='135' height='135' title='赞赏'/>">
          赞赏
        </a>
      </p>
      <!-- Copyright -->
      <div class="meta meta-copyright">
        <h4>版权声明</h4>
        <p class="text-muted">
          <small>
            本文版权属于澈澈，并受法律保护。采用 Creative Commons「<a href="https://creativecommons.org/licenses/by-nc-nd/4.0" target="_blank">署名 - 非商业性使用 - 禁止演绎 4.0</a>」许可协议进行授权。
          </small>
        </p>
      </div>
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
      html: '',
      baseUrl: process.env.BASE_URL
    }
  },

  components: {},

  computed: {},

  beforeMount () {},

  mounted () {
    this.init()
    $('[data-toggle="popover"]').popover()
    this.$nextTick(() => {
      $('#opts a').eq(0).siblings().children('.opt').removeClass('active')
      $('#opts a').eq(0).children('.opt').addClass('active')
    })
  },

  methods: {
    init () {
      let hljs = require('highlight.js')
      // Actual default values
      let md = require('markdown-it')({
        html: true,
        linkify: true,
        typographer: true,
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
        .use(require('markdown-it-table-of-contents'), {
          includeLevel: [2, 3]
        })
        .use(require('markdown-it-toc-done-right'))
        .use(require('markdown-it-ins'))
        .use(require('markdown-it-abbr'))
        .use(require('markdown-it-sub'))
        .use(require('markdown-it-sup'))
        .use(require('markdown-it-container'))
        .use(require('markdown-it-emoji'))
        .use(require('markdown-it-small'))
        .use(require('markdown-it-footnote'))
        .use(require('markdown-it-checkbox'))
        .use(require('markdown-it-anchor'), {
          // permalink: true,
          // permalinkBefore: true,
          // permalinkSymbol: '§'
        })

      let _this = this
      this.$axios(this.HOST + '/markdown', {
        params: {
          id: this.$route.query.id
        }
      })
        .then(res => {
          _this.markdown = res.data[0].markdown
          $('#intro-title').text(res.data[0].title)
          $('#intro-meta').text(res.data[0].date)
          let path = _this.HOST + res.data[0].path
          $('#intro-wrapper').css({ 'background-image': 'url(' + path + ')' })
          _this.html = md.render(_this.markdown)
        })
        .catch(error => {
          console.log(error)
        })
    },
    restart () {
      $('#intro-title').text('澈澈')
      $('#intro-meta').text('因为在奔跑 / 所以耳边有风')
      $('#intro-wrapper').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.75))')
    }
  },

  watch: {},

  beforeDestroy () {
    this.restart()
  }

}

</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
