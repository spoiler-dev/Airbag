<template>
  <div>
    <div>
      <!-- 导航栏 -->
      <nav class="navbar navbar-expand-lg navbar-dark" id="navbar">
        <router-link to='/app/login' class="navbar-brand nav-collapse">
          <img src="/img/logo64.png" width="36" height="36" class="d-inline-block align-top" alt="澈澈" id="ace">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to='/app/index' class="nav-link nav-collapse">
                主页
              </router-link>
            </li>
            <li class="nav-item active">
              <router-link to='/app/works' class="nav-link nav-collapse">
                个人作品
              </router-link>
            </li>
            <li class="nav-item active">
              <router-link to='/app/resume' class="nav-link nav-collapse">
                个人简历
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://github.com/spoiler-dev">GitHub</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://segmentfault.com/u/spoiler_dev">SegmentFault</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="javascript:;" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                更多
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="https://weibo.com/u/3308253417">微博 @澈澈kele</a>
                <a class="dropdown-item" href="#">微信 @方正</a>
                <a class="dropdown-item" href="https://ti.qq.com/open_qq/index2.html?url=mqqapi%3a%2f%2fuserprofile%2ffriend_profile_card%3fsrc_type%3dweb%26version%3d1.0%26source%3d2%26uin%3d819937377">企鹅 @819937377</a>
                <div class="dropdown-divider"></div>
                <router-link to='/app/martix' class="dropdown-item nav-collapse">工作台</router-link>
                <router-link to='/app/thanks' class="dropdown-item nav-collapse">致谢</router-link>
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
          <h1 class="intro-title" id="intro-title">澈 澈</h1>
          <span class="intro-meta" id="intro-meta">因为在奔跑 / 所以耳边有风</span>
        </div>
      </header>
      <!-- 主页面 -->
      <main id="content">
        <router-view />
      </main>
      <!-- 页脚 -->
      <footer class="container" id="footer-wrapper">
        <embed src="/img/spoiler.svg" id="spoilerSVG" width="128" height="128" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
        <div class="footer-meta">
          <div>
            <p>
              &copy; {{year}} 方正
              <br>
              <small class="text-muted">蒙ICP备19005362号</small>
            </p>
          </div>
          <div class="text-75">
            <a href="https://creativecommons.org/licenses/by-nc-nd/4.0" target="_blank">
              <img src="/img/by-nc-nd.svg" width="76" height="16" title="Creative Commons「署名 - 非商业性使用 - 禁止演绎 4.0」许可协议"/>
            </a>
          </div>
        </div>
      </footer>
      <!-- 移动端底部操作栏 -->
      <div id="opts">
        <router-link to='/app/index' class="tab nav-collapse">
          <div class="opt">
            <i class="iconfont icon-explorefill nav-collapse"></i>
            <!-- <span>主页</span> -->
          </div>
        </router-link>
        <router-link to='/app/works' class="tab nav-collapse">
          <div class="opt">
            <i class="iconfont icon-creativefill"></i>
            <!-- <span>仓库</span> -->
          </div>
        </router-link>
        <router-link to='/app/resume' class="tab nav-collapse">
          <div class="opt">
            <i class="iconfont icon-selectionfill"></i>
            <!-- <span>简历</span> -->
          </div>
        </router-link>
        <router-link to='/app/martix' class="tab nav-collapse">
          <div class="opt">
            <i class="iconfont icon-profilefill"></i>
            <!-- <span>工作台</span> -->
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  name: 'index',
  props: [''],
  data () {
    return {
      year: new Date().getFullYear()
    }
  },

  components: {
  },

  computed: {},

  beforeMount () {},

  mounted () {
    $('.dropdown-toggle').dropdown()
    // 点击导航链接之后，把导航选项折叠起来
    $('.nav-collapse').click(function () {
      $('#navbarSupportedContent').collapse('hide')
    })
    $(window).scroll(function () {
      // 小屏幕下的导航条折叠
      if ($(window).width() < 768) {
        // 滚动屏幕时，把导航选项折叠起来
        $(window).scroll(function () {
          $('#navbarSupportedContent').collapse('hide')
        })
      }
    })
    window.onscroll = () => {
      // let top = document.body.scrollTop
      if ($('html').scrollTop() > ($('#navbar').height() + 50) || $('body').scrollTop() > ($('#navbar').height() + 50)) {
        $('#navbar').addClass('scroll')
        $('#navbar').removeClass('navbar-dark').addClass('navbar-light')
      } else {
        $('#navbar').removeClass('scroll')
        $('#navbar').removeClass('navbar-light').addClass('navbar-dark')
      }
    }
  },

  methods: {},

  watch: {}
}
</script>

<style lang='scss'>
  @import './style.scss';
</style>
