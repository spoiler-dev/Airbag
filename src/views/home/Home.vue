<template>
  <div>
    <!-- 文章 -->
    <article class="container container-index post" v-for="(item, index) in article" :key="index" v-if="item.show">
      <router-link to="/article">
        <header :style="{backgroundImage: 'url('+item.img+')'}">
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
export default {
  name: 'home',
  props: [''],
  data () {
    return {
      article: [
        {
          title: '1',
          date: '2018',
          img: '//ohp0uzlic.qnssl.com/site/intro-images/2017-05-12-zhihu-live-2.jpg',
          show: true
        },
        {
          title: '1',
          date: '2018',
          img: '//ohp0uzlic.qnssl.com/site/intro-images/2017-05-12-zhihu-live-2.jpg',
          show: true
        },
        {
          title: '1',
          date: '2018',
          img: '//ohp0uzlic.qnssl.com/site/intro-images/2017-05-12-zhihu-live-2.jpg',
          show: true
        },
        {
          title: '1',
          date: '2018',
          img: '//ohp0uzlic.qnssl.com/site/intro-images/2017-05-12-zhihu-live-2.jpg',
          show: true
        }
        ,
        {
          title: '1',
          date: '2018',
          img: '//ohp0uzlic.qnssl.com/site/intro-images/2017-05-12-zhihu-live-2.jpg',
          show: true
        },
        {
          title: '1',
          date: '2018',
          img: '//ohp0uzlic.qnssl.com/site/intro-images/2017-05-12-zhihu-live-2.jpg',
          show: true
        }
        ,
        {
          title: '1',
          date: '2018',
          img: '//ohp0uzlic.qnssl.com/site/intro-images/2017-05-12-zhihu-live-2.jpg',
          show: true
        },
        {
          title: '1',
          date: '2018',
          img: '//ohp0uzlic.qnssl.com/site/intro-images/2017-05-12-zhihu-live-2.jpg',
          show: true
        }
      ],
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
    this.pager()
  },

  methods: {
    // 上一页
    pagerPrev () {
      this.index--
      (this.index < 1) && (this.index = 1);
      this.pager()
    },
    // 下一页
    pagerNext () {
      this.index++
      (this.index > this.total) && (this.index = this.total);
      this.pager()
    },
    pager () {
      (this.index > 1) && (this.prev = true);
      (this.index == 1) && (this.prev = false);
      (this.index == this.total) && (this.next = false);
      (this.index < this.total) && (this.next = true);
      this.length = this.article.length
      this.total = Math.ceil(this.length/this.size)
      let start = (this.index - 1) * this.size, // 开始条目
          end = this.index * this.size //结束条目
      end = (end > this.length) ? this.length : end //最后一页的特殊情况
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
