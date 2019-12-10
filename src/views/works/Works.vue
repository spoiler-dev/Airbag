<template>
  <div>
    <p class="project-en">PROJECT</p>
    <p class="project-line"></p>
    <P class="project-cn">作品展览</P>
    <div id="works" class="container post">

      <div class="work-card">
        <router-link to="/ATM8600R">
          <div class="card-top">
            <div class="banner img-up" style="backgroundImage: url('https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/project/Project20.png')">
              <div class="banner-label">
                <label>Three.js</label>
                <label>Vue</label>
                <label>Blender 建模</label>
              </div>
            </div>
            <div class="banner img-mid" style="backgroundImage: url('https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/project/Project20.png')"></div>
            <div class="banner img-down" style="backgroundImage: url('https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/project/Project20.png')"></div>
          </div>
          <div class="card-content">
            <h3 class="card-name">自助设备监控管理系统</h3>
            <p class="card-desc">实现对 ATM、CRS 自助设备模块的实时监控管理</p>
          </div>
        </router-link>
      </div>

      <div class="work-card">
        <router-link to="/3DElectricalRoom">
          <div class="card-top">
            <div class="banner img-up" style="backgroundImage: url('https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/project/Project29.jpg')">
              <div class="banner-label">
                <label>Three.js</label>
                <label>Vue</label>
                <label>定时刷新</label>
              </div>
            </div>
            <div class="banner img-mid" style="backgroundImage: url('https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/project/Project29.jpg')"></div>
            <div class="banner img-down" style="backgroundImage: url('https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/project/Project29.jpg')"></div>
          </div>
          <div class="card-content">
            <h3 class="card-name">3D 电气室实时监控系统</h3>
            <p class="card-desc">结合 Vue 框架，利用 Three.js 打造的可定时刷新的 3D 电气室</p>
          </div>
        </router-link>
      </div>

      <div class="work-card">
        <router-link to="/3DElectricalRoomLayout">
          <div class="card-top">
            <div class="banner img-up" style="backgroundImage: url('https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/project/Project25.jpg')">
              <div class="banner-label">
                <label>Three.js</label>
                <label>Vue</label>
                <label>拖拽</label>
              </div>
            </div>
            <div class="banner img-mid" style="backgroundImage: url('https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/project/Project25.jpg')"></div>
            <div class="banner img-down" style="backgroundImage: url('https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/project/Project25.jpg')"></div>
          </div>
          <div class="card-content">
            <h3 class="card-name">3D 电气室自定义规划系统</h3>
            <p class="card-desc">原生 Javascript 拖拽平面模块，利用 Three.js 打造的 3D 电气室</p>
          </div>
        </router-link>
      </div>

      <div class="work-card">
        <router-link to="/AnswersBook">
          <div class="card-top">
            <div class="banner img-up" style="backgroundImage: url('https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/project/Project32.jpg')">
              <div class="banner-label">
                <label>Javascript</label>
                <label>CSS</label>
              </div>
            </div>
            <div class="banner img-mid" style="backgroundImage: url('https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/project/Project32.jpg')"></div>
            <div class="banner img-down" style="backgroundImage: url('https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/project/Project32.jpg')"></div>
          </div>
          <div class="card-content">
            <h3 class="card-name">答案之书</h3>
            <p class="card-desc">可自定义礼物清单，随机抽奖，解决你为七夕礼物发愁的烦恼！</p>
          </div>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
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
    this.$nextTick(() => {
      $('#opts a').eq(1).siblings().children('.opt').removeClass('active')
      $('#opts a').eq(1).children('.opt').addClass('active')
    })
  },

  methods: {},

  watch: {}

}
</script>
<style lang='scss' scoped>
  @import './style.scss';
</style>
