<template>
  <div>
    <div class="container post container-index">
      <p>今天，我必须得感谢你们：</p>
      <p class="thanks-inner">感谢我的女朋友 <strong>@小猫咪</strong> <br>一直支持我的工作和想法，让我写出最快乐的代码</p>
      <p class="thanks-inner">感谢我的兄弟 <strong>@冯伟东</strong> <br> 测试我的作品，一直默默倾听我的想法，为我提供最棒的灵感与支持</p>
      <p class="thanks-inner">感谢UI <strong>@张西红</strong> <br> 赠予我全尺寸版本的 LOGO，为我的网页界面提出最中肯的意见</p>
      <p class="thanks-inner">感谢前端 <strong>@雒小磊</strong> <br> 为我提供权限分配的知识，在生活中也是我最信赖的朋友</p>
      <p class="thanks-inner">感谢前端 <strong>@牛彤</strong> <br> 在 Vue Cli3 的配置过程中为我提供她宝贵的框架经验</p>
      <p class="thanks-inner">感谢后台 <strong>@张文宇</strong> <br> 为我耐心讲解图片上传服务器，再返回页面的整个流程</p>
      <p class="thanks-inner">感谢后台 <strong>@刘贤衡</strong> <br> 为我解答亚马逊云操作过程中公网 IP 无法访问的难题</p>
      <p class="thanks-inner">感谢测试 <strong>@闫晨煜</strong> <br> 为我提供答案之书的灵感</p>
      <p class="thanks-inner">感谢前同事 <strong>@司则刚、@马良、@张宏伟、@焉松旭、@李俊桐</strong> <br>是你们协助我完成 Spring MVC 版本</p>
      <p class="thanks-inner">感谢一直崇拜的 <strong>@高扬</strong> <br> 是他的优秀指引我搭建这个博客</p>
      <p class="thanks-inner">还要感谢提供给我想法的好多好多挚友</p>
      <p class="thanks-inner">感谢工作的这一年多让我学会享受孤独，让我学会承担责任，学会吃苦</p>
      <p class="thanks-inner">至此，我想对自己说 <br>永远保持谦虚，永远笃定自己</p>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  name: '',
  props: [''],
  data () {
    return {

    }
  },

  components: {},

  computed: {},

  beforeMount () {},

  mounted () {
    $('#intro-title').text('致谢')
    $('#intro-meta').text('2018年10月31日')
    $('#intro-wrapper').css('background-image', 'url(/img/We.JPG)')
  },

  methods: {
    restart () {
      $('#intro-title').text('澈澈')
      $('#intro-meta').text('因为在奔跑 / 所以耳边有风')
      $('#intro-wrapper').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.75))')
    }
  },

  watch: {},

  beforeDestroy () {
    this.restart()
  }

}

</script>
<style lang='scss' scoped>
  .thanks-inner {
    padding-left: 3rem;
  }
</style>
