<template>
  <div>
    <!-- 文章 -->
    <article class="container container-index post" v-for="(item, index) in article" :key="index" v-if="item.show">
      <router-link :to="{path:'/article', query:{id: item.id}}" class="entry-link">
        <header :style="{backgroundImage: 'url('+item.path+')'}">
          <h2>{{item.title}}</h2>
          <span>
            <time>{{item.date}}</time>
          </span>
        </header>
      </router-link>
    </article>
    <!-- 分页 -->
    <nav id="pagination-wrapper" class="container">
      <hr/>
      <ul class="pager" id="pager">
        <li class="pager-prev text-left">
          <a class="page-link float-left" href="#" @click="pagerPrev" v-show="prev">上一页</a>
        </li>
        <li class="pager-next text-right">
          <a class="page-link float-right" href="#" @click="pagerNext" v-show="next">下一页</a>
        </li>
      </ul>
      <hr/>
    </nav>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'home',
  props: [''],
  data () {
    return {
      article: [],
      index: 1,
      // 每页显示条数
      size: 6,
      // 文章总数
      length: Number,
      prev: false,
      next: true
    }
  },

  components: {},

  computed: {},

  beforeMount () {},

  mounted () {
    this.axios()
    debugger
    this.$nextTick(() => {
      $('#opts a').eq(0).sublings().children('.opt').removeClass('active')
      $('#opts a').eq(0).children('.opt').addClass('active')
    })
  },

  methods: {
    axios () {
      let _this = this
      let arr = []
      // axios 服务
      this.$axios(this.HOST + '/list')
        .then(res => {
          for (let i = 0, l = res.data.length; i < l; i++) {
            arr.push({
              id: res.data[i]._id,
              title: res.data[i].title,
              date: res.data[i].date,
              path: _this.HOST + res.data[i].path,
              show: true
            })
          }
          _this.article = arr
          _this.pager()
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 上一页
    pagerPrev () {
      this.index--
      (this.index < 1) && (this.index = 1)
      this.pager()
    },
    // 下一页
    pagerNext () {
      this.index++
      if (this.index > this.total) {
        return false
      }
      this.pager()
    },
    // 分页
    pager () {
      if (this.index > 1) {
        this.prev = true
      } else if (this.index === 1) {
        this.prev = false
      }
      if (this.index === this.total) {
        this.next = false
      } else if (this.index < this.total) {
        this.next = true
      }
      this.length = this.article.length
      this.total = Math.ceil(this.length / this.size)
      // 开始条目
      let start = (this.index - 1) * this.size
      // 结束条目
      let end = this.index * this.size
      // 最后一页的特殊情况
      end = (end > this.length) ? this.length : end
      for (let i = 0, l = this.length; i < l; i++) {
        if (i >= start && i < end) {
          this.article[i].show = true
        } else {
          this.article[i].show = false
        }
      }
    }
  },

  watch: {}
}
</script>

<style lang='scss' scoped>
</style>
