<template>
  <div style="font-family:Microsoft YaHei;">
    <div id="header">
      <div id="header-left"></div>
      <div id="chTitle">{{chTitle}}</div>
      <div id="header-right"></div>
      <div id="line-left"></div>
      <div id="enTitle">{{enTitle}}</div>
      <div id="line-right"></div>
      <div id="quit" @click="handleClickQuit">
        <img src="../../../../public/three/system/quit.png" alt />&nbsp;退出
      </div>
    </div>
    <!-- 设备信息 -->
    <div id="terminal-info">
      <div class="textLine"></div>
      <div class="terminal-text">
        <span class="terminal-text-left">设备号：</span>
        <span class="terminal-text-right">{{terminalId}}</span>
      </div>
      <div class="textLine"></div>
      <div class="terminal-text">
        <span class="terminal-text-left">平台版本号：</span>
        <span class="terminal-text-right">{{abwoa}}</span>
      </div>
      <div class="textLine"></div>
    </div>
    <!-- 设备状态 -->
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
    <!-- 钞箱信息 -->
    <div id="cashBox-info">
      <div class="textLine"></div>
      <table>
        <tr>
          <th v-for="(th, i) in thList" :key="i">{{th}}</th>
        </tr>
        <tr v-for="(tr, i) in trList" :key="i">
          <td v-for="(td, j) in trList[i]" :key="j">{{td}}</td>
        </tr>
      </table>
      <div class="textLine"></div>
    </div>
    <!-- 钞箱状态 -->
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
    <!-- 设备模块 -->
    <div id="terminal-model">
      <div class="panel-title">
        <div class="panel-chTitle">模块状态</div>
        <div class="panel-enTitle">Model status</div>
      </div>
      <div class="terminal-model-all">
        <div
          v-for="model in modelList"
          :key="model.name"
          :class="model.status ? 'terminal-model-box box-normal' : 'terminal-model-box box-error'"
        >
          <div
            :class="model.status ? 'terminal-model-box-text text-normal' : 'terminal-model-box-text text-error'"
          >{{model.name}}</div>
          <div
            :class="model.status ? `terminal-model-box-icon icon-normal ${model.model}` : `terminal-model-box-icon icon-error ${model.model}Error`"
          ></div>
        </div>
      </div>
    </div>
    <!-- 操作面板 -->
    <div id="options">
      <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
        <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <!-- 模型 -->
    <div id="view">
      <div id="container">
        <div id="draw"></div>
        <div id="loading">模型加载中...</div>
      </div>
      <!-- 底座 -->
      <div id="base"></div>
      <div id="rightBtn" @click="rightBtn"></div>
      <div id="leftBtn" @click="leftBtn"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Self-Service-Equipment',
  props: [''],
  data() {
    return {
      chTitle: '自助设备监控管理系统',
      enTitle: 'Self-Service Equipment Monitoring Management System',
      abwoa: 'ABWOA_V3.2.0.3',
      terminalId: '02005001',
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
      pullOutCashBoxFlag: false,
      closeGateFlag: false,
      openGateFlag: false,
      checkList: ['自动旋转'],
      options: ['自动旋转', '打开柜门', '检查出入钞闸门', '打开安全门', '检查机芯', '检查钞箱'],
      modelList: [
        { name: '读卡器', status: true, model: 'idc' },
        { name: '密码键盘', status: true, model: 'pin' },
        { name: '凭条打印机', status: false, model: 'prr' },
        { name: '非接读卡器', status: true, model: 'icc' },
        { name: '取款模块', status: true, model: 'movement' },
        { name: '存款模块', status: true, model: 'movement' },
        { name: '摄像头', status: true, model: 'cam' },
      ],
      thList: ['序号', '钞箱类型', '面额', '状态', '初始数', '剩余数'],
      trList: [['0', '回收/拒绝', '-', '正常', '0', '0'], ['1', '循环', '100', '正常', '100', '90'], ['2', '循环', '100', '正常', '100', '100'], ['3', '循环', '100', '正常', '100', '100'], ['4', '循环', '100', '正常', '100', '100']],
    }
  },

  components: {},

  computed: {},

  beforeMount() {
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

  mounted() {
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
    handleCheckedChange(val) {
      this.gui = {
        自动旋转: false,
        打开柜门: false,
        打开安全门: false,
        检查机芯: false,
        检查钞箱: false,
        检查出入钞闸门: false
      }
      let l = val.length
      for (let i = 0; i < l; i++) {
        this.gui[val[i]] = true
      }
    },
    // WebGL兼容性检查
    checkSupport() {
      if (THREE.WEBGL.isWebGLAvailable()) {
        // Initiate function or other initializations here
        this.init()
      } else {
        let warning = THREE.WEBGL.getWebGLErrorMessage()
        document.getElementById('container').appendChild(warning)
      }
    },
    // 初始化
    init() {
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
    initGui() {
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
      // this.datGui = new dat.GUI()
      // this.datGui.domElement.setAttribute('id', 'datGui')
      // this.datGui.add(this.gui, '自动旋转')
      // this.datGui.add(this.gui, "检查出入钞闸门")
      // this.datGui.add(this.gui, "打开柜门")
      // this.datGui.add(this.gui, "打开安全门")
      // this.datGui.add(this.gui, "检查机芯")
      // this.datGui.add(this.gui, "检查钞箱")
      // this.datGui.close()
    },
    // 初始化渲染器
    initRender() {
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
    initScene() {
      // 建造场景
      this.scene = new THREE.Scene()
      // this.scene.position.z = 120
    },
    // 初始化摄像机
    initCamera() {
      // 可视角度，显示口的宽高比，近裁剪面，远裁剪面
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 3000)
      this.camera.position.set(0, -0.4, 4.8)
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    },
    // 初始化光线
    initLight() {
      // 环境光
      this.light = new THREE.AmbientLight(0xFFFFFF, 1)
      this.scene.add(this.light)
      // 平行光
      let directionalLight1 = new THREE.DirectionalLight(0xFFFFFF, 1)
      //开启灯光投射阴影
      directionalLight1.position.set(0, 0.7, 5)
      directionalLight1.target.position.set(0, 0, 0)
      directionalLight1.castShadow = true
      this.scene.add(directionalLight1)

      let directionalLight2 = new THREE.DirectionalLight(0xF0FFFF, 1)
      directionalLight2.position.set(0, 0, -5)
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

      let directionalLight5 = new THREE.DirectionalLight(0xFFFFFF, 0.55)
      directionalLight5.position.set(0, 1, -0.8)
      directionalLight5.target.position.set(0, 0, 0)
      directionalLight5.castShadow = true
      this.scene.add(directionalLight5)
      // let directionalLight5= new THREE.DirectionalLight(0xffffff, 1)
      // directionalLight5.position.set(0, 0.85, 0.5)
      // directionalLight5.target.position.set(0, 0, 0)
      // directionalLight5.castShadow = true
      // this.scene.add(directionalLight5)

      // 聚光灯
      let spotLight1 = new THREE.SpotLight(0xFFB6C1, 0.8)
      spotLight1.position.set(0, 0.66, 0.7)
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
    initModel() {
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
        obj.scene.position.y = -0.4
        obj.scene.name = "loaderSence"
        _this.scene.add(obj.scene)
        document.getElementById('loading').style.display = 'none'
      },
        function (xhr) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        },
        function (error) {
          console.log('load error!' + error.getWebGLErrorMessage())
        })
      let cubeGeometry = new THREE.CubeGeometry(0.05, 0.05, 0.05)
      let cubeMaterial = new THREE.MeshLambertMaterial(
        {
          color: 0x00ffff
        }
      )
      // let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      // cube.position.set(-0.25, 0.5, -0.6)
      // this.scene.add(cube)
    },
    // 初始化控制器
    initControls() {
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
      this.controls.autoRotateSpeed = 0.3
      // 设置相机距离原点的最远距离
      this.controls.minDistance = 1
      // 设置相机距离原点的最远距离
      this.controls.maxDistance = 2000
      // 是否开启右键拖拽
      this.controls.enablePan = false
    },
    // 初始化性能插件
    initStats() {
      this.stats = new Stats()
      //设置统计模式
      this.stats.setMode(1); // 0: fps, 1: ms
      //统计信息显示在左上角
      this.stats.dom.style.left = '1%'
      this.stats.dom.style.top = '15px'
      this.stats.dom.setAttribute('id', 'stats')
      document.getElementById('draw').appendChild(this.stats.dom)
    },
    render() {
      // 自动旋转
      if (!this.gui.自动旋转) {
        this.controls.autoRotate = false
      } else {
        this.controls.autoRotate = true
      }
      // 控制出入钞闸门
      if (this.gui.检查出入钞闸门) {
        if (!this.openGateFlag) {
          this.camera.position.set(0, 1.6, 4)
          this.openGate()
        }
      } else {
        if (!this.closeGateFlag && this.openGateFlag) {
          this.closeGate()
        }
      }
      // 控制上位置柜门
      if (this.gui.打开柜门) {
        if (!this.openDoorFlag) {
          this.camera.position.set(1, 1.6, -5)
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
          this.camera.position.set(-1.5, 1.6, -5)
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
    animate() {
      requestAnimationFrame(this.animate)
      // 更新控制器
      this.render()
      // 更新性能插件
      this.stats.update()
      this.controls.update()
    },
    // 窗口变动触发的函数
    onWindowResize() {
      this.width = document.getElementById('view').offsetWidth
      this.height = document.getElementById('view').offsetHeight
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.width, this.height)
    },
    /** ================ 动画 ================ **/
    // 打开上位置门
    openDoor() {
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
    pullOutPack() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'pack')
      this.scene.children[index1].children[index2].translateZ(-0.6)
    },
    // 凭条打印机
    pullOutPrrB() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'prrB')
      this.scene.children[index1].children[index2].translateZ(-0.6)
      this.prrError()
    },
    // 凭条打印机故障
    prrError() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'prrB')
      let index3 = this.finder(this.scene.children[index1].children, 'prrF')
      this.setColor(this.scene.children[index1].children[index2].children, 0xff0000)
      this.scene.children[index1].children[index3].material.color.set(0xff0000)
    },
    // 读卡器
    pullOutIdcB() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'idcB')
      this.scene.children[index1].children[index2].translateZ(-0.6)
    },
    // 关闭上位置门
    closeDoor() {
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
    pushIntoPack() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'pack')
      this.scene.children[index1].children[index2].translateZ(0.6)
    },
    // 凭条打印机
    pushIntoPrrB() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'prrB')
      this.scene.children[index1].children[index2].translateZ(0.6)
    },
    // 读卡器
    pushIntoIdcB() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'idcB')
      this.scene.children[index1].children[index2].translateZ(0.6)
    },
    // 打开安全门
    openSafeDoor() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'safeDoor')
      this.scene.children[index1].children[index2].position.set(-0.5, -0.305, -0.58)
      this.scene.children[index1].children[index2].rotation.set(-Math.PI / 2, Math.PI, 0)
      this.openSafeDoorFlag = true
      this.closeSafeDoorFlag = false
    },
    // 拉出机芯
    pullOutMovement() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'movement')
      this.scene.children[index1].children[index2].translateZ(-0.7)
      this.pullOutMovementFlag = true
      this.pushIntoMovementFlag = false
    },
    // 拉出钞箱
    pullOutCashBox() {
      let _this = this
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'cashBox')
      this.scene.children[index1].children[index2].translateZ(-0.7)
      let l = this.cashBoxNum
      for (let i = 0; i < l; i++) {
        index2 = _this.finder(_this.scene.children[index1].children, `cashBox0${i + 1}`)
        _this.scene.children[index1].children[index2].translateZ(-0.7)
      }
      this.pullOutCashBoxFlag = true
      this.pushIntoCashBoxFlag = false
    },
    // 关闭安全门
    closeSafeDoor() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'safeDoor')
      this.scene.children[index1].children[index2].position.set(0.010121287778019905, -0.2978687286376953, -0.6150507926940918)
      this.scene.children[index1].children[index2].rotation.set(Math.PI / 2, 0, 0)
      this.openSafeDoorFlag = false
      this.closeSafeDoorFlag = true
    },
    // 推入机芯
    pushIntoMovement() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'movement')
      this.scene.children[index1].children[index2].translateZ(0.7)
      this.pullOutMovementFlag = false
      this.pushIntoMovementFlag = true
    },
    // 推入钞箱
    pushIntoCashBox() {
      let _this = this
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'cashBox')
      this.scene.children[index1].children[index2].translateZ(0.7)
      let l = this.cashBoxNum
      for (let i = 0; i < l; i++) {
        index2 = _this.finder(_this.scene.children[index1].children, `cashBox0${i + 1}`)
        _this.scene.children[index1].children[index2].translateZ(0.7)
      }
      this.pullOutCashBoxFlag = false
      this.pushIntoCashBoxFlag = true
    },
    // 打开出入钞闸门
    openGate() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'gate')
      this.scene.children[index1].children[index2].translateZ(-0.2)
      this.openGateFlag = true
      this.closeGateFlag = false
    },
    // 关闭出入钞闸门
    closeGate() {
      let index1 = this.finder(this.scene.children, 'loaderSence')
      let index2 = this.finder(this.scene.children[index1].children, 'gate')
      this.scene.children[index1].children[index2].translateZ(0.2)
      this.openGateFlag = false
      this.closeGateFlag = true
    },
    /** ================ Utils ================ **/
    // 访达
    finder(array, thisValue) {
      return array.findIndex(arr => arr.name === thisValue)
    },
    setColor(array, c) {
      array[0].material = new THREE.MeshBasicMaterial({ color: c })
      array[2].material = new THREE.MeshBasicMaterial({ color: c })
      array[1].material = new THREE.MeshBasicMaterial({ color: c })

      // array.forEach((v, i)=>{
      //   v.material = new THREE.MeshBasicMaterial({color: c})
      // })
    },
    leftBtn() {
      let flag1 = window.getComputedStyle(document.getElementById('terminal-model'), null)
      if (flag1.display == 'none') {
        document.getElementById('terminal-model').style.display = 'block'
      } else {
        document.getElementById('terminal-model').style.display = 'none'
      }
      let flag2 = window.getComputedStyle(document.getElementById('cashBox-state'), null)
      if (flag2.display == 'none') {
        document.getElementById('cashBox-state').style.display = 'flex'
      } else {
        document.getElementById('cashBox-state').style.display = 'none'
      }
    },
    rightBtn() {
      let flag1 = window.getComputedStyle(document.getElementById('terminal-info'), null)
      if (flag1.display == 'none') {
        document.getElementById('terminal-info').style.display = 'block'
      } else {
        document.getElementById('terminal-info').style.display = 'none'
      }
      let flag2 = window.getComputedStyle(document.getElementById('terminal-state'), null)
      if (flag2.display == 'none') {
        document.getElementById('terminal-state').style.display = 'block'
      } else {
        document.getElementById('terminal-state').style.display = 'none'
      }
      let flag3 = window.getComputedStyle(document.getElementById('cashBox-info'), null)
      if (flag3.display == 'none') {
        document.getElementById('cashBox-info').style.display = 'block'
      } else {
        document.getElementById('cashBox-info').style.display = 'none'
      }
    },
    // 退出
    handleClickQuit() {
      this.$router.push({
        name: 'works'
      })
    }
  },

  watch: {},

  destroyed() {
    window.onresize = null
  }
}
</script>

