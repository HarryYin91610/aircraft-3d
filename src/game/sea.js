import * as THREE from 'three'
import colors from '../const/color-setting'

export default class Sea {
  
  mesh = null

  constructor () {
    // 创建一个圆柱形几何体Geometry;
    // 它的参数: 上表面半径，下表面半径，高度，对象的半径方向的细分线段数，对象的高度细分线段数
    const geom = new THREE.CylinderGeometry(600,600,800,40,10);
    
    // 让它在X轴上旋转
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    
    // 创建材质Material
    const mat = new THREE.MeshPhongMaterial({
      color: colors.blue,
      transparent: true,
      opacity: .8,
      flatShading: true
    });

    // 在Three.js里创建一个物体Object，我们必须创建一个Mesh对象，Mesh对象就是Geometry创建的框架贴上材质Material最后形成的总体。
    this.mesh = new THREE.Mesh(geom, mat);

    // 允许大海接收阴影
    this.mesh.receiveShadow = true; 
  }
}