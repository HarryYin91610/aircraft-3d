import * as THREE from 'three'
import Sky from './sky'
import Sea from './sea'
import AirPlane from './airplane'

class Game {
  camera = null
  scene = null
  mesh = null
  renderer = null
  container = null

  WIDTH = 0
  HEIGHT = 0
  fieldOfView = 0
  nearPlane = 0
  farPlane = 0

  hemisphereLight = null
  shadowLight = null
  
  sky = null
  sea = null

  mousePos = {x: 0, y: 0}

  constructor () {
    this.init();
  }

  init () {
    this.createScene();
    this.createLights();
    this.createSea();
    this.createSky();
    this.createPlane();

    const axesHelper = new THREE.AxesHelper(30);
    this.scene.add(axesHelper);

    //添加监听器
    document.addEventListener('mousemove', () => {
      const tx = -1 + (event.clientX / this.WIDTH) * 2;

      // 对宗轴来说，我们需求反函数，因为2D的y轴和3D的y轴方向相反
      const ty = 1 - (event.clientY / this.HEIGHT) * 2;

      this.mousePos = {x: tx, y: ty};
    }, false);

    this.loop();
  }

  createScene () {
    // 获取场景的宽和高,用它们来设置相机的纵横比和渲染器的的尺寸
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;

    // 创建场景scene
    this.scene = new THREE.Scene();

    // 在场景中添加雾效; 颜色与css中背景颜色相同
    this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    
    // 创建摄像机camera
    const aspectRatio = this.WIDTH / this.HEIGHT;
    this.fieldOfView = 60;
    this.nearPlane = 1;
    this.farPlane = 10000;
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearPlane,
      this.farPlane
    );
    
    // 设置摄像机的坐标
    this.camera.position.x = 0;
    this.camera.position.z = 200;
    this.camera.position.y = 100;
    
    // 创建渲染器renderer
    this.renderer = new THREE.WebGLRenderer({ 
      // 允许背景透明，这样可以显示我们在css中定义的背景色
      alpha: true, 
      // 开启抗锯齿效果; 性能变低,但是,因为我们的项目是基于低多边形的,应该还好
      antialias: true 
    });

    // 定义渲染器的尺寸，此项目中它充满整个屏幕
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    
    // 启用阴影渲染
    this.renderer.shadowMap.enabled = true;
    
    // 将渲染器元素追加到我们在HTML里创建的容器元素里
    this.container = document.getElementById('canvas-wrap');
    this.container.appendChild(this.renderer.domElement);
    
    // 监听屏幕：如果用户改变屏幕尺寸，必须更新摄像机和渲染器的尺寸
    window.addEventListener('resize', this.handleWindowResize, false);
  }

  handleWindowResize() {
    // 更新渲染器和摄像机的宽高
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.camera.aspect = this.WIDTH / this.HEIGHT;
    this.camera.updateProjectionMatrix();
  }

  createLights () {
    // 半球光HemisphereLight是渐变色光源；第一个参数是天空的颜色，第二个参数是地面的颜色，第三个参数是光源的强度
    this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
        
    // 平行光DirectionLight是从指定方向照射过来的光源。在此项目里用它来实现太阳光，所以它产生的光都是平行的
    this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);

    // 设置光源的位置  
    this.shadowLight.position.set(150, 350, 350);
    
    // 允许投射阴影 
    this.shadowLight.castShadow = true;

    // 定义投射阴影的可见区域
    this.shadowLight.shadow.camera.left = -400;
    this.shadowLight.shadow.camera.right = 400;
    this.shadowLight.shadow.camera.top = 400;
    this.shadowLight.shadow.camera.bottom = -400;
    this.shadowLight.shadow.camera.near = 1;
    this.shadowLight.shadow.camera.far = 1000;

    // 定义阴影的分辨率; 越高越好，但性能也越低
    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;
    
    // 把光源添加到场景中激活它们
    this.scene.add(this.hemisphereLight);  
    this.scene.add(this.shadowLight);
  }

  createPlane () {
    this.airplane = new AirPlane();
    this.airplane.mesh.scale.set(.25,.25,.25);
    this.airplane.mesh.position.y = 100;
    this.scene.add(this.airplane.mesh);
  }

  createSea () {
    this.sea = new Sea();
    this.sea.mesh.position.y = -600;
    this.scene.add(this.sea.mesh);
  }

  createSky () {
    this.sky = new Sky();
    this.sky.mesh.position.y = -600;
    this.scene.add(this.sky.mesh);
  }

  loop () {
    this.sky.mesh.rotation.z += 0.01
    this.sea.mesh.rotation.z += 0.005;

    this.updatePlane();

    // 渲染场景
    this.renderer.render(this.scene, this.camera);

    // 再次调用loop函数
    window.requestAnimationFrame(() => {
      this.loop()
    })
  }

  updatePlane () {
    // 根据鼠标x轴位置在-1到1之间，我们规定飞机x轴移动位置在-100到100之间，
    // 同样规定飞机y轴移动位置在25到175之间。
    const targetX = this.normalize(this.mousePos.x, -1, 1, -100, 100);
    const targetY = this.normalize(this.mousePos.y, -1, 1, 25, 175);

    // 更新飞机的位置
    this.airplane.mesh.position.y = targetY;
    this.airplane.mesh.position.x = targetX;
    this.airplane.propeller.rotation.x += 0.3;
  }

  normalize (v,vmin,vmax,tmin, tmax) {
    const nv = Math.max(Math.min(v,vmax), vmin);
    const dv = vmax-vmin;
    const pc = (nv-vmin)/dv;
    const dt = tmax-tmin;
    const tv = tmin + (pc*dt);
    return tv;
  }
}

export default new Game()