<style lang='scss' scoped>
#header {
  width: 98%;
  margin: 0 auto;
  position: fixed;
  top: 10px;
  left: 1%;
  z-index: 999;
  #header-left {
    width: 30%;
    float: left;
    text-align: right;
    background: url("../../../../public/three/system/leftHeader.png") no-repeat
      right;
    height: 60px;
  }
  #header-right {
    width: 30%;
    float: right;
    text-align: left;
    background: url("../../../../public/three/system/rightHeader.png") no-repeat
      left;
    height: 60px;
  }
  #chTitle {
    float: left;
    width: 40%;
    text-align: center;
    font-size: 30px;
    font-weight: 400;
    color: rgba(28, 239, 233, 1);
    letter-spacing: 1px;
  }
  #line-left {
    margin-top: 8px;
    width: 33%;
    float: left;
    clear: both;
    background: url("../../../../public/three/system/leftLine.png") no-repeat
      right;
    height: 20px;
  }
  #enTitle {
    width: 34%;
    text-align: center;
    font-size: 16px;
    font-family: Franklin Gothic Demi;
    font-weight: 400;
    color: rgba(0, 255, 255, 1);
    float: left;
  }
  #line-right {
    margin-top: 8px;
    width: 33%;
    float: right;
    background: url("../../../../public/three/system/rightLine.png") no-repeat
      left;
    height: 20px;
  }
  #quit {
    position: fixed;
    top: 23px;
    right: 10px;
    width: 120px;
    height: 40px;
    background: rgba(0, 30, 36, 0.3);
    border: 1px solid rgba(0, 255, 255, 1);
    border-radius: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 255, 255, 1);
    line-height: 40px;
  }
}
#terminal-info {
  position: fixed;
  top: 110px;
  left: 1%;
  z-index: 999;
  width: 400px;
  background: rgba(0, 30, 36, 0.3);
  .terminal-text {
    text-align: center;
    .terminal-text-left {
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 255, 255, 1);
    }
    .terminal-text-right {
      font-size: 20px;
      font-family: Agency FB;
      font-weight: bold;
      color: rgba(0, 255, 255, 1);
    }
  }
}
#terminal-state {
  position: fixed;
  top: 230px;
  left: 1%;
  z-index: 999;
  width: 400px;
  background: rgba(0, 30, 36, 0.3);
  .terminal-state-all {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 30px 0 10px;
    .terminal-state-box {
      width: 100px;
      height: 100px;
      background: url("../../../../public/three/system/frame1.png") no-repeat
        center;
      opacity: 0.4;
      .terminal-state-box-border {
        margin: 10px;
        width: 80%;
        height: 80px;
        background: rgba(3, 9, 30, 1);
        border: 1px solid rgba(0, 255, 255, 1);
        .terminal-state-box-icon {
          width: 100%;
          height: 22px;
          margin: 16px 0 8px 0;
        }
        .icon1 {
          background: url("../../../../public/three/system/transaction.png")
            no-repeat center;
        }
        .icon2 {
          background: url("../../../../public/three/system/freetime.png")
            no-repeat center;
        }
        .icon3 {
          background: url("../../../../public/three/system/suspend.png")
            no-repeat center;
        }
        .terminal-state-box-text {
          text-align: center;
          width: 100%;
          height: 14px;
          font-size: 14px;
          font-weight: bold;
          color: rgba(0, 255, 255, 1);
        }
      }
    }
    .active {
      opacity: 1 !important;
    }
  }
}
#cashBox-info {
  position: fixed;
  top: 430px;
  left: 1%;
  z-index: 999;
  width: 400px;
  height: 220px;
  background: rgba(0, 30, 36, 0.3);
  table {
    width: 100%;
    text-align: center;
    tr {
      th {
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        height: 46px;
        line-height: 46px;
      }
      td {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 255, 255, 1);
      }
    }
  }
}
#cashBox-state {
  position: fixed;
  top: 110px;
  right: 1%;
  z-index: 999;
  width: 400px;
  height: 80px;
  background: rgba(0, 30, 36, 0.3);
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  .cashBox-box {
    width: 150px;
    height: 60px;
    background: rgba(11, 117, 149, 0);
    border: 1px solid rgba(0, 255, 255, 1);
    .cashBox-title {
      padding-left: 10px;
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 255, 255, 1);
    }
    .cashBox-text {
      width: 148px;
      height: 40px;
      background: rgba(0, 255, 255, 0.3);
      display: flex;
      .cashBox-text-left {
        width: 50%;
        height: 100%;
        font-size: 20px;
        font-weight: 400;
        color: rgba(0, 255, 255, 1);
        text-align: center;
        line-height: 40px;
      }
      .cashBox-text-right {
        width: 50%;
        height: 100%;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 40px;
      }
    }
  }
}
#terminal-model {
  position: fixed;
  top: 205px;
  right: 1%;
  z-index: 999;
  width: 400px;
  background: rgba(0, 30, 36, 0.3);
  .terminal-model-all {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin: 30px 0 10px;
    .terminal-model-box {
      width: 110px;
      height: 125px;
      background: rgba(11, 117, 149, 0);
      border: 1px solid;
      margin-bottom: 10px;
      .terminal-model-box-text {
        height: 34px;
        line-height: 34px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        border-bottom: 1px solid;
      }
      .text-normal {
        color: rgba(0, 255, 255, 1);
        border-color: rgba(0, 255, 255, 1);
      }
      .text-error {
        color: rgba(255, 0, 37, 1);
        border-color: rgba(255, 48, 78, 1);
      }
      .terminal-model-box-icon {
        width: 94px;
        height: 80px;

        border-radius: 3px;
        margin: 5px auto 0 auto;
      }
      .icon-normal {
        background: rgba(1, 22, 35, 1);
        border: 1px solid rgba(0, 96, 116, 1);
      }
      .icon-error {
        background: rgba(55, 0, 8, 1);
        border: 1px solid rgba(132, 0, 19, 1);
      }
      .idc {
        background: url("../../../../public/three/system/idc.png") no-repeat
          center;
      }
      .icc {
        background: url("../../../../public/three/system/icc.png") no-repeat
          center;
      }
      .prr {
        background: url("../../../../public/three/system/prr.png") no-repeat
          center;
      }
      .prrError {
        background: url("../../../../public/three/system/prrError.png")
          no-repeat center;
      }
      .cam {
        background: url("../../../../public/three/system/cam.png") no-repeat
          center;
      }
      .movement {
        background: url("../../../../public/three/system/movement.png")
          no-repeat center;
      }
      .pin {
        background: url("../../../../public/three/system/pin.png") no-repeat
          center;
      }
    }
    .box-normal {
      border-image: linear-gradient(
          0deg,
          rgba(0, 255, 255, 1),
          rgba(0, 255, 255, 1),
          rgba(0, 255, 255, 1)
        )
        10 10;
    }
    .box-error {
      border-image: linear-gradient(
          0deg,
          rgba(255, 48, 78, 1),
          rgba(255, 48, 78, 1),
          rgba(255, 48, 78, 1)
        )
        10 10;
    }
  }
}
.textLine {
  width: 100%;
  height: 5px;
  line-height: 5px;
  background: url("../../../../public/three/system/textLine.png") no-repeat
    center;
}
.panel-title {
  width: 100%;
  height: 20px;
  .panel-chTitle {
    width: 26%;
    height: 20px;
    font-size: 20px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    float: left;
    text-align: center;
  }
  .panel-enTitle {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 255, 255, 1);
    opacity: 0.5;
    float: right;
    width: 74%;
    border-bottom: 2px solid rgba(0, 255, 255, 1);
  }
}
#base {
  position: fixed;
  bottom: 0px;
  left: 50%;
  width: 350px;
  height: 120px;
  z-index: 999;
  margin: auto;
  background: url("https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/eastcom/base.png") no-repeat center;
  background-size: contain;
  transform: translate(-50%);
}
#options {
  position: fixed;
  z-index: 1000;
  left: 50%;
  top: 105px;
  width: 312px;
  transform: translate(-50%);
  background: rgba(0, 30, 36, 0.3);
  height: 48px;
}
#view {
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("https://airbag-1257360572.cos.ap-beijing.myqcloud.com/img/eastcom/bg.png") no-repeat center;
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
      height: 34px;
      line-height: 34px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 255, 255, 1);
      text-align: center;
      width: 100%;
    }
  }
}
#leftBtn {
  display: none;
  background: url("../../../../public/three/system/leftBtn.png") no-repeat
    center;
  width: 60px;
  height: 42px;
  position: fixed;
  top: 50%;
  left: 0;
}
#rightBtn {
  display: none;
  background: url("../../../../public/three/system/rightBtn.png") no-repeat
    center;
  width: 60px;
  height: 42px;
  position: fixed;
  top: 50%;
  right: 0;
}
@media screen and (max-width: 1000px) {
  #header {
    top: 0;
    #header-left {
      width: 20%;
    }
    #header-right {
      width: 20%;
    }
    #chTitle {
      width: 60%;
      font-size: 18px;
      line-height: 60px;
    }
    #line-left {
      width: 25%;
    }
    #line-right {
      width: 25%;
    }
    #enTitle {
      width: 50%;
      font-size: 12px;
      margin-top: -10px;
    }
    #quit {
      position: fixed;
      bottom: 1px;
      top: unset;
      right: 0;
      width: 80px;
      height: 48px;
      background: rgb(0, 30, 36);
      border-radius: 0px;
      line-height: 48px;
      font-size: 14px;
    }
  }
  #options {
    top: 108px;
  }
  #terminal-info {
    display: none;
    width: 340px;
    background: rgb(0, 30, 36);
    z-index: 1100;
  }
  #terminal-state {
    display: none;
    width: 340px;
    background: rgb(0, 30, 36);
    z-index: 1100;
  }
  #cashBox-info {
    display: none;
    width: 340px;
    background: rgb(0, 30, 36);
    z-index: 1100;
  }
  #cashBox-state {
    display: none;
    width: 360px;
    background: rgb(0, 30, 36);
    z-index: 1100;
  }
  #terminal-model {
    display: none;
    width: 340px;
    background: rgb(0, 30, 36);
  }
  #leftBtn {
    display: block;
  }
  #rightBtn {
    display: block;
  }
}
</style>

<style scoped>
#options >>> .el-checkbox {
  color: rgba(28, 239, 233, 0.4);
  margin-right: 10px;
  line-height: normal;
}
#options >>> .el-checkbox__inner {
  background-color: rgba(0, 96, 116, 1);
  border: 1px solid rgba(0, 255, 255, 1);
}
#options >>> .el-checkbox__input.is-checked + .el-checkbox__label {
  color: rgba(28, 239, 233, 1);
}
</style>

<style lang="scss">
.dg.ac {
  z-index: 1000;
  left: 50%;
  top: 0px;
  transform: translate(-50%);
  right: unset;
  width: 245px;
}
</style>

<style>
@media screen and (max-width: 500px) {
  #stats {
    left: 0 !important;
  }
}
</style>