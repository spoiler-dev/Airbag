<template>
  <div>
    <div id="banner">
      <i class="el-icon-d-arrow-left" id="back">返回</i>
      <span>Eastcom-8600r 模型管理控制系统</span>
    </div>
    <div id="view">
      <div id="container">
        <div id="draw"></div>
        <p id="loading">加载中...</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Eastcom-8600r',
  props: [''],
  data () {
    return {
      three: null,
      renderer: null,
      scene: null,
      camera: null,
      stats: null,
      axesHelper: null,
      dracoLoader: null,
      loader: null,
      controls: null,
      width: null,
      height: null,
      cashBoxNum: 5
    }
  },

  components: {},

  computed: {},

  beforeMount () {
    console.log(
      [
        '    __     __',
        ' __/ __\\  / __\\__   ____   _____   _____',
        '/ __/  /\\/ /  /___\\/ ____\\/ _____\\/ _____\\',
        '\\/_   __/ /   _   / /  __/ / __  / / __  /_   __   _____',
        '/ /  / / /  / /  / /  / / /  ___/ /  ___/\\ _\\/ __\\/ _____\\',
        '\\/__/  \\/__/\\/__/\\/__/  \\/_____/\\/_____/\\/__/ /  / /  ___/',
        '                                         / __/  /  \\__  \\',
        '                                         \\/____/\\/_____/'
      ].join('\n')
    )
  },

  mounted () {
    this.width = document.getElementById('draw').offsetWidth
    this.height = document.getElementById('draw').offsetHeight
    this.checkSupport()
    let _this = this
    window.onresize = () => {
      // 调用methods中的事件
      _this.onWindowResize()
    }
  },

  methods: {
    // WebGL兼容性检查
    checkSupport () {
      if (THREE.WEBGL.isWebGLAvailable()) {
        // Initiate function or other initializations here
        this.init()
      } else {
        let warning = THREE.WEBGL.getWebGLErrorMessage()
        document.getElementById('container').appendChild(warning)
      }
    },
    // 初始化
    init () {
      this.initGui()
      this.initRender()
      this.initScene()
      this.initCamera()
      this.initLight()
      this.initModel()
      this.initControls()
      this.initStats()
      this.animate()
      this.onWindowResize()
    },
    // 初始化 dat.GUI 简化试验流程
    initGui () {
      let _this = this
      // 声明一个保存需求修改的相关数据的对象
      this.gui = {
        自动旋转: true,
        打开柜门: function () {
          _this.openDoor()
        },
        打开安全门: function () {
          _this.openSafeDoor()
        },
      }
      this.datGui = new dat.GUI()
      this.datGui.domElement.setAttribute('id', 'datGui')
      this.datGui.add(this.gui, '自动旋转')
      this.datGui.add(this.gui, "打开柜门")
      this.datGui.add(this.gui, "打开安全门")
      // datGui.add(gui, "clearScene")
      // datGui.add(gui, "importScene")
      // 将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
    },
    // 初始化渲染器
    initRender () {
      // 新建一个渲染器, 渲染器用来输出最终结果
      this.renderer = new THREE.WebGLRenderer(
        {
          // 是否开启反锯齿
          antialias: true
        }
      )
      // 调整手机端显示效果
      this.renderer.setPixelRatio(window.devicePixelRatio)
      // 设置渲染的尺寸
      this.renderer.setSize(this.width, this.height)
      // 设置背景的颜色
      this.renderer.setClearColor(0x4E72B7)
      // glTF 模型 sRGB 颜色空间
      this.renderer.gammaOutput = true
      this.renderer.gammaFactor = 2.2
      this.renderer.physicallyCorrectLights = true
      // 设置是否开启投影, 开启的话, 光照会产生投影
      this.renderer.shadowMap.enabled = true
      // 设置投影类型, 这边是柔和投影
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      // 创建 canvas
      document.getElementById('draw').appendChild(this.renderer.domElement)
    },
    // 初始化场景
    initScene () {
      // 建造场景
      this.scene = new THREE.Scene()
      // this.scene.position.z = 120
    },
    // 初始化摄像机
    initCamera () {
      // 可视角度，显示口的宽高比，近裁剪面，远裁剪面
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 3000)
      this.camera.position.set(0, -0.4, 3.8)
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    },
    // 初始化光线
    initLight () {
      // 环境光
      this.light = new THREE.AmbientLight(0xFFFFFF, 1)
      this.scene.add(this.light)
      // 平行光
      let directionalLight1= new THREE.DirectionalLight(0xFFFFFF, 1)
      //开启灯光投射阴影
      directionalLight1.position.set(0, 2, 5)
      directionalLight1.target.position.set(0, 0, 0)
      directionalLight1.castShadow = true
      this.scene.add(directionalLight1)

      let directionalLight2 = new THREE.DirectionalLight(0xF0FFFF, 1)
      directionalLight2.position.set(0, 0.6, -5)
      directionalLight2.target.position.set(0, 0, 0)
      directionalLight2.castShadow = true
      this.scene.add(directionalLight2)

      let directionalLight3 = new THREE.DirectionalLight(0xF0FFFF, 0.55)
      directionalLight3.position.set(10, 0, 0)
      directionalLight3.target.position.set(0, 0, 0)
      directionalLight3.castShadow = true
      this.scene.add(directionalLight3)

      let directionalLight4 = new THREE.DirectionalLight(0xFFFFFF, 0.55)
      directionalLight4.position.set(-10, 0, 0)
      directionalLight4.target.position.set(0, 0, 0)
      directionalLight4.castShadow = true
      this.scene.add(directionalLight4)

      // let directionalLight5= new THREE.DirectionalLight(0xffffff, 1)
      // directionalLight5.position.set(0, 0.85, 0.5)
      // directionalLight5.target.position.set(0, 0, 0)
      // directionalLight5.castShadow = true
      // this.scene.add(directionalLight5)

      // 聚光灯
      let spotLight1 = new THREE.SpotLight(0xFFB6C1, 0.8)
      spotLight1.position.set(0, 0.76, 0.7)
      // 开启灯光投射阴影
      spotLight1.castShadow = true
      this.scene.add(spotLight1)

      // let spotLight2 = new THREE.SpotLight(0xFFB6C1, 1)
      // spotLight2.position.set(0, 0.76, -1)
      // // 开启灯光投射阴影
      // spotLight2.castShadow = true
      // this.scene.add(spotLight2)
      // let pointLight2 = new THREE.PointLight(0xffffff, 0.9)
      // pointLight2.position.set(-2, 2, -5)
      // this.scene.add(pointLight2)
      // let pointLight3 = new THREE.PointLight(0xffffff, 0.9)
      // pointLight3.position.set(0, 3, -1)
      // this.scene.add(pointLight3)
    },
    // 初始化模型
    initModel () {
      // 辅助工具
      // this.axesHelper = new THREE.AxesHelper(5)
      // this.scene.add(this.axesHelper)
      // glTF 资源的加载器
      this.loader = new THREE.GLTFLoader()
      // glTF 资源压缩器
      this.dracoLoader = new THREE.DRACOLoader()
      this.dracoLoader.setDecoderPath('three/draco/')
      this.loader.setDRACOLoader(this.dracoLoader)
      // 加载跨域文件
      this.loader.setCrossOrigin('anonymous')
      // 加载 glTF 格式的模型
      let _this = this
      this.loader.load('three/model/8600r.gltf', function (obj) {
        obj.scene.traverse(function (child) {
          if (child.isMesh) {
            // child.material.emissive = child.material.color
            // child.material.emissiveMap = child.material.map
            // 允许投射阴影
            // child.castShadow = true
            // 允许接收阴影
            child.receiveShadow = true
          }
        })
        console.log(obj)
        obj.scene.position.y = -0.3
        obj.scene.name = "loaderSence"
        _this.scene.add(obj.scene)
        document.getElementById('loading').style.display = 'none'
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      function (error) {
        console.log('load error!'+error.getWebGLErrorMessage())
      })
      let cubeGeometry = new THREE.CubeGeometry(0.05, 0.05, 0.05)
      let cubeMaterial = new THREE.MeshLambertMaterial(
        {
          color: 0x00ffff
        }
      )
      let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      // let cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial)
      // let cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cube.position.set(-0.25, 0.5, -0.6)
      // cube1.position.set(0, 1, -5)
      // cube2.position.set(-5, 1, -5)
      this.scene.add(cube)
      // this.scene.add(cube1)
      // this.scene.add(cube2)
    },
    // 初始化控制器
    initControls () {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.controls.enableDamping = true
      // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
      this.controls.dampingFactor = 0.2
      // 是否可以缩放
      this.controls.enableZoom = true
      // 是否自动旋转
      this.controls.autoRotate = true
      // 旋转速度
      this.controls.autoRotateSpeed = 0.6
      // 设置相机距离原点的最远距离
      this.controls.minDistance = 1
      // 设置相机距离原点的最远距离
      this.controls.maxDistance = 2000
      // 是否开启右键拖拽
      this.controls.enablePan = false
    },
    // 初始化性能插件
    initStats () {
      this.stats = new Stats()
      this.stats.domElement.setAttribute('id', 'stats')
      document.getElementById('draw').appendChild(this.stats.dom)
    },
    render () {
      if (!this.gui.自动旋转) {
        this.controls.autoRotate = false
      } else {
        this.controls.autoRotate = true
      }
      this.renderer.render(this.scene, this.camera)
    },
    animate () {
      // 更新控制器
      this.render()
      // 更新性能插件
      this.stats.update()
      // 更新相关位置
      // light.position.y = gui.lightY
      // sphere.position.x = gui.sphereX
      // sphere.position.z = gui.sphereZ
      // cube.position.x = gui.cubeX
      // cube.position.z = gui.cubeZ
      this.controls.update()
      requestAnimationFrame(this.animate)
    },
    // 窗口变动触发的函数
    onWindowResize () {
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
      this.render()
      this.renderer.setSize(this.width, this.height)
    },
    /** ================ 动画 ================ **/
    // 打开上位置门
    openDoor () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'door')
      this.scene.children[index1].children[index2].position.set(-0.51, 0.61, -0.6)
      this.scene.children[index1].children[index2].rotation.set(0, Math.PI / 2, 0)
      this.pullOutPack()
      this.pullOutIdcB()
      this.pullOutPrrB()
    },
    // 拉出上面板
    pullOutPack () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'pack')
      this.scene.children[index1].children[index2].translateZ(-0.6)
    },
    // 凭条打印机
    pullOutPrrB () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'prrB')
      this.scene.children[index1].children[index2].translateZ(-0.6)
    },
    // 读卡器
    pullOutIdcB () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'idcB')
      this.scene.children[index1].children[index2].translateZ(-0.6)
    },
    // 打开安全门
    openSafeDoor () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'safeDoor')
      this.scene.children[index1].children[index2].position.set(-0.51, -0.305, -0.58)
      this.scene.children[index1].children[index2].rotation.set(-Math.PI / 2, Math.PI, 0)
      this.pullOutBv()
      this.pullOutCashBox()
    },
    // 拉出验钞模块
    pullOutBv () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'bv')
      this.scene.children[index1].children[index2].translateZ(-0.7)
    },
    // 拉出钞箱
    pullOutCashBox () {
      let _this = this
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'cashBox')
      this.scene.children[index1].children[index2].translateZ(-0.7)
      let l = this.cashBoxNum
      for (let i = 0; i < l ; i ++) {
        index2 = this.finder(this.scene.children[index1].children, `cashBox0${ i + 1 }`)
        _this.scene.children[index1].children[index2].translateZ(-0.7)
      }
    },
    /** ================ Utils ================ **/
    // 访达
    finder (array, thisValue) {
      return array.findIndex(arr => arr.name === thisValue)
    }
  },

  watch: {},

  destroyed () {
    window.onresize = null
  }
}
</script>

<style lang='scss' scoped>
  #view {
    #container {
      #draw {
        width: 800px;
        height: 600px;
        canvas {
          display: block;
        }
      }
    }
  }

</style>
