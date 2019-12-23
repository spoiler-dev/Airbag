<template>
  <div>
    <div id="banner">
      <i class="el-icon-d-arrow-left" id="back">返回</i>
      <span>Eastcom-8600r 模型管理控制系统</span>
    </div>
    <div id="header">
      <div id="header-left">
        <img src="../../../../public/three/system/leftHeader.png" alt="">
      </div>
      <div id="chTitle">
        <img src="../../../../public/three/system/chTitle.png" alt="">
      </div>
      <div id="header-right">
        <img src="../../../../public/three/system/rightHeader.png" alt="">
      </div>
      <div id="line-left">
        <img src="../../../../public/three/system/leftLine.png" alt="">
      </div>
      <div id="enTitle">
        Self service equipment monitoring management system
      </div>
      <div id="line-right">
        <img src="../../../../public/three/system/rightLine.png" alt="">
      </div>
      <div id="quit">
        <img src="../../../../public/three/system/quit.png" alt="">&nbsp;退出
      </div>
    </div>
    <div id="terminal-info">
      <div class="textLine">
        <img src="../../../../public/three/system/textLine.png" alt="">
      </div>
      <div class="terminal-text">
        <span class="terminal-text-left">设备号：</span>
        <span class="terminal-text-right">02031001</span>
      </div>
      <div class="textLine">
        <img src="../../../../public/three/system/textLine.png" alt="">
      </div>
      <div class="terminal-text">
        <span class="terminal-text-left">平台版本号：</span>
        <span class="terminal-text-right">ABWOA_V3.2.0.3</span>
      </div>
      <div class="textLine">
        <img src="../../../../public/three/system/textLine.png" alt="">
      </div>
    </div>
    <div id="terminal-state">
      <div class="panel-title">
        <div class="panel-chTitle">设备状态</div>
        <div class="panel-enTitle">Device status</div>
      </div>
      <div class="terminal-state-all">
        <div class="terminal-state-box">
          <div class="terminal-state-box-border">
            <div class="terminal-state-box-icon icon1"></div>
            <div class="terminal-state-box-text">交易中</div>
          </div>
        </div>
        <div class="terminal-state-box">
          <div class="terminal-state-box-border">
            <div class="terminal-state-box-icon icon2"></div>
            <div class="terminal-state-box-text">空闲</div>
          </div>
        </div>
        <div class="terminal-state-box active">
          <div class="terminal-state-box-border">
            <div class="terminal-state-box-icon icon3"></div>
            <div class="terminal-state-box-text">暂停服务</div>
          </div>
        </div>
      </div>
    </div>
    <div id="cashBox-info">
      <div class="textLine">
        <img src="../../../../public/three/system/textLine.png" alt="">
      </div>
      <table>
        <tr>
          <th>序号</th>
          <th>钞箱类型</th>
          <th>面额</th>
          <th>状态</th>
          <th>初始数</th>
          <th>剩余数</th>
        </tr>
        <tr>
          <td>1</td>
          <td>回收/拒绝</td>
          <td>100</td>
          <td>正常</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <td>1</td>
          <td>回收/拒绝</td>
          <td>100</td>
          <td>正常</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <td>1</td>
          <td>回收/拒绝</td>
          <td>100</td>
          <td>正常</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <td>1</td>
          <td>回收/拒绝</td>
          <td>100</td>
          <td>正常</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <td>1</td>
          <td>回收/拒绝</td>
          <td>100</td>
          <td>正常</td>
          <td>100</td>
          <td>100</td>
        </tr>
      </table>
      <div class="textLine">
        <img src="../../../../public/three/system/textLine.png" alt="">
      </div>
    </div>
    <div id="cashBox-state">
      <div class="cashBox-box">
        <div class="cashBox-title">取款功能：</div>
        <div class="cashBox-text">
          <div class="cashBox-text-left">ON</div>
          <div class="cashBox-text-right">开</div>
        </div>
      </div>
      <div class="cashBox-box">
        <div class="cashBox-title">存款功能：</div>
        <div class="cashBox-text">
          <div class="cashBox-text-left">ON</div>
          <div class="cashBox-text-right">开</div>
        </div>
      </div>
    </div>
    <div id="terminal-model">
      <div class="panel-title">
        <div class="panel-chTitle">模块状态</div>
        <div class="panel-enTitle">Model status</div>
      </div>
      <div class="terminal-model-all">
        <div class="terminal-model-box">
          <div class="terminal-model-box-text">读卡器</div>
          <div class="terminal-model-box-icon idc"></div>
        </div>
        <div class="terminal-model-box">
          <div class="terminal-model-box-text">密码键盘</div>
          <div class="terminal-model-box-icon pin"></div>
        </div>
        <div class="terminal-model-box">
          <div class="terminal-model-box-text">凭条打印机</div>
          <div class="terminal-model-box-icon prr"></div>
        </div>
        <div class="terminal-model-box">
          <div class="terminal-model-box-text">非接读卡器</div>
          <div class="terminal-model-box-icon icc"></div>
        </div>
        <div class="terminal-model-box">
          <div class="terminal-model-box-text">取款模块</div>
          <div class="terminal-model-box-icon movement"></div>
        </div>
        <div class="terminal-model-box">
          <div class="terminal-model-box-text">存款模块</div>
          <div class="terminal-model-box-icon movement"></div>
        </div>
        <div class="terminal-model-box">
          <div class="terminal-model-box-text">摄像头</div>
          <div class="terminal-model-box-icon cam"></div>
        </div>
      </div>
    </div>
    <div id="base">
    </div>
    <div id="view">
      <div id="container">
        <div id="draw"></div>
        <div id="loading">模型加载中...</div>
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
      cashBoxNum: 5,
      openDoorFlag: false,
      closeDoorFlag: false,
      openSafeDoorFlag: false,
      closSafeeDoorFlag: false,
      pushIntoMovementFlag: false,
      pullOutMovementFlag: false,
      pushIntoCashBoxFlag: false,
      pullOutCashBoxFlag: false
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
    this.width = document.getElementById('view').offsetWidth
    this.height = document.getElementById('view').offsetHeight
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
        打开柜门: false,
        打开安全门: false,
        检查机芯: false,
        检查钞箱: false,
        检查出入钞闸门: false
      }
      this.datGui = new dat.GUI()
      this.datGui.domElement.setAttribute('id', 'datGui')
      this.datGui.add(this.gui, '自动旋转')
      this.datGui.add(this.gui, "检查出入钞闸门")
      this.datGui.add(this.gui, "打开柜门")
      this.datGui.add(this.gui, "打开安全门")
      this.datGui.add(this.gui, "检查机芯")
      this.datGui.add(this.gui, "检查钞箱")
      this.datGui.close()
    },
    // 初始化渲染器
    initRender () {
      // 新建一个渲染器, 渲染器用来输出最终结果
      this.renderer = new THREE.WebGLRenderer(
        {
          // 是否开启反锯齿
          antialias: true,
          alpha: true
        }
      )
      // 调整手机端显示效果
      this.renderer.setPixelRatio(window.devicePixelRatio)
      // 设置渲染的尺寸
      this.renderer.setSize(this.width, this.height)
      // 设置背景的颜色
      // this.renderer.setClearColor(0x4E72B7)
      this.renderer.setClearAlpha(0);
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
      this.camera.position.set(0, -0.4, 4.8)
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
      //设置统计模式
      this.stats.setMode(0); // 0: fps, 1: ms
      //统计信息显示在左上角
      // this.stats.dom.style.left = '450px'
      // this.stats.dom.style.top = '130px'
      this.stats.dom.setAttribute('id', 'stats')
      document.getElementById('draw').appendChild(this.stats.dom)
    },
    render () {
      // 自动旋转
      if (!this.gui.自动旋转) {
        this.controls.autoRotate = false
      } else {
        this.controls.autoRotate = true
      }
      this.controls.enablePan = false
      // 控制上位置柜门
      if (this.gui.打开柜门) {
        if (!this.openDoorFlag) {
          this.openDoor()
        }
      } else {
        if (!this.closeDoorFlag && this.openDoorFlag) {
          this.closeDoor()
        }
      }
      // 控制安全门
      if (this.gui.打开安全门) {
        if (!this.openSafeDoorFlag) {
          this.openSafeDoor()
        } else {
          // 控制机芯
          if (this.gui.检查机芯) {
            if (!this.pullOutMovementFlag) {
              this.pullOutMovement()
            }
          } else {
            if (!this.pushIntoMovementFlag && this.pullOutMovementFlag) {
              this.pushIntoMovement()
            }
          }
          // 控制钞箱
          if (this.gui.检查钞箱) {
            if (!this.pullOutCashBoxFlag) {
              this.pullOutCashBox()
            }
          } else {
            if (!this.pushIntoCashBoxFlag && this.pullOutCashBoxFlag) {
              this.pushIntoCashBox()
            }
          }
        }
      } else {
        if (!this.closeSafeDoorFlag && this.openSafeDoorFlag) {
          // 控制机芯
          if (!this.pushIntoMovementFlag && this.pullOutMovementFlag) {
            this.pushIntoMovement()
          }
          // 控制钞箱
          if (!this.pushIntoCashBoxFlag && this.pullOutCashBoxFlag) {
            this.pushIntoCashBox()
          }
          this.closeSafeDoor()
        }
      }


      this.renderer.render(this.scene, this.camera)
    },
    animate () {
      requestAnimationFrame(this.animate)
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
    },
    // 窗口变动触发的函数
    onWindowResize () {
      this.width = document.getElementById('view').offsetWidth
      this.height = document.getElementById('view').offsetHeight
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
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
      this.openDoorFlag = true
      this.closeDoorFlag = false
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
    // 关闭上位置门
    closeDoor () {
      this.pushIntoPack()
      this.pushIntoPrrB()
      this.pushIntoIdcB()
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'door')
      this.scene.children[index1].children[index2].position.set(0.0009173508733510971, 0.6081228852272034, -0.6094274520874023)
      this.scene.children[index1].children[index2].rotation.set(0, Math.PI / 2, 0)
      this.openDoorFlag = false
      this.closeDoorFlag = true
    },
    // 推入上面板
    pushIntoPack () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'pack')
      this.scene.children[index1].children[index2].translateZ(0.6)
    },
    // 凭条打印机
    pushIntoPrrB () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'prrB')
      this.scene.children[index1].children[index2].translateZ(0.6)
    },
    // 读卡器
    pushIntoIdcB () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'idcB')
      this.scene.children[index1].children[index2].translateZ(0.6)
    },
    // 打开安全门
    openSafeDoor () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'safeDoor')
      this.scene.children[index1].children[index2].position.set(-0.5, -0.305, -0.58)
      this.scene.children[index1].children[index2].rotation.set(-Math.PI / 2, Math.PI, 0)
      this.openSafeDoorFlag = true
      this.closeSafeDoorFlag = false
    },
    // 拉出机芯
    pullOutMovement () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'bv')
      this.scene.children[index1].children[index2].translateZ(-0.7)
      this.pullOutMovementFlag = true
      this.pushIntoMovementFlag = false
    },
    // 拉出钞箱
    pullOutCashBox () {
      let _this = this
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'cashBox')
      this.scene.children[index1].children[index2].translateZ(-0.7)
      let l = this.cashBoxNum
      for (let i = 0; i < l ; i ++) {
        index2 = _this.finder(_this.scene.children[index1].children, `cashBox0${ i + 1 }`)
        _this.scene.children[index1].children[index2].translateZ(-0.7)
      }
      this.pullOutCashBoxFlag = true
      this.pushIntoCashBoxFlag = false
    },
    // 关闭安全门
    closeSafeDoor () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'safeDoor')
      debugger
      this.scene.children[index1].children[index2].position.set(0.010121287778019905, -0.2978687286376953, -0.6150507926940918)
      this.scene.children[index1].children[index2].rotation.set(Math.PI / 2, 0, 0)
      this.openSafeDoorFlag = false
      this.closeSafeDoorFlag = true
    },
    // 推入机芯
    pushIntoMovement () {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'bv')
      this.scene.children[index1].children[index2].translateZ(0.7)
      this.pullOutMovementFlag = false
      this.pushIntoMovementFlag = true
    },
    // 推入钞箱
    pushIntoCashBox () {
      let _this = this
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'cashBox')
      this.scene.children[index1].children[index2].translateZ(0.7)
      let l = this.cashBoxNum
      for (let i = 0; i < l ; i ++) {
        index2 = _this.finder(_this.scene.children[index1].children, `cashBox0${ i + 1 }`)
        _this.scene.children[index1].children[index2].translateZ(0.7)
      }
      this.pullOutCashBoxFlag = false
      this.pushIntoCashBoxFlag = true
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
  #header {
    width: 90%;
    margin: 0 auto;
    position: fixed;
    top: 33px;
    left: 5%;
    z-index: 999;
    #header-left {
      width: 25%;
      float: left;
      text-align: right;
    }
    #header-right {
      width: 25%;
      float: right;
      text-align: left;
    }
    #chTitle {
      width: 50%;
      float: left;
      text-align: center;
    }
    #line-left {
      margin-top: 10px;
      width: 30%;
      float: left;
      clear: both;
      img {
        width: 100%;
      }
    }
    #enTitle {
      margin-top: 10px;
      width: 40%;
      text-align: center;
      font-size:18px;
      font-family:Franklin Gothic Demi;
      font-weight:400;
      color:rgba(0,255,255,1);
      float: left;
    }
    #line-right {
      margin-top: 10px;
      width: 30%;
      float: right;
      img {
        width: 100%;
      }
    }
    #quit {
      position: fixed;
      top: 33px;
      right: 10px;
      width:120px;
      height:40px;
      background:rgba(0,30,36,0.3);
      border:1px solid rgba(0,255,255,1);
      border-radius:20px;
      text-align: center;
      font-size:16px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(0,255,255,1);
      line-height: 40px;
    }
  }
  #terminal-info {
    position: fixed;
    top: 120px;
    left: 30px;
    z-index: 999;
    width:400px;
    background:rgba(0,30,36,0.3);
    .terminal-text {
      text-align: center;
      .terminal-text-left {
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,255,255,1);
      }
      .terminal-text-right {
        font-size:20px;
        font-family:Agency FB;
        font-weight:bold;
        color:rgba(0,255,255,1);
      }
    }
    .textLine {
      width:100%;
      height:5px;
      line-height: 5px;
    }
  }
  #terminal-state {
    position: fixed;
    top: 240px;
    left: 30px;
    z-index: 999;
    width:400px;
    background:rgba(0,30,36,0.3);
    .terminal-state-all {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: 30px 0 10px;
      .terminal-state-box {
        width: 100px;
        height: 100px;
        background: url('../../../../public/three/system/frame1.png') no-repeat center;
        opacity:0.4;
        .terminal-state-box-border {
          margin: 10px;
          width:80px;
          height:80px;
          background:rgba(3,9,30,1);
          border:1px solid rgba(0,255,255,1);
          .terminal-state-box-icon {
            width: 100%;
            height: 22px;
            margin: 16px 0 8px 0;
          }
          .icon1 {
            background: url('../../../../public/three/system/transaction.png') no-repeat center;
          }
          .icon2 {
            background: url('../../../../public/three/system/freetime.png') no-repeat center;
          }
          .icon3 {
            background: url('../../../../public/three/system/suspend.png') no-repeat center;
          }
          .terminal-state-box-text {
            text-align: center;
            width: 100%;
            height:14px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color:rgba(0,255,255,1);
          }
        }
      }
      .active {
        opacity:1 !important;
      }
    }
  }
  #cashBox-info {
    position: fixed;
    top: 440px;
    left: 30px;
    z-index: 999;
    width:400px;
    height: 300px;
    background:rgba(0,30,36,0.3);
    table {
      width: 100%;
      text-align: center;
      tr {
        th {
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(255,255,255,1);
          height: 46px;
          line-height: 46px;
        }
        td {
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(0,255,255,1);
        }
      }
    }
  }
  #cashBox-state {
    position: fixed;
    top: 120px;
    right: 30px;
    z-index: 999;
    width:400px;
    height: 80px;
    background:rgba(0,30,36,0.3);
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
    .cashBox-box {
      width:150px;
      height:60px;
      background:rgba(11,117,149,0);
      border:1px solid rgba(0,255,255,1);
      .cashBox-title {
        padding-left: 10px;
        height:20px;
        line-height: 20px;
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,255,255,1);
      }
      .cashBox-text {
        width:148px;
        height:40px;
        background:rgba(0,255,255,0.3);
        display: flex;
        .cashBox-text-left {
          width:50%;
          height:100%;
          font-size:20px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(0,255,255,1);
          text-align: center;
          line-height: 40px;
        }
        .cashBox-text-right {
          width:50%;
          height:100%;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(255,255,255,1);
          text-align: center;
          line-height: 40px;
        }
      }
    }
  }
  #terminal-model {
    position: fixed;
    top: 215px;
    right: 30px;
    z-index: 999;
    width:400px;
    background:rgba(0,30,36,0.3);
    .terminal-model-all {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      margin: 30px 0 10px;
      .terminal-model-box {
        width:120px;
        height:125px;
        background:rgba(11,117,149,0);
        border:1px solid;
        border-image:linear-gradient(0deg, rgba(0,255,255,1), rgba(0,255,255,1), rgba(0,255,255,1)) 10 10;
        margin-bottom: 5px;
        .terminal-model-box-text {
          height:34px;
          line-height: 34px;
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(0,255,255,1);
          text-align: center;
          border-bottom:1px solid;
          border-image:linear-gradient(0deg, rgba(0,255,255,1), rgba(0,255,255,1), rgba(0,255,255,1)) 10 10;
        }
        .terminal-model-box-icon {
          width:94px;
          height:80px;
          background:rgba(1,22,35,1);
          border:1px solid rgba(0,96,116,1);
          border-radius:3px;
          margin: 5px auto 0 auto;
        }
        .idc {
          background: url('../../../../public/three/system/idc.png') no-repeat center;
        }
        .icc {
          background: url('../../../../public/three/system/icc.png') no-repeat center;
        }
        .prr {
          background: url('../../../../public/three/system/prr.png') no-repeat center;
        }
        .cam {
          background: url('../../../../public/three/system/cam.png') no-repeat center;
        }
        .movement {
          background: url('../../../../public/three/system/movement.png') no-repeat center;
        }
        .pin {
          background: url('../../../../public/three/system/pin.png') no-repeat center;
        }
      }
    }
  }
  .textLine {
    width:100%;
    height:5px;
    line-height: 5px;
  }
  .panel-title {
    width: 100%;
    height: 20px;
    .panel-chTitle {
      width:80px;
      height:20px;
      font-size:20px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      float: left;
    }
    .panel-enTitle {
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(0,255,255,1);
      opacity:0.5;
      float: right;
      width:311px;
      border-bottom:2px solid rgba(0,255,255,1);
    }
  }
  #base {
    position: fixed;
    bottom: 0px;
    left: 50%;
    width: 300px;
    height: 120px;
    z-index: 999;
    margin: auto;
    background: url('../../../../public/three/system/base.png') no-repeat center;
    background-size: contain;
    transform: translate(-50%);
  }
  #view {
    padding: 0;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('../../../../public/three/system/bg.png') no-repeat center;
    background-size: cover;
    #container {
      #draw {
        width: 800px;
        height: 600px;
        canvas {
          display: block;
        }
      }
      #loading {
        position: fixed;
        z-index: 999;
        top: 440px;
        height:34px;
        line-height: 34px;
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,255,255,1);
        text-align: center;
        width: 100%;
      }
    }
  }

</style>

<style lang="scss">
  .dg.ac {
    z-index: 1000;
    left: 50%;
    top: 120px;
    transform: translate(-50%);
    right: unset;
  }

</style>