<template>
  <div>
    <div id="view"></div>
  </div>
</template>

<script>
debugger
const THREE = require('three')
import OrbitControls from 'three/examples/js/controls/OrbitControls'
// import dat from './three/examples/libs/dat.gui.min.js'
// import dat from 'dat.gui'
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
    debugger
  },

  methods: {},

  watch: {}

}

</script>

<style lang='scss' scoped>
/* @import './static/css/index.css'; */

#view {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  canvas {
    display: block;
  }
}

</style>
