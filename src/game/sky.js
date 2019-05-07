import * as THREE from 'three'
import Cloud from './cloud'

export default class Sky {

  mesh = null
  count = 0

  constructor () {
    this.init()
  }

  init () {
    // 创建一个空的容器
    this.mesh = new THREE.Object3D();
        
    // 设定散落在天空中云朵的数量
    this.count = 20;
    
    // To distribute the clouds consistently,
    // we need to place them according to a uniform angle
    const stepAngle = Math.PI * 2 / this.count;
    
    // 创建云朵
    for(let i = 0; i < this.count; i++){
      const c = new Cloud();

      // 给每朵云设置角度和位置;
      const a = stepAngle * i; // 云最终的角度
      const h = 750 + Math.random() * 200; // 轴中心到云的距离

      // 将极坐标(角度、距离)转换成笛卡尔坐标(x,y)
      c.mesh.position.y = Math.sin(a) * h;
      c.mesh.position.x = Math.cos(a) * h;

      // 根据云的位置做旋转
      c.mesh.rotation.z = a + Math.PI/2;

      // 为了更真实，有远有近
      c.mesh.position.z = -400 - Math.random() * 300;
      
      // 给每朵云设置比例
      const s = 1 + Math.random() * 2;
      c.mesh.scale.set(s,s,s);

      // 将每朵云追加到场景中
      this.mesh.add(c.mesh);  
    }  
  }
}