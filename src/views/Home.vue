<template>
  <div>
    <el-container>
      <!-- 导航栏 -->
      <nav class="navbar navbar-expand-lg navbar-light" id="navbar">
        <a class="navbar-brand" href="#">
          <img src="/img/logo36.png" width="36" height="36" class="d-inline-block align-top" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">个人作品</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">个人简历</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">GitHub</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">SegmentFault</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                联系我
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">微博 @spolier丶</a>
                <a class="dropdown-item" href="#">微信 @方正</a>
                <a class="dropdown-item" href="#">企鹅 @678477181</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">留言</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <el-header id="intro-wrapper">
        <vue-particles
          color="#fff"
          :particleOpacity="0.7"
          :particlesNumber="70"
          shapeType="circle"
          :particleSize="4"
          linesColor="#dedede"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.6"
          :linesDistance="150"
          :moveSpeed="2"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
        >
        </vue-particles>
        <div class="intro-heading">
          <h1 class="intro-title">澈 澈</h1>
          <span class="intro-meta">因为在奔跑 / 所以耳边有风</span>
        </div>
      </el-header>
      <el-main>
        <article></article>
      </el-main>
      <el-footer>
        <embed src="/img/spolier.svg" width="128" height="128" type="image/svg+xml"pluginspage="http://www.adobe.com/svg/viewer/install/" />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  name: 'home',
  props: [''],
  data () {
    return {

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
@import '../views/style.scss';
</style>
