<template>
  <div>
    <div class="entry-content" v-html="markdown">
      123
    </div>
  </div>
</template>

<script>
debugger
export default {
  name: '',
  props: [''],
  data () {
    return {
      markdown: ''
    }
  },

  components: {},

  computed: {},

  beforeMount () {},

  mounted () {
    var hljs = require('highlight.js')
    var md = require('markdown-it')()
    this.markdown = md.render('# markdown-it rulezz!')
  },

  methods: {},

  watch: {}

}

</script>
<style lang='' scoped>

</style>
