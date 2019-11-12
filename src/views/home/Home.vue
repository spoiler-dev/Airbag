<template>
  <div>
    <!-- 文章 -->
    <article class="container container-index post" v-for="(item, index) in article" :key="index" v-if="item.show">
      <router-link :to="{path:'/app/article', query:{id: item.id}}" class="entry-link">
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
/* eslint-disable */
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
      total: Number,
      prev: false,
      next: true
    }
  },

  components: {},

  computed: {},

  beforeMount () {},

  mounted () {
    this.axios()
    this.$nextTick(() => {
      $('#opts a').eq(0).siblings().children('.opt').removeClass('active')
      $('#opts a').eq(0).children('.opt').addClass('active')
    })
  },

  methods: {
    axios () {
      let _this = this
      let postData = this.$qs.stringify({
        size: this.size,
        index: this.index - 1
      })
      let arr = []
      // axios 服务
      this.$axios({
        method: 'post',
        url: this.HOST + '/list',
        data: postData
      })
        .then(res => {
          debugger
          let l = res.data.length - 1
          for (let i = 0; i < l ; i++) {
            arr.push({
              id: res.data[i]._id,
              title: res.data[i].title,
              date: res.data[i].date,
              path: res.data[i].path,
              show: true
            })
          }
          _this.total = res.data[l][0].total
          _this.article = arr
          _this.pager()
          // console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 上一页
    pagerPrev () {
      this.index--
      if (this.index <= 1) {
        this.pager()
      }
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
      if (this.total <= this.size) {
        this.next = false
      } else {
        this.next = true
      }
    }
  },

  watch: {}
}
</script>

<style lang='scss' scoped>
</style>
