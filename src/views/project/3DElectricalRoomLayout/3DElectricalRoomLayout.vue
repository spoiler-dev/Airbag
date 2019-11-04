<template>
  <div>
    <!-- 平面设计模块 -->
    <div class="both-content" id="flat">
      <!-- 侧边栏 -->
      <div class="left-dashboard">
        <!-- 机器类型选择 -->
        <nav class="left-nav">
          <div class="nav-list">
            <div class="nav-label">选择机柜或空调</div>
            <div class="nav-zone">
              <div class="nav-box">
                <p class="nav-box-title">机柜</p>
                <div class="nav-box-machine drag" type="machine">
                  <img src="three/img/machine.png" class="drag-img" id="drag-machine">
                </div>
              </div>
              <div class="nav-box">
                <p class="nav-box-title">空调</p>
                <div class="nav-box-machine drag" type="air">
                  <img src="three/img/air.png" class="drag-img" id="drag-air">
                </div>
              </div>
            </div>
          </div>
          <div class="nav-list">
            <div class="nav-label">选择设备</div>
            <div class="equip-box">
              <div class="equip-title">烟感</div>
              <div class="equip-moudle drag" type="smoke">
                <img src="three/img/smoke.png">
              </div>
            </div>
            <div class="equip-box">
              <div class="equip-title">温感</div>
              <div class="equip-moudle drag" type="temperature">
                <img src="three/img/temperature.png">
              </div>
            </div>
            <div class="equip-box">
              <div class="equip-title">控制器</div>
              <div class="equip-moudle drag" type="control">
                <img src="three/img/control.png">
              </div>
            </div>
          </div>
        </nav>
      </div>
      <!-- 右侧模块 -->
      <div class="right-dashboard1">
        <div class="right-dashboard-top">
          <!-- 创建电气室 -->
          <div class="create-axis">
            <span class="axis-label"> W：</span>
            <input type="text" id="grid-width" class="coordinate-input">
            <img class="items-link" src="three/img/link.png">
            <span class="axis-label"> H：</span>
            <input type="text" id="grid-length" class="coordinate-input">
            <button id="create-button" class="create-button">创建网格</button>
            <button id="submit-button" class="create-button">提交</button>
            <button id="cancel-button" class="create-button">返回</button>
          </div>
        </div>
        <div class="right-dashboard-bottom" id="right-dashboard-bottom">
          <div class="axis-orign"></div>
          <!-- 标尺 -->
          <div id="axis-x"></div>
          <div id="axis-y"></div>
          <!-- 画布 -->
          <div class="painting" id="painting"></div>
        </div>
      </div>
    </div>
    <!-- 3D预览模块 -->
    <div id="three-dimensional">
    </div>
    <!-- 2D 3D 切换按钮组 -->
    <div id="fixed-btn">
      <button id="tab1-button" class="tab1-button tab2-style">2D预览</button>
      <button id="tab2-button" class="tab2-button tab1-style">3D预览</button>
    </div>
    <!-- 面板控件 -->
    <div id="fixed-panel">
      <ul>
        <li>
          <div id="panel-title">选择机柜或空调</div>
        </li>
        <li class="items-li1">
          <div class="items-title">名称</div>
        </li>
        <li class="items-li2">
          <div class="items-info">
            <input id="machineName" class="items-input" type="text" placeholder="请输入名称">
          </div>
        </li>
        <li class="items-li1">
          <div class="items-title">位置</div>
        </li>
        <li class="items-li2">
          <div class="items-info info-axis">
            <span class="items-axis">X:</span>
            <input id="machineAxis-x" class="items-input-num" type="text">
            <img class="items-link" src="three/img/link.png">
            <span class="items-axis">Y:</span>
            <input id="machineAxis-y" class="items-input-num" type="text">
          </div>
        </li>
        <li class="items-li3">
          <button class="items-btn" id="items-btn">确认</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: [''],
  data() {
    return {
      ontology: '',
      delList: []
    }
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    // 生成标尺
    this.ruler()

    let _this = this
    // 电气室的高度
    let gridLength
    // 电气室的宽度
    let gridWidth
    // 机柜
    let machineHtml =
      '<div class="machine"> \
                            <div class="machine-center"> \
                                <div class="machine-position"></div> \
                            </div> \
                        </div> \
                        <div class="machine-title"> \
                            <div class="machine-title-input"></div> \
                    </div>'
    // 空调
    let airHtml =
      '<div class="machine"> \
                        <div class="air-center"> \
                            <div class="air-position"></div> \
                        </div> \
                    </div> \
                    <div class="machine-title"> \
                        <div class="machine-title-input"></div> \
                </div> '
    // 烟感
    let smokeHtml = '<img src="three/img/smoke.png" width="100%">'
    // 温感
    let temperatureHtml = '<img src="three/img/temperature.png" width="100%">'
    // 控制器
    let controlHtml = '<img src="three/img/control.png" width="100%">'
    // 实际拖拽体
    let oTemp
    // 翻转体
    let rotate
    // 悬浮层级
    let zIndex1 = 10
    let zIndex2 = 20
    let zone

    if (window.screen.width < 750) {
      $('.machine-zone').remove()
      $('.img-zone').remove()
      this.$message({
        message: '警告，本项目只支持PC端',
        type: 'warning',
        duration: 2000
      })
      setTimeout(() => {
        $('.machine-zone').remove()
        $('.img-zone').remove()
        _this.$router.push(
          {
            name: 'works'
          }
        )
      }, 3000)
    } else {
      init()
    }

  // 暂只支持 PC 端
    window.addEventListener('resize', () => {
      if (window.screen.width < 750) {
        _this.$message({
          message: '警告，本项目只支持PC端',
          type: 'warning',
          duration: 2000
        })
        setTimeout(() => {
          $('.machine-zone').remove()
          $('.img-zone').remove()
          _this.$router.push(
            {
              name: 'works'
            }
          )
        }, 3000)
      }
    })

    // 点击浏览器返回链接消除拖拽体
    window.addEventListener('popstate', function (e) {
      $('.machine-zone').remove()
      $('.img-zone').remove()
    }, false)


    // 初始化布局
    function init() {
      _this.$axios(_this.HOST + '/cabinet')
        .then(res => {
          let partSize = []
          if (res.data[0].partSize) {
            partSize = (res.data[0].partSize).split('*')
            gridLength = parseInt(partSize[1])
            gridWidth = parseInt(partSize[0])
            // 电气室的长度/宽度-文本框赋值
            document.getElementById('grid-length').value = gridLength
            document.getElementById('grid-width').value = gridWidth
            // 初始化电气室
            let right = document.getElementById('painting')
            let houseHtml = '<div id = "love-house"></div>'
            right.innerHTML = houseHtml
            let house = document.getElementById('love-house')
            house.style.width = gridWidth + 'px'
            house.style.height = gridLength + 'px'
            let x
            let y
            let arr = []
            let code
            let type
            let name
            let axis
            for (let i = 0; i < res.data[0].describ.length; i++) {
              arr = (res.data[0].describ[i].CABINET_COORDINATE).split(',')
              x = parseInt(arr[0])
              y = parseInt(arr[2])
              code = res.data[0].describ[i].ID
              if (res.data[0].describ[i].CABINET_TYPE === '0') {
                type = 'machine'
              } else if (res.data[0].describ[i].CABINET_TYPE === '1') {
                type = 'air'
              }
              name = res.data[0].describ[i].CABINET_NAME
              axis = '(' + res.data[0].describ[i].CABINET_COORDINATE + ')'
              dragLayout(x, y, code, type, name, axis)
            }
            for (let i = 0; i < res.data[0].equipInfo.length; i++) {
              arr = (res.data[0].equipInfo[i].EQ_COORDINATE).split(',')
              x = parseInt(arr[0])
              y = parseInt(arr[2])
              code = res.data[0].equipInfo[i].ID
              if (res.data[0].equipInfo[i].EQ_TYPE === '02') {
                type = 'temperature'
              } else if (res.data[0].equipInfo[i].EQ_TYPE === '03') {
                type = 'smoke'
              } else if (res.data[0].equipInfo[i].EQ_TYPE === '25' || '29') {
                type = 'control'
              }
              name = res.data[0].equipInfo[i].EQ_NAME
              axis = '(' + res.data[0].equipInfo[i].EQ_COORDINATE + ')'
              dragLayout(x, y, code, type, name, axis)
            }
            let describLine = document.getElementsByClassName('machine-title-input')
            for (let i = 0; i < res.data[0].describ.length; i++) {
              describLine[i].innerText = res.data[0].describ[i].CABINET_NAME
            }
            // 初始化拖拽布局
            function dragLayout(x, y, code, type, name, axis) {
              zone = document.getElementById('love-house')
              // x轴距离浏览器窗口顶部的位置
              let xTop = zone.getBoundingClientRect().top + zone.offsetHeight / 2
              // y轴距离浏览器窗口左部的位置
              let yLeft = zone.getBoundingClientRect().left + zone.offsetWidth / 2
              // 获取拖拽体
              let disX
              let disY
              oTemp = document.createElement('div')
              // 追加拖拽体到页面
              document.body.appendChild(oTemp)
              oTemp.setAttribute('code', code)
              oTemp.setAttribute('name', name)
              oTemp.setAttribute('axis', axis)
              if (type === 'machine') {
                // 添加多个类名
                oTemp.classList.add('machine-zone', 'machine-line')
                oTemp.setAttribute('type', 'outer')
                oTemp.innerHTML = machineHtml
                oTemp.style.zIndex = zIndex1
                disX = x + yLeft - (oTemp.offsetWidth / 2)
                disY = y + xTop + 50 - oTemp.offsetHeight
              }
              // 空调拖拽
              else if (type === "air") {
                oTemp.classList.add('machine-zone', 'air-line')
                oTemp.setAttribute('type', 'outer')
                oTemp.innerHTML = airHtml
                oTemp.style.zIndex = zIndex1
                disX = x + yLeft - (oTemp.offsetWidth / 2)
                disY = y + xTop + 50 - oTemp.offsetHeight
              } else if (type === 'smoke') {
                oTemp.classList.add('img-zone', 'smoke-line')
                oTemp.setAttribute('type', 'inner')
                oTemp.innerHTML = smokeHtml
                oTemp.style.zIndex = zIndex2
                disX = x + yLeft - (oTemp.offsetWidth / 2)
                disY = y + xTop - (oTemp.offsetHeight / 2)
              } else if (type === 'temperature') {
                oTemp.classList.add('img-zone', 'temperature-line')
                oTemp.setAttribute('type', 'inner')
                oTemp.innerHTML = temperatureHtml
                oTemp.style.zIndex = zIndex2
                disX = x + yLeft - (oTemp.offsetWidth / 2)
                disY = y + xTop - (oTemp.offsetHeight / 2)
              } else if (type === 'control') {
                oTemp.classList.add('img-zone', 'control-line')
                oTemp.setAttribute('type', 'inner')
                oTemp.innerHTML = controlHtml
                oTemp.style.zIndex = zIndex2
                disX = x + yLeft - (oTemp.offsetWidth / 2)
                disY = y + xTop - (oTemp.offsetHeight / 2)
              } else {
                console.log("类型错误")
              }

              oTemp.style.left = disX + 'px'
              oTemp.style.top = disY + 'px'
              dragD(oTemp)
            }
          }
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
    // 创建电气室
    let createGrid = document.getElementById('create-button')
    createGrid.addEventListener('click', function () {
      // 判断长宽是否存在
      gridLength = document.getElementById('grid-length').value
      gridWidth = document.getElementById('grid-width').value
      // 获取输入框内的长宽
      let reg = /^[1-9][0-9]{0,}$/
      if (!reg.test(gridLength) || !reg.test(gridWidth)) {
        _this.$alert('请输入数字!', '通知', {
          confirmButtonText: '确定'
        })
        return false
      }
      // 创建电气室
      let right = document.getElementById('painting')
      let house = document.getElementById('love-house')
      if (!house) {
        let houseHtml = '<div id="love-house"></div>'
        right.innerHTML = houseHtml
        house = document.getElementById('love-house')
      }
      house.style.width = gridWidth + 'px'
      house.style.height = gridLength + 'px'
    })
    // 赋予拖拽能力
    let oDrag = document.getElementsByClassName('drag')
    for (let i = 0; i < oDrag.length; i++) {
      drag(oDrag[i])
    }
    // 拖拽模块
    function drag(oDrag) {
      let disX = 0
      let disY = 0
      let iL = 0
      let iT = 0
      // 鼠标点击
      oDrag.onmousedown = function (event) {
        // 电气室若未创建则拖拽无效
        let house = document.getElementById('love-house')
        if (!house) {
          return false
        }
        event = event || window.event
        // 获取要拖拽div的对应类型
        let type = this.getAttribute('type')
        oTemp = document.createElement('div')

        // 机柜拖拽
        if (type === 'machine') {
          // 添加多个类名
          oTemp.classList.add('machine-zone', 'machine-line')
          oTemp.setAttribute('type', 'outer')
          oTemp.setAttribute('name', '')
          oTemp.setAttribute('axis', '')
          oTemp.setAttribute('code', '')
          oTemp.innerHTML = machineHtml
          oTemp.style.zIndex = zIndex1
          // 旋转动画
          rotate = document.getElementById('drag-machine')
          rotate.style.transform = 'rotateX(90deg)'
          rotate.src = 'three/img/machine-top.png'
          rotate.style.width = 84 + 'px'
          rotate.style.height = 84 + 'px'
          rotate.style.marginTop = 50 + 'px'
          rotate.style.transform = 'rotateX(180deg)'
        }
        // 空调拖拽
        else if (type === "air") {
          oTemp.classList.add('machine-zone', 'air-line')
          oTemp.setAttribute('type', 'outer')
          oTemp.innerHTML = airHtml
          oTemp.style.zIndex = zIndex1
          // 旋转动画
          rotate = document.getElementById('drag-air')
          rotate.style.transform = "rotateX(90deg)"
          rotate.src = 'three/img/air-top.png'
          rotate.style.width = 84 + 'px'
          rotate.style.height = 84 + 'px'
          rotate.style.marginTop = 50 + 'px'
          rotate.style.transform = 'rotateX(180deg)'
        } else if (type === 'smoke') {
          oTemp.classList.add('img-zone', 'smoke-line')
          oTemp.setAttribute('type', 'inner')
          oTemp.innerHTML = smokeHtml
          oTemp.style.zIndex = zIndex2
        } else if (type === 'temperature') {
          oTemp.classList.add('img-zone', 'temperature-line')
          oTemp.setAttribute('type', 'inner')
          oTemp.innerHTML = temperatureHtml
          oTemp.style.zIndex = zIndex2
        } else if (type === 'control') {
          oTemp.classList.add('img-zone', 'control-line')
          oTemp.setAttribute('type', 'inner')
          oTemp.innerHTML = controlHtml
          oTemp.style.zIndex = zIndex2
        } else {
          console.log('类型错误')
        }
        // 设置 position 的 top left属性
        oTemp.style.left = this.currentStyle ? this.currentStyle["left"] : getComputedStyle(this, null)["left"]
        oTemp.style.top = this.currentStyle ? this.currentStyle["top"] : getComputedStyle(this, null)["top"]
        // 追加拖拽体到页面
        document.body.appendChild(oTemp)
        // 创建x-min辅助线
        let xline1 = document.createElement('div')
        xline1['id'] = 'sup-xline1'
        xline1.style.left = this.currentStyle ? this.currentStyle["left"] : getComputedStyle(this, null)["left"]
        xline1.style.top = this.currentStyle ? this.currentStyle["top"] : getComputedStyle(this, null)["top"]
        document.body.appendChild(xline1)
        // 创建x-max辅助线
        let xline2 = document.createElement('div')
        xline2['id'] = 'sup-xline2'
        xline2.style.left = this.currentStyle ? this.currentStyle["left"] : getComputedStyle(this, null)["left"]
        xline2.style.top = this.currentStyle ? this.currentStyle["top"] : getComputedStyle(this, null)["top"]
        document.body.appendChild(xline2)
        // 创建y-min辅助线
        let yline1 = document.createElement('div')
        yline1['id'] = 'sup-yline1'
        yline1.style.left = this.currentStyle ? this.currentStyle["left"] : getComputedStyle(this, null)["left"]
        yline1.style.top = this.currentStyle ? this.currentStyle["top"] : getComputedStyle(this, null)["top"]
        document.body.appendChild(yline1)
        // 创建y-max辅助线
        let yline2 = document.createElement('div')
        yline2['id'] = 'sup-yline2'
        yline2.style.left = this.currentStyle ? this.currentStyle["left"] : getComputedStyle(this, null)["left"]
        yline2.style.top = this.currentStyle ? this.currentStyle["top"] : getComputedStyle(this, null)["top"]
        document.body.appendChild(yline2)
        // 实际拖拽体的中心
        disX = oTemp.offsetWidth / 2
        disY = oTemp.offsetHeight / 2
        // 鼠标移动
        document.onmousemove = function (event) {
          event = event || window.event
          iL = event.clientX - disX
          iT = event.clientY - disY
          let maxL = document.documentElement.clientWidth - oTemp.offsetWidth
          let maxT = document.documentElement.clientHeight - oTemp.offsetHeight
          let oTempWidth = oTemp.offsetWidth
          let oTempHeight = oTemp.offsetHeight
          // 限制在当前浏览器窗口内拖动
          iL <= 0 && (iL = 0)
          iT <= 0 && (iT = 0)
          iL >= maxL && (iL = maxL)
          iT >= maxT && (iT = maxT)
          if (oTemp.classList.contains('machine-zone') === true) {
            xline2.style.top = iT + oTempHeight - 50 + 'px'
          } else {
            xline2.style.top = iT + oTempHeight + 'px'
          }
          // 实际拖拽体的位置
          oTemp.style.left = iL + 'px'
          oTemp.style.top = iT + 'px'
          // x-min辅助线的位置
          xline1.style.left = 0
          xline1.style.top = iT + 'px'
          // x-max辅助线的位置
          xline2.style.left = 0
          // xline2.style.top = iT + oTempHeight + 'px';
          // y-min辅助线的位置
          yline1.style.left = iL + 'px'
          yline1.style.top = 0
          // y-max辅助线的位置
          yline2.style.left = iL + oTempWidth + 'px'
          yline2.style.top = 0
          return false
        }
        // 鼠标抬起
        document.onmouseup = function (event) {
          document.onmousemove = null
          document.onmouseup = null
          // 移除辅助线
          document.body.removeChild(xline1)
          document.body.removeChild(xline2)
          document.body.removeChild(yline1)
          document.body.removeChild(yline2)
          event = event || window.event
          // 拖拽体
          let width
          let height
          // 拖拽体与浏览器窗口距离
          let left
          let top
          // 拖拽范围
          let xMin
          let xMax
          let yMin
          let yMax
          // 机箱和空调移入到电气室中
          if (oTemp.getAttribute('type') === 'outer') {
            // 电气室宽度
            zone = document.getElementById('love-house')
            width = zone.offsetWidth
            // 电气室高度
            height = zone.offsetHeight
            // 获取电气室到浏览器的距离
            left = zone.getBoundingClientRect().left
            top = zone.getBoundingClientRect().top
            xMin = left + disX
            yMin = top + disY
            xMax = left + width - disX
            yMax = top + height - disY
            if ((event.clientX < xMin) || (event.clientX > xMax) || (event.clientY < yMin) || (event.clientY > yMax)) {
              document.body.removeChild(oTemp)
            }
            dragD(oTemp)
          }
          // 温感、烟感、控制器移入到机箱顶部
          else if (oTemp.getAttribute('type') === 'inner') {
            zone = document.getElementsByClassName('machine-zone')
            let arr = []
            for (let i = 0; i < zone.length; i++) {
              width = zone[i].offsetWidth
              height = zone[i].offsetHeight
              left = zone[i].offsetLeft
              top = zone[i].offsetTop
              xMin = left + disX + 15
              xMax = left + width - disX - 15
              yMin = top + disY + 5
              yMax = top + height - disY - 5
              if ((event.clientX < xMin) || (event.clientX > xMax) || (event.clientY < yMin) || (event.clientY > yMax)) {
                arr.push(0)
              } else {
                arr.push(1)
              }
            }
            // 数组中不存在1，表示未能移入机柜顶部有效范围
            if (arr.indexOf(1) === '-1') {
              document.body.removeChild(oTemp)
            }
            dragD(oTemp)
          }
          if (oDrag.children[0].getAttribute('id') === 'drag-machine') {
            rotate.style.transform = "rotateX(0deg)"
            rotate.src = 'three/img/machine.png'
            rotate.style.width = 83 + 'px'
            rotate.style.height = 147 + 'px'
            rotate.style.marginTop = 14 + 'px'
          } else if (oDrag.children[0].getAttribute('id') === 'drag-air') {
            rotate.style.transform = "rotateX(0deg)"
            rotate.src = 'three/img/air.png'
            rotate.style.width = 83 + 'px'
            rotate.style.height = 147 + 'px'
            rotate.style.marginTop = 14 + 'px'
          }
        }
        this.setCapture && this.setCapture()
        return false
      }
    }

    let panel = document.getElementById('fixed-panel')
    // 拖拽删除
    function dragD(oTemp) {
      let disX = 0
      let disY = 0
      let iL = 0
      let iT = 0
      let x1
      let y1
      let x2
      let y2
      let x3
      let y3
      let flag = ''
      oTemp.onmousedown = function (event) {
        flag = true
        event = event || window.event
        disX = oTemp.offsetWidth / 2
        disY = oTemp.offsetHeight / 2
        x1 = event.clientX
        y1 = event.clientY
        x3 = oTemp.offsetLeft
        y3 = oTemp.offsetTop
        // 创建x-min辅助线
        let xline1 = document.createElement('div')
        xline1['id'] = 'sup-xline1'
        document.body.appendChild(xline1)
        // 创建x-max辅助线
        let xline2 = document.createElement('div')
        xline2['id'] = 'sup-xline2'
        document.body.appendChild(xline2)
        // 创建y-min辅助线
        let yline1 = document.createElement('div')
        yline1['id'] = 'sup-yline1'
        document.body.appendChild(yline1)
        // 创建y-max辅助线
        let yline2 = document.createElement('div')
        yline2['id'] = 'sup-yline2'
        document.body.appendChild(yline2)

        document.onmousemove = function (event) {
          event = event || window.event
          iL = event.clientX - disX
          iT = event.clientY - disY
          x2 = event.clientX
          y2 = event.clientY
          let oTempWidth = oTemp.offsetWidth
          let oTempHeight = oTemp.offsetHeight
          if (x1 != x2 && y1 != y2) {
            flag = false;
            if (oTemp.classList.contains('machine-zone') === true) {
              xline2.style.top = iT + oTempHeight - 50 + 'px'
            } else {
              xline2.style.top = iT + oTempHeight + 'px'
            }
            oTemp.style.left = iL + 'px'
            oTemp.style.top = iT + 'px'
            // x-min辅助线的位置
            xline1.style.left = 0
            xline1.style.top = iT + 'px'
            // x-max辅助线的位置
            xline2.style.left = 0
            xline2.style.top = iT + oTempHeight + 'px'
            // y-min辅助线的位置
            yline1.style.left = iL + 'px'
            yline1.style.top = 0
            // y-max辅助线的位置
            yline2.style.left = iL + oTempWidth + 'px'
            yline2.style.top = 0
          }
          return false
        }

        document.onmouseup = function (event) {
          document.onmousemove = null
          document.onmouseup = null
          // 移除辅助线
          document.body.removeChild(xline1)
          document.body.removeChild(xline2)
          document.body.removeChild(yline1)
          document.body.removeChild(yline2)
          // 去除选中效果
          let machineZone = document.getElementsByClassName('machine')
          for (let i = 0; i < machineZone.length; i++) {
            machineZone[i].style.borderTop = 'none'
            machineZone[i].style.borderBottom = 'none'
            machineZone[i].style.borderLeft = '5px solid #666666'
            machineZone[i].style.borderRight = '5px solid #666666'
            machineZone[i].style.background = 'none'
          }
          let imgZone = document.getElementsByClassName('img-zone')
          for (let i = 0; i < imgZone.length; i++) {
            imgZone[i].style.border = 'none'
            imgZone[i].style.background = 'none'
          }
          // 判断为点击事件非拖拽事件
          let input = document.getElementById('machineName')
          let axisX = document.getElementById('machineAxis-x')
          let axisY = document.getElementById('machineAxis-y')
          if (flag) {
            let panelTitle = document.getElementById('panel-title')
            oTemp.classList.contains('machine-line') && (panelTitle.innerText = '机柜信息')
            oTemp.classList.contains('air-line') && (panelTitle.innerText = '空调信息')
            oTemp.classList.contains('smoke-line') && (panelTitle.innerText = '烟感信息')
            oTemp.classList.contains('temperature-line') && (panelTitle.innerText = '温感信息')
            oTemp.classList.contains('control-line') && (panelTitle.innerText = '控制器信息')
            _this.ontology = oTemp
            input.readOnly = false
            if (oTemp.classList.contains('machine-zone') === true) {
              oTemp.children[0].style.borderTop = '1px solid #1B86FF'
              oTemp.children[0].style.borderBottom = '1px solid #1B86FF'
              oTemp.children[0].style.borderLeft = '5px solid #1B86FF'
              oTemp.children[0].style.borderRight = '5px solid #1B86FF'
              oTemp.children[0].style.background = '#01234A'
            } else {
              oTemp.getAttribute('code') && (input.readOnly = true)
              oTemp.style.border = '1px solid #1B86FF'
              oTemp.style.background = '#01234A'
            }
            // 获取当前拖拽体的页面坐标与名称
            axisX.value = (oTemp.offsetWidth / 2) + oTemp.offsetLeft - 390
            axisY.value = (oTemp.offsetHeight / 2) + oTemp.offsetTop - 190
            input.value = oTemp.getAttribute('name')
            // 面板显示
            panel.style.display = 'block'
          } else {
            // 拖拽体
            let width
            let height
            // 拖拽体与浏览器窗口距离
            let left
            let top
            // 拖拽范围
            let xMin
            let xMax
            let yMin
            let yMax
            // 父级容器
            let zone
            // 电气室宽度
            zone = document.getElementById('love-house')
            width = zone.offsetWidth
            // 电气室高度
            height = zone.offsetHeight
            // 获取电气室到浏览器的距离
            left = zone.getBoundingClientRect().left
            top = zone.getBoundingClientRect().top
            xMin = left + disX
            yMin = top + disY
            xMax = left + width - disX
            yMax = top + height - disY
            // 获取当前拖拽体的页面坐标与名称
            axisX.value = (oTemp.offsetWidth / 2) + oTemp.offsetLeft - 390
            axisY.value = (oTemp.offsetHeight / 2) + oTemp.offsetTop - 190
            if ((event.clientX < xMin) || (event.clientX > xMax) || (event.clientY < yMin) || (event.clientY >
                yMax)) {
              _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                let id = oTemp.getAttribute('code')
                let del
                if (oTemp.classList.contains('machine-zone')) {
                  del = {
                    "ID": id,
                    "TYPE": 'cab'
                  }
                } else {
                  del = {
                    "ID": id,
                    "TYPE": 'equip'
                  }
                }
                // _this.delList.push(del)
                document.body.removeChild(oTemp)
                panel.style.display = 'none'
                _this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }).catch(() => {
                oTemp.style.left = x3 + 'px'
                oTemp.style.top = y3 + 'px'
                _this.$message({
                  type: 'info',
                  message: '已取消删除'
                })
              })
            }
          }
        }
      }
      // this.setCapture && this.setCapture();
      return false
    }

    // 点击画板，面板隐藏
    let painting = document.getElementById('painting')
    painting.addEventListener('click', function () {
      // 去选中效果
      let machineZone = document.getElementsByClassName('machine')
      for (let i = 0; i < machineZone.length; i++) {
        machineZone[i].style.borderTop = 'none'
        machineZone[i].style.borderBottom = 'none'
        machineZone[i].style.borderLeft = '5px solid #666666'
        machineZone[i].style.borderRight = '5px solid #666666'
        machineZone[i].style.background = 'none'
      }
      let imgZone = document.getElementsByClassName('img-zone')
      for (let i = 0; i < imgZone.length; i++) {
        imgZone[i].style.border = 'none'
        imgZone[i].style.background = 'none'
      }
      // 面板隐藏
      panel.style.display = 'none'
    })
    // 面板-确认按钮
    let panelBtn = document.getElementById('items-btn')
    panelBtn.addEventListener('click', function () {
      let input = document.getElementById('machineName')
      let axisX = document.getElementById('machineAxis-x')
      let axisY = document.getElementById('machineAxis-y')
      let zone = document.getElementById('love-house')
      // x轴距离浏览器窗口顶部的位置
      let xTop = zone.getBoundingClientRect().top + zone.offsetHeight / 2
      // y轴距离浏览器窗口左部的位置
      let yLeft = zone.getBoundingClientRect().left + zone.offsetWidth / 2
      // 真实坐标
      let axis
      // 根据输入的x、y坐标改变当前模块的位置
      let xChange = (axisX.value - (_this.ontology.offsetWidth / 2) + 390) + 'px'
      let yChange = (axisY.value - (_this.ontology.offsetHeight / 2) + 190) + 'px'
      _this.ontology.style.left = xChange
      _this.ontology.style.top = yChange
      // 真实坐标
      if (_this.ontology.classList.contains('machine-zone') === true) {
        let x = (_this.ontology.offsetLeft + _this.ontology.offsetWidth / 2) - yLeft
        let y = 0
        let z = (_this.ontology.offsetTop + _this.ontology.offsetHeight - 50) - xTop
        axis = "(" + x + "," + y + "," + z + ")"
        _this.ontology.children[1].children[0].innerText = input.value
      } else if (_this.ontology.classList.contains('img-zone') === true) {
        let x = (_this.ontology.offsetLeft + _this.ontology.offsetWidth / 2) - yLeft
        let y = 220
        let z = (_this.ontology.offsetTop + _this.ontology.offsetHeight / 2) - xTop
        axis = "(" + x + "," + y + "," + z + ")"
      }
      let reg = /\d{10}/
      if (reg.test(input.value)) {
        _this.ontology.setAttribute('name', input.value)
        _this.ontology.setAttribute('axis', axis)
      } else {
        _this.$alert('请输入10位数字!', '通知', {
          confirmButtonText: '确定'
        })
        return false
      }
      // 去除选中效果
      let machineZone = document.getElementsByClassName('machine');
      for (let i = 0; i < machineZone.length; i++) {
        machineZone[i].style.borderTop = 'none'
        machineZone[i].style.borderBottom = 'none'
        machineZone[i].style.borderLeft = '5px solid #666666'
        machineZone[i].style.borderRight = '5px solid #666666'
        machineZone[i].style.background = 'none'
      }
      let imgZone = document.getElementsByClassName('img-zone')
      for (let i = 0; i < imgZone.length; i++) {
        imgZone[i].style.border = 'none'
        imgZone[i].style.background = 'none'
      }
      // 面板隐藏
      panel.style.display = 'none'
    })

    // 机箱位置
    let machinePositionArr = []
    let airPositionArr = []
    let smokePositionArr = []
    let temperaturePositionArr = []
    let controllerPositionArr = []
    let fontPositionArr = []
    let describArr = []
    let machineNamePositionArr = []
    let airNamePositionArr = []
    let machineNameArr = []
    let airNameArr = []

    // 获取坐标数据
    function data() {
      let zone = document.getElementById('love-house')
      // x轴距离浏览器窗口顶部的位置
      let xTop = zone.getBoundingClientRect().top + zone.offsetHeight / 2
      // y轴距离浏览器窗口左部的位置
      let yLeft = zone.getBoundingClientRect().left + zone.offsetWidth / 2
      // 获取拖拽体
      let machineLine = document.getElementsByClassName('machine-line')
      let airLine = document.getElementsByClassName('air-line')
      let smokeLine = document.getElementsByClassName('smoke-line')
      let temperatureLine = document.getElementsByClassName('temperature-line')
      let controllerLine = document.getElementsByClassName('control-line')
      let describLine = document.getElementsByClassName('machine-title-input')
      // 机柜名称坐标根据机柜坐标计算
      let equipLine = document.getElementsByClassName('machine-zone')
      for (let i = 0; i < describLine.length; i++) {
        describArr.push(describLine[i].innerText)
      }
      for (let i = 0; i < machineLine.length; i++) {
        machineNameArr.push(machineLine[i].children[1].children[0].innerText)
      }
      for (let i = 0; i < airLine.length; i++) {
        airNameArr.push(airLine[i].children[1].children[0].innerText)
      }
      font(equipLine, fontPositionArr)
      equip(machineLine, machinePositionArr)
      equip(airLine, airPositionArr)
      coordinate(smokeLine, smokePositionArr)
      coordinate(temperatureLine, temperaturePositionArr)
      coordinate(controllerLine, controllerPositionArr)
      font(machineLine, machineNamePositionArr)
      font(airLine, airNamePositionArr)
      // 机柜名称坐标
      function font(obj, positonArr) {
        for (let i = 0; i < obj.length; i++) {
          let arr = []
          let x = obj[i].offsetLeft + 10 - yLeft
          let y = 280
          let z = obj[i].offsetTop + obj[i].offsetHeight - 45 - xTop
          arr.push(x, y, z)
          positonArr.push(arr)
        }
      }
      // 烟感、温感、控制器坐标
      function coordinate(obj, positonArr) {
        for (let i = 0; i < obj.length; i++) {
          let arr = []
          let x = (obj[i].offsetLeft + obj[i].offsetWidth / 2) - yLeft
          let y = 220
          let z = (obj[i].offsetTop + obj[i].offsetHeight / 2) - xTop
          arr.push(x, y, z)
          positonArr.push(arr)
        }
      }
      // 机柜与空调坐标
      function equip(obj, positonArr) {
        for (let i = 0; i < obj.length; i++) {
          let arr = [];
          let x = (obj[i].offsetLeft + obj[i].offsetWidth / 2) - yLeft
          let y = 0
          let z = (obj[i].offsetTop + obj[i].offsetHeight - 50) - xTop
          arr.push(x, y, z)
          positonArr.push(arr)
        }
      }
    }

    // tab页切换
    let tab1Btn = document.getElementById('tab1-button')
    let tab2Btn = document.getElementById('tab2-button')
    let flat = document.getElementById('flat')
    let threeDimensional = document.getElementById('three-dimensional')
    // 平面视图切换
    tab1Btn.addEventListener('click', function () {
      // 显示与隐藏
      tab1Btn.classList.remove('tab1-style')
      tab1Btn.classList.add('tab2-style')
      tab2Btn.classList.remove('tab2-style')
      flat.style.display = 'block'
      threeDimensional.style.display = 'none'
      // 清空canvas
      cancelAnimationFrame(three.loop)
      material.dispose()
      texture.dispose()
      geometry.dispose()
      three.renderer.dispose()
      three.controls.dispose()
      for (let i = three.scene.children.length - 1; i > -1; i--) {
        if (three.scene.children[i].type === 'Object3D') {
          for (let q = three.scene.children[i].children.length - 1; q > -1; q--) {
            if (three.scene.children[i].children[q].material.map) {
              three.scene.children[i].children[q].material.map.dispose()
            }
            three.scene.children[i].children[q].geometry.dispose()
            three.scene.children[i].children[q].material.dispose()
            three.scene.children[i].remove(three.scene.children[i].children[q])
          }
        } else if (three.scene.children[i].type === 'Mesh') {
          if (three.scene.children[i].material.map) {
            three.scene.children[i].material.map.dispose()
          }
          three.scene.children[i].geometry.dispose()
          three.scene.children[i].material.dispose()
        } else if (three.scene.children[i].type === 'LineSegments') {
          three.scene.children[i].geometry.dispose()
          three.scene.children[i].material.dispose()
        }
        three.scene.remove(three.scene.children[i])
      }
      three.renderer = null
      three.scene = null
      document.getElementById('stats').parentNode.removeChild(document.getElementById('stats'))
      document.getElementById('datGui').parentNode.removeChild(document.getElementById('datGui'))
      threeDimensional.innerHTML = ''
    })
    // 3D视图切换
    tab2Btn.addEventListener('click', function () {
      // 面板隐藏
      panel.style.display = 'none'
      tab2Btn.classList.remove('tab1-style')
      tab2Btn.classList.add('tab2-style')
      tab1Btn.classList.remove('tab2-style')
      // 显示与隐藏
      data()
      flat.style.display = 'none'
      threeDimensional.style.display = 'block'
      workshop()
      // 数据清空
      machinePositionArr = []
      airPositionArr = []
      smokePositionArr = []
      temperaturePositionArr = []
      controllerPositionArr = []
      fontPositionArr = []
      describArr = []
    })
    // 取消按钮
    let cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', function () {
      // 点击跳转链接消除拖拽体
      $('.machine-zone').remove()
      $('.img-zone').remove()
      $('.breadcrumb').removeClass('hide')
      _this.$router.push({
        name: 'works'
      })
    })
    // 提交数据
    let submitBtn = document.getElementById('submit-button')
    submitBtn.addEventListener('click', function () {
      let partSize = gridWidth + '*' + gridLength
      // 获取坐标数据
      data()
      let machineLine = document.getElementsByClassName('machine-line')
      let airLine = document.getElementsByClassName('air-line')
      let smokeLine = document.getElementsByClassName('smoke-line')
      let temperatureLine = document.getElementsByClassName('temperature-line')
      let controllerLine = document.getElementsByClassName('control-line')
      let machineCodeArr = []
      let airCodeArr = []
      let smokeCodeArr = []
      let temperatureCodeArr = []
      let controllerCodeArr = []
      let smokeNameArr = []
      let temperatureNameArr = []
      let controllerNameArr = []
      let flag = true
      code(machineLine, machineCodeArr)
      code(airLine, airCodeArr)
      code(smokeLine, smokeCodeArr)
      code(temperatureLine, temperatureCodeArr)
      code(controllerLine, controllerCodeArr)
      equipName(smokeLine, smokeNameArr)
      equipName(temperatureLine, temperatureNameArr)
      equipName(controllerLine, controllerNameArr)

      function code(obj, arr) {
        for (let i = 0; i < obj.length; i++) {
          arr.push(obj[i].getAttribute('code'));
        }
      }

      function equipName(obj, arr) {
        for (let i = 0; i < obj.length; i++) {
          arr.push(obj[i].getAttribute('name'));
          if (!obj[i].getAttribute('name')) {
            flag = false;
            _this.$alert('设备名称信息不完整', '通知', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                })
              }
            })
          }
        }
      }
      // 设备信息
      let equip = null
      // 组件信息
      let model = ''
      let cabList = []
      let eqList = []
      for (let i = 0; i < machinePositionArr.length; i++) {
        let a = machinePositionArr[i]
        let b = machineNamePositionArr[i]
        let c = machineNameArr[i]
        let d = machineCodeArr[i]
        if (!d) {
          d = +new Date()
        }
        equip = {
          "CABINET_NAME": c,
          "CABINET_COORDINATE": a.join(','),
          "ID": d,
          "CABINET_TYPE": "0",
          "DESCRIB_COORDINATE": b.join(',')
        }
        cabList.push(equip)
      }
      for (let i = 0; i < airPositionArr.length; i++) {
        let a = airPositionArr[i]
        let b = airNamePositionArr[i]
        let c = airNameArr[i]
        let d = airCodeArr[i]
        if (!d) {
          d = +new Date()
        }
        equip = {
          "CABINET_NAME": c,
          "CABINET_COORDINATE": a.join(','),
          "ID": d,
          "CABINET_TYPE": "1",
          "DESCRIB_COORDINATE": b.join(',')
        }
        cabList.push(equip)
      }
      for (let i = 0; i < smokePositionArr.length; i++) {
        let a = smokePositionArr[i]
        let b = smokeNameArr[i]
        let d = smokeCodeArr[i]
        if (!d) {
          d = +new Date()
        }
        model = {
          "EQ_TYPE": "03",
          "EQ_NAME": b,
          "EQ_COORDINATE": a.join(','),
          "ID": d
        }
        eqList.push(model)
      }
      for (let i = 0; i < temperaturePositionArr.length; i++) {
        let a = temperaturePositionArr[i]
        let b = temperatureNameArr[i]
        let d = temperatureCodeArr[i]
        if (!d) {
          d = +new Date()
        }
        let model = {
          "EQ_TYPE": "02",
          "EQ_NAME": b,
          "EQ_COORDINATE": a.join(','),
          "ID": d
        }
        eqList.push(model)
      }
      for (let i = 0; i < controllerPositionArr.length; i++) {
        let a = controllerPositionArr[i]
        let b = controllerNameArr[i]
        let d = controllerCodeArr[i]
        if (!d) {
          d = +new Date()
        }
        model = {
          "EQ_TYPE": "25",
          "EQ_NAME": b,
          "EQ_COORDINATE": a.join(','),
          "ID": d
        }
        eqList.push(model)
      }
      // 去除末尾逗号
      if (flag === true) {
        _this.$axios(_this.HOST + '/updateCabinet', {
          params: {
            partSize: partSize,
            describ: JSON.stringify(cabList),
            equipInfo: JSON.stringify(eqList)
          }
        })
        .then(res => {
          // 点击跳转链接消除拖拽体
          $('.machine-zone').remove()
          $('.img-zone').remove()
          _this.$router.push({
            name: 'works'
          })
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
      }
    })
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
    // 3D场景构造
    function workshop() {
      three.width = document.getElementById('three-dimensional').offsetWidth
      three.height = document.getElementById('three-dimensional').offsetHeight
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
        document.getElementById('three-dimensional').appendChild(three.renderer.domElement)
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
          three.width = document.getElementById('three-dimensional').offsetWidth
          three.height = document.getElementById('three-dimensional').offsetHeight
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
        initControls()
        initStats()
        loop()
        onWindowResize()
      }
      // 执行函数
      draw()
    }
  },

  methods: {
    // 生成标尺
    ruler() {
      let xRuler = document.getElementById('axis-x')
      let yRuler = document.getElementById('axis-y')
      let scale
      // x-标尺
      let xLength = parseInt(xRuler.offsetWidth / 10)
      for (let i = 1; i < xLength; i++) {
        // 5px
        if (i % 5 === 0 && i % 2 != 0) {
          scale = document.createElement('div')
          scale.setAttribute('class', 'x-minor')
          scale.style.left = i * 10 + 'px'
          xRuler.appendChild(scale)
        }
        // 10px
        else if (i % 10 === 0) {
          scale = document.createElement('div')
          scale.setAttribute('class', 'x-major')
          scale.style.left = i * 10 + 'px'
          scale.innerText = i * 10 - 100
          xRuler.appendChild(scale)
          // 1px
        } else {
          scale = document.createElement('div')
          scale.setAttribute('class', 'x-micro')
          scale.style.left = i * 10 + 'px'
          xRuler.appendChild(scale)
        }
      }
      // y-标尺
      let yLength = parseInt(yRuler.offsetHeight / 10);
      for (let i = 1; i < yLength; i++) {
        // 5px
        if (i % 5 === 0 && i % 2 != 0) {
          scale = document.createElement('div')
          scale.setAttribute('class', 'y-minor')
          scale.style.top = i * 10 + 'px'
          yRuler.appendChild(scale)
        }
        // 10px
        else if (i % 10 === 0) {
          scale = document.createElement('div')
          scale.setAttribute('class', 'y-major')
          scale.style.top = i * 10 + 'px'
          scale.innerText = i * 10 - 100
          yRuler.appendChild(scale)
        }
        // 1px
        else {
          scale = document.createElement('div')
          scale.setAttribute('class', 'y-micro')
          scale.style.top = i * 10 + 'px'
          yRuler.appendChild(scale)
        }
      }
    }
  },

  watch: {}

}
</script>

