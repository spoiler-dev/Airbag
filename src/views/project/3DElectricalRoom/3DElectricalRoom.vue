<template>
  <div>
    <div id="banner">
      <i class="el-icon-d-arrow-left" id="back"></i>
      <span>3D 电气室实时监控系统</span>
    </div>
    <div id="view"></div>
  </div>
</template>

<script>
export default {
  name: '',
  props: [''],
  data() {
    return {}
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    let _this = this
    let three = {
      scene: null,
      camera: null,
      renderer: null,
      light: null,
      controls: null,
      width: null,
      height: null,
      stats: null,
      background: 0x1e1e24,
      helper: null,
      gui: null,
      datGui: null,
      loop: null
    }
    let geometry = null,
      material = null,
      texture = null,
      loader = null,
      model = null,
      modelClone = null,
      object = null,
      objectClone = null,
      geo = null,
      mat = null,
      mod = null,
      bsp = null,
      equip = null
    // 机箱名称
    let describArr = [],
      // 机箱位置
      machinePositionArr = [],
      // 空调位置
      airPositionArr = [],
      // 烟感位置
      smokePositionArr = [],
      // 温感位置
      temperaturePositionArr = [],
      // 控制器位置
      controllerPositionArr = [],
      // 名称位置
      fontPositionArr = [],
      // 底座的长宽
      gridWidth = null,
      gridLength = null,
      timer0 = null,
      timer1 = null

    init()
    // 返回上一级页面
    document.getElementById('back').addEventListener('click', () => {
      clearThree()
    })

    // 请求机柜数据
    function init() {
      let arr = []
      _this.$axios(_this.HOST + '/cabinet')
        .then(res => {
          // 机柜空调坐标、名称以及名称坐标
          $.each(res.data[0].describ, function (index, val) {
            if (val.CABINET_TYPE === '0') {
              machinePositionArr.push(val.CABINET_COORDINATE.split(','))
            } else if (val.CABINET_TYPE === '1') {
              airPositionArr.push(val.CABINET_COORDINATE.split(','))
            }
            fontPositionArr.push(val.DESCRIB_COORDINATE.split(','))
            describArr.push(val.CABINET_NAME)
          })
          // 烟感、温感、控制器坐标
          $.each(res.data[0].equipInfo, function (index, val) {
            // 温感
            if (val.eqType === '02') {
              temperaturePositionArr.push(val.EQ_COORDINATE.split(','))
              // 烟感
            } else if (val.eqType === '03') {
              smokePositionArr.push(val.EQ_COORDINATE.split(','))
              // 控制器
            } else if (val.eqType === '25' || '29') {
              controllerPositionArr.push(val.EQ_COORDINATE.split(','))
            }
          })
          let partSize = []
          partSize = (res.data[0].partSize).split('*')
          gridLength = parseInt(partSize[1])
          gridWidth = parseInt(partSize[0])
          workshop()
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
    // 3D场景构造
    function workshop() {
      three.width = document.getElementById('view').offsetWidth
      three.height = document.getElementById('view').offsetHeight
      // 建造场景
      function initScene() {
        three.scene = new THREE.Scene()
        three.scene.position.z = 120
      }
      // 初始化dat.GUI简化试验流程
      function initGui() {
        // 声明一个保存需求修改的相关数据的对象
        three.gui = {
          x: 0,
          y: 0,
          z: 120
        }
        three.datGui = new dat.GUI()
        three.datGui.domElement.setAttribute('id', 'datGui')
        // 将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
        three.datGui.add(three.gui, 'x', -500, 500)
        three.datGui.add(three.gui, 'y', -500, 500)
        three.datGui.add(three.gui, 'z', -500, 500)
      }
      // 透视投影相机
      function initCamera() {
        // 可视角度，显示口的宽高比，近裁剪面，远裁剪面
        three.camera = new THREE.PerspectiveCamera(35, three.width / three.height, 0.1, 3000)
        three.camera.position.set(0, 1000, 1100)
        // 设置摄像机观察的方向
        three.camera.lookAt(new THREE.Vector3(0, 2500, 0))
      }
      // 渲染器
      function initRender() {
        // 新建一个渲染器, 渲染器用来输出最终结果
        three.renderer = new THREE.WebGLRenderer({
          antialias: true
        })
        // 设置渲染的尺寸, 在这里是浏览器尺寸
        three.renderer.setSize(three.width, three.height)
        // 设置背景的颜色
        three.renderer.setClearColor(three.background)
        // 设置是否开启投影, 开启的话, 光照会产生投影
        three.renderer.shadowMap.enabled = true
        // 设置投影类型, 这边是柔和投影
        three.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        // 创建 canvas
        document.getElementById('view').appendChild(three.renderer.domElement)
      }
      // 光源
      function initLight() {
        // 平行的一束光，模拟从很远处照射的太阳光
        // DirectionalLight( color, intensity )
        // color — 光的颜色值，十六进制，默认值为0xffffff,intensity — 光的强度，默认值为1
        three.light = new THREE.DirectionalLight(0xffffff, 1)
        three.light.position.set(500, 1000, 500)
        three.light.target.position.set(0, 0, 0)
        three.light.castShadow = false
        const d = 300
        // 正交投影相机
        // let camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far)
        three.light.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600)
        three.light.shadow.bias = 0.0001
        three.light.shadow.mapSize.width = three.light.shadow.mapSize.height = 1024
        three.scene.add(three.light)
        // 环境光( AmbientLight )：笼罩在整个空间无处不在的光
        three.scene.add(new THREE.AmbientLight(0xffffff, 0.3))
      }
      // 渲染字体
      function initModel() {
        // 辅助工具
        three.helper = new THREE.AxisHelper(1000)
        three.scene.add(three.helper)
        // 文字模型
        function fontModel() {
          loader = new THREE.FontLoader()
          loader.load('three/font/MicrosoftYaHei_Regular.json', function (res) {
            for (let i = 0, l = fontPositionArr.length; i < l; i++) {
              geometry = new THREE.TextBufferGeometry(describArr[i], {
                font: res,
                size: 11,
                height: 1
              })
              // 运行以后设置font的boundingBox属性对象，如果不运行无法获得。
              geometry.computeBoundingBox()
              material = new THREE.MeshLambertMaterial({})
              model = new THREE.Mesh(geometry, material)
              // 设置位置
              modelClone = model.clone()
              modelClone.position.set(fontPositionArr[i][0], fontPositionArr[i][1],
                fontPositionArr[i][2])
              three.scene.add(modelClone)
            }
          })
        }
        // 底座
        function base() {
          // 创建底座 长/宽/高
          geometry = new THREE.BoxBufferGeometry(gridWidth, 10, gridLength)
          // 设置材质
          texture = new THREE.TextureLoader().load('three/img/floor.jpg')
          texture.wrapS = THREE.RepeatWrapping
          texture.wrapT = THREE.RepeatWrapping
          texture.repeat.set(8, 8)
          material = new THREE.MeshLambertMaterial({
            map: texture,
            color: 0xc6e2ff
          })
          model = new THREE.Mesh(geometry, material)
          model.rotation.z = -Math.PI
          model.position.y = -1
          model.name = 'base'
          three.scene.add(model)
        }
        // 房间主结构
        function room() {
          // 墙
          object = new THREE.Object3D()
          geometry = new THREE.BoxGeometry(20, 90, gridLength)
          material = new THREE.MeshPhongMaterial({
            color: 0xC6E2FF
          })

          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 45, 0)
          object.add(model)

          geometry = new THREE.BoxGeometry(4, 200, gridLength - 10)
          material = new THREE.MeshBasicMaterial({
            color: 0x00BFFF,
            opacity: 0.6,
            transparent: true
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 145, 0)
          object.add(model)

          geometry = new THREE.BoxGeometry(20, 30, gridLength)
          material = new THREE.MeshPhongMaterial({
            color: 0xC6E2FF
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 240, 0)
          object.add(model)
          object.position.set((-gridWidth / 2) - 10, -5, 0)
          three.scene.add(object)

          objectClone = object.clone()
          objectClone.position.set((gridWidth / 2) + 10, -5, 0)
          three.scene.add(objectClone)
        }
        // 机柜
        function machine() {
          // 机柜
          object = new THREE.Object3D()
          // 机柜正面
          texture = new THREE.TextureLoader().load(
            'three/img/rack_front_door.jpg'
          )
          material = new THREE.MeshPhongMaterial({
            map: texture
          })
          geometry = new THREE.BoxGeometry(2, 300, 150)
          model = new THREE.Mesh(geometry, material)
          model.rotation.y = -0.5 * Math.PI
          model.position.set(0, 152, 0)
          object.add(model)
          // 机柜背面
          texture = new THREE.TextureLoader().load(
            'three/img/rack_door_back.jpg'
          )
          material = new THREE.MeshPhongMaterial({
            map: texture
          })
          geometry = new THREE.BoxGeometry(2, 300, 150)
          model = new THREE.Mesh(geometry, material)
          model.rotation.y = -0.5 * Math.PI
          model.position.set(0, 152, -140)
          object.add(model)
          // 机柜左侧
          texture = new THREE.TextureLoader().load(
            'three/img/rack_panel.jpg'
          )
          material = new THREE.MeshPhongMaterial({
            map: texture,
            color: 0x383838
          })
          geometry = new THREE.BoxGeometry(2, 300, 140)
          model = new THREE.Mesh(geometry, material)
          model.position.set(-75, 152, -70)
          object.add(model)
          // 机柜右侧
          modelClone = model.clone()
          modelClone.position.set(75, 152, -70)
          object.add(modelClone)
          // 机柜底部
          texture = new THREE.TextureLoader().load(
            'three/img/rack_panel.jpg'
          )
          material = new THREE.MeshPhongMaterial({
            map: texture,
            color: 0x383838
          })
          geometry = new THREE.BoxGeometry(150, 2, 140)
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 2, -70)
          object.add(model)
          // 机柜顶部
          texture = new THREE.TextureLoader().load(
            'three/img/rack_panel.jpg'
          )
          material = new THREE.MeshPhongMaterial({
            map: texture,
            color: 0x383838
          })
          geometry = new THREE.BoxGeometry(140, 40, 150)
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 290, -70)
          object.add(model)
          object.name = 'machine'
          // 机柜克隆
          for (let i = 0, l = machinePositionArr.length; i < l; i++) {
            objectClone = object.clone()
            objectClone.position.set(machinePositionArr[i][0], machinePositionArr[i][1],
              machinePositionArr[i][2])
            three.scene.add(objectClone)
          }
        }
        // 空调
        function air() {
          // 空调
          object = new THREE.Object3D()
          // 空调正面
          texture = new THREE.TextureLoader().load(
            'three/img/rack_inside.jpg'
          )
          material = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0xffffff
          })
          geometry = new THREE.BoxGeometry(2, 300, 150)
          model = new THREE.Mesh(geometry, material)
          // 空调正面打孔
          geo = new THREE.BoxGeometry(2, 60, 120)
          mat = new THREE.MeshPhongMaterial({
            color: 0x4a708b
          })
          mod = new THREE.Mesh(geo, mat)
          mod.position.y = 87
          bsp = new ThreeBSP(model).subtract(new ThreeBSP(mod))
          geo = new THREE.BoxGeometry(2, 40, 35)
          mat = new THREE.MeshPhongMaterial({
            color: 0x4a708b
          })
          mod = new THREE.Mesh(geo, mat)
          mod.position.y = -118
          bsp = bsp.subtract(new ThreeBSP(mod))
          mod = mod.clone()
          mod.position.z = 45
          bsp = bsp.subtract(new ThreeBSP(mod))
          mod = mod.clone()
          mod.position.z = -45
          bsp = bsp.subtract(new ThreeBSP(mod))
          model = bsp.toMesh()
          // 更新模型的面和顶点的数据
          model.geometry.computeFaceNormals()
          model.geometry.computeVertexNormals()
          model.material = new THREE.MeshPhongMaterial({
            color: 0xebebeb
          })
          model.rotation.y = -0.5 * Math.PI
          model.position.set(0, 152, 0)
          object.add(model)
          // 缺口处补充网格
          texture = new THREE.TextureLoader().load(
            'three/img/flag.jpg'
          )
          material = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0xffffff
          })
          geometry = new THREE.BoxGeometry(120, 60, 2)
          model = new THREE.Mesh(geometry, material)
          model.position.z = 0
          model.position.y = 240
          object.add(model)
          texture = new THREE.TextureLoader().load(
            'three/img/eee.png'
          )
          material = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0xffffff
          })
          geometry = new THREE.BoxGeometry(35, 40, 2)
          model = new THREE.Mesh(geometry, material)
          model.position.z = 0
          model.position.y = 35
          object.add(model)
          model = model.clone()
          model.position.x = 45
          object.add(model)
          model = model.clone()
          model.position.x = -45
          object.add(model)
          // 密码锁
          texture = new THREE.TextureLoader().load(
            'three/img/lock.png'
          )
          material = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0xffffff
          })
          geometry = new THREE.BoxGeometry(18, 24, 10)
          model = new THREE.Mesh(geometry, material)
          model.position.y = 166
          model.position.x = 0
          object.add(model)
          // 空调背面
          texture = new THREE.TextureLoader().load(
            'three/img/rack_inside.jpg'
          )
          material = new THREE.MeshPhongMaterial({
            map: texture,
            color: 0xffffff
          })
          geometry = new THREE.BoxGeometry(2, 300, 150)
          model = new THREE.Mesh(geometry, material)
          model.rotation.y = -0.5 * Math.PI
          model.position.set(0, 152, -140)
          object.add(model)
          // 空调左侧面
          texture = new THREE.TextureLoader().load(
            'three/img/rack_inside.jpg'
          )
          material = new THREE.MeshPhongMaterial({
            map: texture,
            color: 0xffffff
          })
          geometry = new THREE.BoxGeometry(2, 300, 140)
          model = new THREE.Mesh(geometry, material)
          model.position.set(-75, 152, -70)
          object.add(model)
          // 空调右侧面
          model = model.clone()
          model.position.set(75, 152, -70)
          object.add(model)
          // 空调底部
          texture = new THREE.TextureLoader().load(
            'three/img/rack_inside.jpg'
          )
          material = new THREE.MeshPhongMaterial({
            map: texture,
            color: 0xffffff
          })
          geometry = new THREE.BoxGeometry(150, 2, 140)
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 2, -70)
          object.add(model)
          // 空调顶部
          texture = new THREE.TextureLoader().load(
            'three/img/rack_inside.jpg'
          )
          material = new THREE.MeshPhongMaterial({
            map: texture,
            color: 0x63b8ff
          })
          geometry = new THREE.BoxGeometry(140, 40, 150)
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 290, -70)
          object.add(model)
          object.name = 'air'
          // 空调克隆
          for (let i = 0, l = airPositionArr.length; i < l; i++) {
            objectClone = object.clone()
            objectClone.position.set(airPositionArr[i][0], airPositionArr[i][1],
              airPositionArr[i][2])
            three.scene.add(objectClone)
          }
        }
        // 烟感
        function smoke(x, y, z, i) {
          // 烟感
          object = new THREE.Object3D()
          // 底座
          geometry = new THREE.CylinderGeometry(20, 20, 10, 40, 5)
          material = new THREE.MeshPhongMaterial({
            color: 0xe8e8e8
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 96, 0)
          object.add(model)
          // 玻璃体
          geometry = new THREE.CylinderGeometry(16, 16, 4, 40, 5)
          material = new THREE.MeshBasicMaterial({
            color: 0x008b00,
            opacity: 0.4,
            transparent: true
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 102, 0)
          object.add(model)
          // 顶部
          geometry = new THREE.CylinderGeometry(8, 10, 5, 40, 5)
          material = new THREE.MeshPhongMaterial({
            color: 0xe8e8e8
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 106, 0)
          object.add(model)
          object.name = `smoke-${i}`
          object.position.set(x, y, z)
          return object
        }
        // 温感
        function temperature(x, y, z, i) {
          // 温感
          object = new THREE.Object3D()
          // 温感底座
          geometry = new THREE.CylinderGeometry(20, 20, 10, 40, 40)
          material = new THREE.MeshPhongMaterial({
            color: 0xe8e8e8
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 96, 0)
          object.add(model)
          // 玻璃体
          geometry = new THREE.CylinderGeometry(20, 20, 8, 40, 5)
          material = new THREE.MeshPhongMaterial({
            color: 0x000080,
            opacity: 0.8,
            transparent: true
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 105, 0)
          object.add(model)
          // 温感顶部
          geometry = new THREE.SphereGeometry(20, 20, 6, 0, Math.PI * 2, 0, Math.PI / 2)
          material = new THREE.MeshPhongMaterial({
            color: 0xe8e8e8
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 109, 0)
          object.add(model)
          object.name = `temperature-${i}`
          object.position.set(x, y, z)
          return object
        }
        // 控制器
        function controller(x, y, z, i) {
          // 控制器
          object = new THREE.Object3D()
          // 控制器主体
          geometry = new THREE.BoxGeometry(40, 30, 40)
          material = new THREE.MeshPhongMaterial({
            color: 0xe8e8e8,
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 103, 0)
          object.add(model)
          // 控制器左侧
          geometry = new THREE.BoxGeometry(9, 26, 43)
          material = new THREE.MeshPhongMaterial({
            color: 0x848484,
            opacity: 0.9,
            transparent: true
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(-20, 96, 0)
          object.add(model)
          // 控制器右侧
          model = model.clone()
          model.position.set(20, 96, 0)
          object.add(model)
          // 控制器指示灯
          geometry = new THREE.CircleGeometry(1.4, 36, 0, Math.PI * 2)
          material = new THREE.MeshPhongMaterial({
            color: 0x00ee00,
            opacity: 0.9,
            transparent: true
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(-10, 107, 21)
          object.add(model)
          material = new THREE.MeshPhongMaterial({
            color: 0xeeee00,
            opacity: 0.9,
            transparent: true
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(-5, 107, 21)
          object.add(model)
          material = new THREE.MeshPhongMaterial({
            color: 0xee0000,
            opacity: 0.9,
            transparent: true
          })
          model = new THREE.Mesh(geometry, material)
          model.position.set(0, 107, 21)
          object.add(model)
          // 控制器按钮组
          geometry = new THREE.BoxGeometry(10, 6, 0.5)
          material = new THREE.MeshPhongMaterial({
            color: 0x4a708b
          })
          model = new THREE.Mesh(geometry, material)
          model.castShadow = false
          model.position.set(-3, 98, 21)
          object.add(model)
          modelClone = model.clone()
          modelClone.position.set(9, 98, 21)
          object.add(modelClone)
          object.name = `controller-${i}`
          object.position.set(x, y, z)
          return object
        }
        // 创造温感、烟感、控制器
        // 注：因为具有分别闪烁功能，因此不能使用 Clone 方法
        function inventor() {
          for (let i = 0, l = smokePositionArr.length; i < l; i++) {
            equip = smoke(smokePositionArr[i][0], smokePositionArr[i][1], smokePositionArr[
              i][2], i)
            three.scene.add(equip)
          }
          for (let i = 0, l = temperaturePositionArr.length; i < l; i++) {
            equip = temperature(temperaturePositionArr[i][0], temperaturePositionArr[i][1],
              temperaturePositionArr[i][2], i)
            three.scene.add(equip)
          }
          for (let i = 0, l = controllerPositionArr.length; i < l; i++) {
            equip = controller(controllerPositionArr[i][0], controllerPositionArr[i][1],
              controllerPositionArr[i][2], i)
            three.scene.add(equip)
          }
        }
        // 文字模型
        fontModel()
        // 底座
        base()
        // 墙体
        room()
        // 机柜
        machine()
        // 空调
        air()
        // 温感、烟感、控制器
        inventor()
      }
      // 动画
      function animate() {
        let alarm = {
          // 烟感状态
          arr1: [],
          // 温感状态
          arr2: [],
          // 控制器状态
          arr3: [],
          surge: null,
          smoke: [],
          temperature: [],
          controller: []
        }
        // 请求闪光信息
        _this.$axios(_this.HOST + '/cabinet')
          .then(res => {
            $.each(res.data[0].equipInfo, function (index, val) {
              // 温感
              if (val.eqType === '02') {
                // 连接正常
                if (val.Quality === 'OPC_QUALITY_GOOD') {
                  if (val.State === '0') {
                    alarm.arr1.push('normal')
                  } else if (val.State === '1') {
                    alarm.arr1.push('fire')
                  } else if (val.State === '4') {
                    alarm.arr1.push('fault')
                  }
                } else if (val.Quality === 'OPC_QUALITY_NOT_CONNECTED') {
                  alarm.arr1.push('interrupt')
                }
                // 烟感
              } else if (val.eqType === '03') {
                if (val.Quality === 'OPC_QUALITY_GOOD') {
                  if (val.State === '0') {
                    alarm.arr2.push('normal')
                  } else if (val.State === '1') {
                    alarm.arr2.push('fire')
                  } else if (val.State === '4') {
                    alarm.arr2.push('fault')
                  }
                } else if (val.Quality === 'OPC_QUALITY_NOT_CONNECTED') {
                  alarm.arr2.push('interrupt')
                }
                // 控制器
              } else if (val.eqType === '25' || '29') {
                if (val.Quality === 'OPC_QUALITY_GOOD') {
                  if (val.State === '0') {
                    alarm.arr3.push('normal')
                  } else if (val.State === '1') {
                    alarm.arr3.push('fire')
                  } else if (val.State === '4') {
                    alarm.arr3.push('fault')
                  }
                } else if (val.Quality === 'OPC_QUALITY_NOT_CONNECTED') {
                  alarm.arr3.push('interrupt')
                }
              }
            })
            // 筛选数组
            for (let i = 0, l = three.scene.children.length; i < l; i++) {
              let name = three.scene.children[i].name
              if (name) {
                if (name.substr(0, name.length - 2) === 'smoke') {
                  alarm.smoke.push(three.scene.children[i])
                } else if (name.substr(0, name.length - 2) === 'temperature') {
                  alarm.temperature.push(three.scene.children[i])
                } else if (name.substr(0, name.length - 2) === 'controller') {
                  alarm.controller.push(three.scene.children[i])
                }
              }
            }
            // 烟感闪光
            for (let i = 0, l = alarm.smoke.length; i < l; i++) {
              blink(alarm.arr1[i], alarm.smoke[i].children[2])
            }
            // 温感闪光
            for (let i = 0, l = alarm.temperature.length; i < l; i++) {
              blink(alarm.arr2[i], alarm.temperature[i].children[2])
            }
            // 控制器闪光
            for (let i = 0, l = alarm.controller.length; i < l; i++) {
              blink(alarm.arr3[i], alarm.controller[i].children[0])
            }
            console.log(res.data)
          })
          .catch(error => {
            console.log(error)
          })
        // 10s请求数据
        timer0 = setTimeout(() => {
          timer1 = null
          animate()
        }, 10000)
      }
      // 闪光动画
      function blink(flag, equip) {
        let colorindex = 0,
          colorArray = []
        if (flag === 'interrupt') {
          colorArray = [0xe8e8e8, 0xeeee00]
          timer(colorindex, colorArray)
        } else if (flag === 'fault') {
          colorArray = [0xe8e8e8, 0xff8247]
          timer(colorindex, colorArray)
        } else if (flag === 'fire') {
          colorArray = [0xe8e8e8, 0xee0000]
          timer(colorindex, colorArray)
        }
        // 颜色更替
        function timer(colorindex, colorArray) {
          colorindex++
          if (colorindex === 2) {
            colorindex = 0
          }
          equip.material.color.set(colorArray[colorindex])
          timer1 = setTimeout(() => {
            timer(colorindex, colorArray)
          }, 1000)
        }
      }
      // 初始化性能插件
      function initStats() {
        three.stats = new Stats()
        three.stats.domElement.setAttribute('id', 'stats')
        document.body.appendChild(three.stats.dom)
      }
      // 鼠标控制
      function initControls() {
        three.controls = new THREE.OrbitControls(three.camera, three.renderer.domElement)
        // 设置控制器的中心点
        // controls.target.set( 0, 5, 0 )
        // 如果使用animate方法时，将此函数删除
        // controls.addEventListener( 'change', render )
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        three.controls.enableDamping = true
        // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
        three.controls.dampingFactor = 0.25
        // 旋转速度
        three.controls.rotateSpeed = 0.35
        // 是否可以缩放
        three.controls.enableZoom = true
        // 是否自动旋转
        three.controls.autoRotate = false
        three.controls.autoRotateSpeed = 0.5
        // 设置相机距离原点的最远距离
        three.controls.minDistance = 1
        // 设置相机距离原点的最远距离
        three.controls.maxDistance = 2000
        // 是否开启右键拖拽
        three.controls.enablePan = true
      }

      function loop() {
        // 更新性能插件
        three.stats.update()
        // 渲染器开始渲染, scene 和 camera 是必须参数, 因为场景里有动画, 所以放在 loop 里循环
        three.renderer.render(three.scene, three.camera)
        // 更新相关位置
        three.scene.position.x = three.gui.x
        three.scene.position.y = three.gui.y
        three.scene.position.z = three.gui.z
        // three.controls.update()
        three.loop = requestAnimationFrame(loop)
      }
      // 窗口自适应
      function onWindowResize() {
        window.addEventListener('resize', function () {
          three.width = document.getElementById('view').offsetWidth
          three.height = document.getElementById('view').offsetHeight
          three.camera.aspect = three.width / three.height
          three.camera.updateProjectionMatrix()
          three.renderer.setSize(three.width, three.height)
        })
      }

      function draw() {
        // 兼容性判断
        if (!Detector.webgl) Detector.addGetWebGLMessage()
        initScene()
        initGui()
        initCamera()
        initRender()
        initLight()
        initModel()
        animate()
        initControls()
        initStats()
        loop()
        onWindowResize()
      }
      // 执行函数
      draw()
    }
    // 释放内存
    function clearThree() {
      cancelAnimationFrame(three.loop)
      material.dispose()
      texture.dispose()
      geometry.dispose()
      three.renderer.dispose()
      three.controls.dispose()
      for (let i = three.scene.children.length - 1; i > -1; i--) {
        if (three.scene.children[i].type == 'Object3D') {
          for (let q = three.scene.children[i].children.length - 1; q > -1; q--) {
            if (three.scene.children[i].children[q].material.map) {
              three.scene.children[i].children[q].material.map.dispose()
            }
            three.scene.children[i].children[q].geometry.dispose()
            three.scene.children[i].children[q].material.dispose()
            three.scene.children[i].remove(three.scene.children[i].children[q])
          }
        } else if (three.scene.children[i].type == 'Mesh') {
          if (three.scene.children[i].material.map) {
            three.scene.children[i].material.map.dispose()
          }
          three.scene.children[i].geometry.dispose()
          three.scene.children[i].material.dispose()
        } else if (three.scene.children[i].type == 'LineSegments') {
          three.scene.children[i].geometry.dispose()
          three.scene.children[i].material.dispose()
        }
        three.scene.remove(three.scene.children[i])
      }
      three.renderer = null
      three.scene = null
      document.getElementById('stats').parentNode.removeChild(document.getElementById('stats'))
      document.getElementById('datGui').parentNode.removeChild(document.getElementById('datGui'))
      timer0 = null
      _this.$router.push({
        name: 'works'
      })
    }
  },

  methods: {},

  watch: {}

}
</script>

<style lang='scss' scoped>
  #banner {
    text-align: center;
    width: 320px;
    height: 32px;
    line-height: 32px;
    z-index: 1000;
    color: whitesmoke;
    position: fixed;
    right: 10px;
    left: 50%;
    margin-left: -160px;
    background: rgba(197, 200, 206, 0.83);
    border-radius: 10px;
    margin-top: 10px;

    #back {
      margin-right: 20px;
      color: #0181F3;
    }
  }

  #view {
    padding: 0;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    canvas {
      display: block;
    }
  }
</style>