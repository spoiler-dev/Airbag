<template>
  <div>
    <p class="project-en">PROJECT</p>
    <p class="project-line"></p>
    <P class="project-cn">作品展览</P>
    <div id="works" class="container post">
      <div class="work-card">
        <router-link to="/3DElectricalRoom">
        <div class="card-top">
          <div class="banner img-up" style="background: url('/img/works/Data.jpg')">
            <div class="banner-label">
              <label>Three.js</label>
              <label>Vue</label>
            </div>
          </div>
          <div class="banner img-mid" style="background: url('img/works/Data.jpg')"></div>
          <div class="banner img-down" style="background: url('img/works/Data.jpg')"></div>
        </div>
        <div class="card-content">
          <h3 class="card-name">3D 电气室自定义规划系统</h3>
          <p class="card-desc">原生 Javascript 拖拽平面模块，利用 Three.js 打造的 3D 电气室</p>
        </div>
        </router-link>
      </div>

      <div class="work-card">
        <div class="card-top">
          <div class="banner img-up" style="background: url('/img/works/Data.jpg')">
            <div class="banner-label">
              <label>Three.js</label>
              <label>Vue</label>
            </div>
          </div>
          <div class="banner img-mid" style="background: url('img/works/Data.jpg')"></div>
          <div class="banner img-down" style="background: url('img/works/Data.jpg')"></div>
        </div>
        <div class="card-content">
          <h3 class="card-name">3D 电气室自定义规划系统</h3>
          <p class="card-desc">原生 Javascript 拖拽平面模块，利用 Three.js 打造的 3D 电气室</p>
        </div>
      </div>
      <div class="work-card">
        <div class="card-top">
          <div class="banner img-up" style="background: url('/img/works/Data.jpg')">
            <div class="banner-label">
              <label>Three.js</label>
              <label>Vue</label>
            </div>
          </div>
          <div class="banner img-mid" style="background: url('img/works/Data.jpg')"></div>
          <div class="banner img-down" style="background: url('img/works/Data.jpg')"></div>
        </div>
        <div class="card-content">
          <h3 class="card-name">3D 电气室自定义规划系统</h3>
          <p class="card-desc">原生 Javascript 拖拽平面模块，利用 Three.js 打造的 3D 电气室</p>
        </div>
      </div>
      <div class="work-card">
        <div class="card-top">
          <div class="banner img-up" style="background: url('/img/works/Data.jpg')">
            <div class="banner-label">
              <label>Three.js</label>
              <label>Vue</label>
            </div>
          </div>
          <div class="banner img-mid" style="background: url('img/works/Data.jpg')"></div>
          <div class="banner img-down" style="background: url('img/works/Data.jpg')"></div>
        </div>
        <div class="card-content">
          <h3 class="card-name">3D 电气室自定义规划系统</h3>
          <p class="card-desc">原生 Javascript 拖拽平面模块，利用 Three.js 打造的 3D 电气室</p>
        </div>
      </div>
      <div class="work-card">
        <div class="card-top">
          <div class="banner img-up" style="background: url('/img/works/Data.jpg')">
            <div class="banner-label">
              <label>Three.js</label>
              <label>Vue</label>
            </div>
          </div>
          <div class="banner img-mid" style="background: url('img/works/Data.jpg')"></div>
          <div class="banner img-down" style="background: url('img/works/Data.jpg')"></div>
        </div>
        <div class="card-content">
          <h3 class="card-name">3D 电气室自定义规划系统</h3>
          <p class="card-desc">原生 Javascript 拖拽平面模块，利用 Three.js 打造的 3D 电气室</p>
        </div>
      </div>
      <div class="work-card">
        <div class="card-top">
          <div class="banner img-up" style="background: url('/img/works/Data.jpg')">
            <div class="banner-label">
              <label>Three.js</label>
              <label>Vue</label>
            </div>
          </div>
          <div class="banner img-mid" style="background: url('img/works/Data.jpg')"></div>
          <div class="banner img-down" style="background: url('img/works/Data.jpg')"></div>
        </div>
        <div class="card-content">
          <h3 class="card-name">3D 电气室自定义规划系统</h3>
          <p class="card-desc">原生 Javascript 拖拽平面模块，利用 Three.js 打造的 3D 电气室</p>
        </div>
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
