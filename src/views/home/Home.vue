<template>
  <div>
    <article class="container container-index post" v-for="(item, index) in article" :key="index">
      <router-link to="/article">
        <header :style="{backgroundImage: 'url('+item.img+')'}">
          <h2>{{item.title}}</h2>
          <span>
            <time>{{item.date}}</time>
          </span>
        </header>
      </router-link>
    </article>
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
          img: '//ohp0uzlic.qnssl.com/site/intro-images/2017-05-12-zhihu-live-2.jpg'
        },
        {
          title: '1',
          date: '2018',
          img: '//ohp0uzlic.qnssl.com/site/intro-images/2017-05-12-zhihu-live-2.jpg'
        },
        {
          title: '1',
          date: '2018',
          img: '//ohp0uzlic.qnssl.com/site/intro-images/2017-05-12-zhihu-live-2.jpg'
        },
        {
          title: '1',
          date: '2018',
          img: '//ohp0uzlic.qnssl.com/site/intro-images/2017-05-12-zhihu-live-2.jpg'
        }
      ]
    }
  },

  components: {},

  computed: {},

  beforeMount () {},

  mounted () {
  },

  methods: {},

  watch: {}
}
</script>

<style lang='scss' scoped>
</style>