<style >
  #banner {
    text-align: center;
    width: 520px;
    height: 60px;
    line-height: 60px;
    z-index: 1000;
    color: #ffffff;
    position: fixed;
    right: 0;
    left: 50%;
    margin-left: -260px;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  .dg.ac {
    z-index: 1000 !important;
  }

  .both-content {
    padding: 0;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .left-dashboard {
    width: 260px;
    height: 100%;
    float: left;
  }

  .nav-list {
    overflow: hidden;
  }

  .nav-zone {
    padding: 0 10px 20px 10px;
    overflow: hidden;
  }

  .nav-label {
    width: 100%;
    height: 40px;
    background: #2E2C48;
    color: #C7CEF2;
    line-height: 40px;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .nav-box {
    width: 110px;
    overflow: hidden;
    float: left;
  }

  .nav-box:nth-child(odd) {
    margin-right: 20px;
  }

  .nav-box-machine {
    width: 100%;
    height: 180px;
    border: 1px solid #2E2C48;
    box-sizing: border-box;
  }

  .nav-box-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #C7CEF2;
  }

  .equip-box {
    width: 100%;
    padding-right: 20px;
    margin-top: 20px;
    overflow: hidden;
  }

  .equip-title {
    width: 90px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #C7CEF2;
    font-size: 14px;
    float: left;
  }

  .equip-moudle {
    width: 150px;
    height: 80px;
    border: 1px solid #2E2C48;
    float: left;
  }

  .equip-moudle {
    padding: 20px 55px;
    box-sizing: border-box;
  }

  .right-dashboard1 {
    height: 100%;
    margin-left: 260px;
    padding: 0 10px 10px 10px;
    box-sizing: border-box;
    overflow: hidden;
    background: #18181E;
    position: relative;
  }

  .right-dashboard-top {
    height: 60px;
    background: #1E1E24;
    width: 100%;
    line-height: 60px;
  }

  .coordinate-input[type="text"],
  .coordinate-input[type="text"]:focus,
  .coordinate-input[type="text"]:hover {
    box-sizing: border-box;
    background: #121214;
    width: 100px;
    height: 28px;
    color: #c7cef2;
    font-size: 12px;
    border: 1px solid #4a485d;
    box-sizing: border-box;
    padding-left: 10px;
  }

  .create-axis {
    padding-left: 30px;
    height: 100%;
  }

  .axis-label {
    color: #828099;
    font-size: 12px;
  }

  .create-button {
    background: #1B86FF;
    width: 100px;
    height: 28px;
    border-radius: 14px;
    color: #FFFFFF;
    font-size: 14px;
    text-align: center;
    border: 1px solid #1B86FF;
    box-sizing: border-box;
    line-height: normal;
    cursor: pointer;
  }

  #create-button {
    margin: 0px 70px 0 30px;
  }

  .tab1-button {
    width: 80px;
    height: 28px;
    color: #FFFFFF;
    font-size: 14px;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    box-sizing: border-box;
    background: #2E2C48;
    border: 1px solid #2E2C48;
    cursor: pointer;
  }

  .tab2-button {
    margin-left: -5px;
    cursor: pointer;
    width: 80px;
    height: 28px;
    color: #FFFFFF;
    font-size: 14px;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    box-sizing: border-box;
    background: #2E2C48;
    border: 1px solid #2E2C48;
  }

  .tab1-style {
    background: #2E2C48;
    border: 1px solid #2E2C48;
  }

  .tab1-button:focus {
    outline: 0;
  }

  .tab2-style {
    background: #1B86FF;
    border: 1px solid #1B86FF;
    outline: 0;
  }

  .tab2-button:focus {
    outline: 0;
  }

  #submit-button {
    margin-left: 200px;
  }

  .right-dashboard-bottom {
    height: calc(100% - 70px);
    margin-top: 10px;
    overflow: hidden;
  }

  .axis-orign {
    width: 20px;
    height: 20px;
    background: #242427;
    float: left;
  }

  #axis-x {
    width: 100%;
    height: 20px;
    background: #303038;
    left: 20px;
    top: -20px;
    position: relative;
    overflow: hidden;
  }

  #axis-y {
    width: 20px;
    height: 100%;
    background: #303038;
    left: 0;
    top: -20px;
    position: relative;
    float: left;
    overflow: hidden;
  }

  .x-micro {
    background: #8E8E8E;
    width: 1px;
    height: 5px;
    bottom: 0;
    position: absolute;
  }

  .x-minor {
    background: #8E8E8E;
    width: 1px;
    height: 10px;
    bottom: 0;
    position: absolute;
  }

  .x-major {
    background: #8E8E8E;
    width: 1px;
    height: 20px;
    bottom: 0;
    position: absolute;
    font-size: 12px;
    color: #8E8E8E;
    text-indent: 1px;
  }

  .y-micro {
    background: #8E8E8E;
    width: 5px;
    height: 1px;
    left: 0;
    position: absolute;
  }

  .y-minor {
    background: #8E8E8E;
    width: 10px;
    height: 1px;
    left: 0;
    position: absolute;
  }

  .y-major {
    background: #8E8E8E;
    width: 20px;
    height: 1px;
    left: 0;
    position: absolute;
    font-size: 12px;
    color: #8E8E8E;
    word-wrap: break-word;
    padding-left: 8px;
    box-sizing: border-box;
  }

  .painting {
    overflow: hidden;
    display: flex;
    /*   align-items: center;
    justify-content: center; */
    padding: 100px;
    height: calc(100% - 20px);
    margin-top: -20px;
  }

  #love-house {
    border: 10px solid #2E2C48;
    background: #292930;
    box-sizing: border-box;
  }

  .machine-zone {
    width: 150px;
    height: 190px;
    position: absolute;
    cursor: pointer;
  }

  .machine {
    width: 150px;
    height: 140px;
    border-left: 5px solid #666666;
    border-right: 5px solid #666666;
    padding: 0 5px;
    box-sizing: border-box;
  }

  .machine-position {
    width: 120px;
    height: 130px;
    border: 1px dashed #666666;
    box-sizing: border-box;
  }

  .machine-center {
    width: 130px;
    height: 100%;
    background: #333333;
    padding: 5px;
    box-sizing: border-box;
  }

  .air-position {
    width: 120px;
    height: 130px;
    border: 1px dashed #9DDDFF;
    box-sizing: border-box;
  }

  .air-center {
    width: 130px;
    height: 100%;
    background: #2898D4;
    padding: 5px;
    box-sizing: border-box;
  }

  .machine-title-input {
    width: 150px;
    height: 30px;
    color: #e6e6e6;
    font-size: 12px;
    margin-top: 20px;
    box-sizing: border-box;
    padding-left: 10px;
    text-align: center;
    padding: 0 5px;
  }

  .axis-content {
    height: 100%;
    float: left;
  }

  .three-content {
    width: 50%;
    height: 100%;
    float: right;
  }

  .left-nav {
    width: 100%;
    height: 100%;
    background: #1E1E24;
  }

  .left-nav ul {
    margin: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .left-nav ul li {
    margin: 0 15px 20px 15px;
    list-style: none;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-right: 10px;
    background: blue;
    color: #FFFFFF;
  }

  .machine-type {
    opacity: 0.9;
    filter: alpha(opacity=30);
    position: absolute;
    width: 50px;
    height: 50px;
    cursor: move;
    border: 1px solid #888;
    background: #000;
  }

  .air-type {
    opacity: 0.9;
    filter: alpha(opacity=30);
    position: absolute;
    width: 50px;
    height: 50px;
    cursor: move;
    border: 1px solid #888;
    background: red;
  }

  #temp {
    opacity: 0.3;
    filter: alpha(opacity=30);
    position: absolute;
    background: #3e3e3e;
    width: 50px;
    height: 50px;
  }

  .drag-grid {
    float: left;
    border-collapse: collapse;
  }

  .img-zone {
    width: 40px;
    height: 40px;
    position: absolute;
    vertical-align: middle;
    cursor: move;
  }

  #sup-yline1 {
    width: 1px;
    background: #1B86FF;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  #sup-xline1 {
    height: 1px;
    background: #1B86FF;
    width: 100%;
    position: absolute;
    z-index: 999;
  }

  #sup-yline2 {
    width: 1px;
    background: #1B86FF;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  #sup-xline2 {
    height: 1px;
    background: #1B86FF;
    width: 100%;
    position: absolute;
    z-index: 999;
  }

  .drag-img {
    margin: 14px 13px;
    transition: all 1s ease-out;
  }

  .drag {
    cursor: move;
  }

  .hide {
    display: none;
  }

  #fixed-btn {
    position: fixed;
    top: 15px;
    left: 750px;
    z-index: 999;
    cursor: pointer;
  }

  #three-dimensional {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1E1E24;
    display: none;
    z-index: 999;
  }

  canvas {
    position: absolute;
    z-index: 998;
  }

  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #666666;
  }

  input:-moz-placeholder,
  textarea:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #666666;
  }

  input::-moz-placeholder,
  textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #666666;
  }

  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #666666;
  }

  .toolbar {
    width: 32px;
    height: 480px;
    background: rgba(255, 255, 255, 0.75);
    border-radius: 5px;
    z-index: 999;
    position: relative;
    top: 75px;
    left: 10px;
    float: left;
  }

  #cancel-button {
    margin-left: 10px;
  }

  #fixed-panel {
    position: fixed;
    top: 0px;
    right: 0;
    width: 260px;
    height: 100%;
    z-index: 999;
    background: #1e1e24;
    display: none;
  }

  #fixed-panel ul {
    list-style: none;
    overflow: hidden;
  }

  #fixed-panel ul li {
    color: #c7cef2;
    overflow: hidden;
    padding-left: 20px;
  }

  .items-title {
    line-height: 40px;
    height: 40px;
    float: left;
    width: 220px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(18, 18, 20, 1);
    font-size: 14px;
  }

  .items-info {
    line-height: 50px;
    height: 50px;
    float: left;
    width: 220px;
    box-sizing: border-box;
  }

  .items-li1 {
    height: 40px;
    line-height: 40px;
  }

  .items-li2 {
    height: 50px;
    line-height: 50px;
    border-bottom: 2px solid rgba(18, 18, 20, 1);
  }

  .items-btn {
    width: 100px;
    height: 28px;
    background: rgba(27, 134, 255, 1);
    border-radius: 14px;
    border: none;
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin-left: 60px;
    margin-top: 100px;
    cursor: pointer;
  }

  .items-input[type="text"],
  .items-input[type="text"]:focus,
  .items-input[type="text"]:hover,
  .items-input[readonly] {
    color: #c7cef2;
    border: 1px solid #4a485d;
    box-sizing: border-box;
    background: #121214 !important;
    padding-left: 10px;
    height: 30px;
    font-size: 12px;
    box-sizing: border-box;
    width: 220px;
  }

  .items-axis {
    color: #828099;
  }

  .info-axis {
    color: #828099;
  }

  .items-input-num[type="text"],
  .items-input-num[type="text"]:focus,
  .items-input-num[type="text"]:hover {
    color: #c7cef2;
    border: 1px solid #4a485d;
    box-sizing: border-box;
    background: #121214;
    padding-left: 10px;
    height: 28px;
    font-size: 12px;
    width: 70px;
    margin-left: 5px;
  }

  #panel-title {
    width: 100%;
    height: 40px;
    background: #2e2c48;
    color: #c7cef2;
    line-height: 40px;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 14px;
  }

  #fixed-panel ul li:first-child {
    padding-left: 0;
  }

  .items-link {
    margin: 0 6px;
  }
</style>