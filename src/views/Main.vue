<template>
  <div>
    <el-container>
      <!-- 导航栏 -->
      <nav class="navbar navbar-expand-lg navbar-light" id="navbar">
        <a class="navbar-brand" href="#">
          <img src="/img/logo36.png" width="36" height="36" class="d-inline-block align-top" alt="澈澈" id="ace">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <router-link to='/index'>
              <li class="nav-item active">
                <a class="nav-link" href="#">主页</a>
              </li>
            </router-link>
            <router-link to='/works'>
            <li class="nav-item active">
              <a class="nav-link" href="#">个人作品</a>
            </li>
            </router-link>
            <router-link to='/resume'>
              <li class="nav-item">
                <a class="nav-link" href="#">个人简历</a>
              </li>
            </router-link>
            <li class="nav-item">
              <a class="nav-link" href="https://github.com/spolier">GitHub</a>
            </li>
            </router-link>
            <li class="nav-item">
              <a class="nav-link" href="https://segmentfault.com/u/spolier">SegmentFault</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                更多
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
      <header id="intro-wrapper">
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
      </header>
      <!-- 主页面 -->
      <main id="content">
        <keep-alive>
          <router-view />
        </keep-alive>
      </main>
      <!-- 分页 -->
      <!-- 页脚 -->
      <footer class="container" id="footer-wrapper">
        <embed src="/img/spolier.svg" id="spolierSVG" width="128" height="128" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
        <div class="footer-meta">
          <div>
            <p>
              &copy; {{year}} 方正
              <br>
              <small class="text-muted">Hosted by <a href="https://pages.coding.me">Coding Pages</a></small>
            </p>
          </div>
          <div class="text-75">
            <a href="https://creativecommons.org/licenses/by-nc-nd/4.0" target="_blank">
              <img src="/img/by-nc-nd.svg" width="76" height="16" title="Creative Commons「署名 - 非商业性使用 - 禁止演绎 4.0」许可协议"/>
            </a>
          </div>
        </div>
      </footer>
    </el-container>
  </div>
</template>

<script>
import Home from './home/Home'
export default {
  name: 'index',
  props: [''],
  data () {
    return {
      year: new Date().getFullYear()
    }
  },

  components: {
    Home
  },

  computed: {},

  beforeMount () {},

  mounted () {
  },

  methods: {},

  watch: {}
}
</script>

<style lang='scss'>
  @import './style.scss';
</style>
