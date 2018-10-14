<template>
  <div>
    <el-container>
      <el-header id="intro-wrapper" height="400px">
        <vue-particles
          color="#fff"
          :particleOpacity="0.7"
          :particlesNumber="60"
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
      </el-header>
      <el-main>
        <article></article>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import $ from 'jquery'
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

  mounted() {
    $(function () {
      alert("成功");
    })
  },

  methods: {},

  watch: {}
}
</script>
<style lang='' scoped>

</style>

<style>
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, button, textarea, p, blockquote, th, td {
    padding: 0;
    margin: 0;
  }

  body {
    overflow: auto;
  }

  #navbar {
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  #navbar a:not(.dropdown-item) {
    color: #fff;
    text-decoration: none;
    -webkit-transition: color 0.25s ease;
    -moz-transition: color 0.25s ease;
    -ms-transition: color 0.25s ease;
    transition: color 0.25s ease;
  }
  #particles-js {
    width: 100%;
    height: 100%;
  }
  /*设置粒子动态背景*/
  #intro-wrapper {
    position: relative;
    top: 0;
    left: 0;
    background: gray;
  }

  #intro-wrapper {
    background-image: linear-gradient(rgba(0, 0, 0, .85), rgba(0, 0, 0, .75));
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    /* 背景是否移动  */
    background-attachment: scroll;
  }
</style>
