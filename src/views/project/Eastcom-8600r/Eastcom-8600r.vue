<template>
  <div>
    <div id="banner">
      <i class="el-icon-d-arrow-left" id="back">返回</i>
      <span>Eastcom-8600r 模型管理控制系统</span>
    </div>
    <div id="view">
      <div id="container">
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
    return {};
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

  mounted() {

    let scene, camera, renderer, controls, guiControls;
    let stats = initStats();

    /* 场景 */
    function initScene() {

        scene = new THREE.Scene();
        scene.background = new THREE.CubeTextureLoader().setPath('../123/')
            .load( [
                'posx.jpg',
                'negx.jpg',
                'posy.jpg',
                'negy.jpg',
                'posz.jpg',
                'negz.jpg'
            ] );
        // scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );

    }

    /* 相机 */
    function initCamera() {

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        camera.position.set(5, 0, 10);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

    }

    /* 渲染器 */
    function initRender() {
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// var dracoLoader = new THREE.DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.setClearColor(0x0E3866);
        // renderer.setClearColor(0xF0F0F0);
        renderer.setClearColor( 0xcccccc );
        renderer.gammaOutput = true;
        // renderer.gammaFactor = 2.2;
        renderer.gammaFactor = 6;
        renderer.physicallyCorrectLights = true
        //告诉渲染器需要阴影效果
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
        document.body.appendChild(renderer.domElement);

    }

    /* 灯光 */
    function initLight() {
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 3, 5);
scene.add(directionalLight);
// var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
// directionalLight2.position.set(0, 3, -5);
// directionalLight2.castShadow = true;
// scene.add(directionalLight2);
var directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight3.position.set(-3, 0, 0);
scene.add(directionalLight3);
var point = new THREE.PointLight(0xffffff, 1);
point.position.set(2, 2, -5);
scene.add(point);
var point1 = new THREE.PointLight(0xffffff, 1);
point1.position.set(-2, 2, -5);
scene.add(point1);
var point2 = new THREE.PointLight(0xffffff, 1);
point1.position.set(0, 3, -1);
scene.add(point1);
// var ambient = new THREE.AmbientLight(0xffffff, 1);

// scene.add(ambient);

    }

    /* 控制器 */
    function initControls() {

        controls = new THREE.OrbitControls(camera, renderer.domElement);

        /* 属性参数默认 */

    }

    /* 调试插件 */
    function initGui() {

        guiControls = new function () {

        };

        let controls = new dat.GUI({width: 200});

    }

    /* 场景中的内容 */
    function initContent() {
                //辅助工具
                var helper = new THREE.AxisHelper(10);
        scene.add(helper);

        // 加载 glTF 格式的模型
        // let loader = new THREE.GLTFLoader();/*实例化加载器*/
        var loader = new THREE.GLTFLoader().setPath('../ok/');
        loader.setCrossOrigin('anonymous');
        var dracoLoader = new THREE.DRACOLoader();
dracoLoader.setDecoderPath( './draco/' );
loader.setDRACOLoader( dracoLoader );
        loader.load('8600r.gltf',function (obj) {
            obj.scene.traverse( function ( child ) {
            	if ( child.isMesh ) {
                    child.material.emissive =  child.material.color;
					child.material.emissiveMap = child.material.map ;
            	}
            } );
            console.log(obj);
            obj.scene.position.y = 1;
            scene.add(obj.scene);
            document.getElementById('loading').style.display = 'none';

        },function (xhr) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },function (error) {

            console.log('load error!'+error.getWebGLErrorMessage());

        })
        var cubeGeometry = new THREE.CubeGeometry(1,1,1);

        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ffff});

        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(0,1,5);
        cube1.position.set(0,1,-5);
        cube2.position.set(-5,1,-5);
        scene.add(cube);
        scene.add(cube1);
        scene.add(cube2);
    }

    /* 性能插件 */
    function initStats() {

        let stats = new Stats();

        document.body.appendChild(stats.domElement);

        return stats;

    }

    /* 窗口变动触发 */
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    /* 数据更新 */
    function update() {

        stats.update();

    }

    /* 初始化 */
    function init() {

        initScene();
        initCamera();
        initRender();
        initLight();
        initControls();
        initContent();
        initGui();

        /* 监听事件 */
        window.addEventListener('resize', onWindowResize, false);

    }

    /* 循环渲染 */
    function animate() {

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        update();

    }

    /* 初始加载 */
    (function () {
        console.log("three init start...");

        init();
        animate();

        console.log("three init send...");
    })();

  },

  methods: {
    // WebGL兼容性检查
    checkSupport () {
      if (WEBGL.isWebGLAvailable()) {
        // Initiate function or other initializations here
        this.animate()
      } else {
        var warning = WEBGL.getWebGLErrorMessage()
        document.getElementById('container').appendChild(warning)
      }
    },
    // 调试插件
    initGui () {

    },
    // 渲染器
    initRender () {

    },
    initScene () {

    },
    initCamera () {

    },
    initLight () {

    },
    initModel () {

    },
    initControls () {

    },
    initStats () {

    },

    animate () {

    },

  },

  watch: {}
};
</script>

<style></style>
