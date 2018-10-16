<template>
  <div>
    <article class="container container-index post entry" v-for="(item, index) in article" :key="index">
      <a href="">
        <header :style="{backgroundImage: 'url('+item.img+')'}">
          <h2>{{item.title}}</h2>
          <span>
            <time>{{item.date}}</time>
          </span>
        </header>
      </a>
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
