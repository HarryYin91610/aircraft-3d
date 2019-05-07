import * as THREE from 'three'
import colors from '../const/color-setting'

export default class Cloud {
  
  mesh = null

  constructor () {
    // 创建一个空的容器用来存放不同部分的云
    this.mesh = new THREE.Object3D();
        
    // 创建一个立方体;复制多个，来创建云
    const geom = new THREE.BoxGeometry(20,20,20);
    
    // 创建云的材质，简单的白色
    const mat = new THREE.MeshPhongMaterial({
      color: colors.white 
    });
    
    // 随机定义要复制的几何体数量
    const count = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++ ){     
      // 给复制的几何体创建Mesh对象
      const m = new THREE.Mesh(geom, mat); 
      
      // 给每个立方体随机的设置位置和角度
      m.position.x = i * 15;
      m.position.y = Math.random() * 10;
      m.position.z = Math.random() * 10;
      m.rotation.z = Math.random() * Math.PI * 2;
      m.rotation.y = Math.random() * Math.PI * 2;
      
      // 随机的设置立方体的尺寸
      const s = 0.1 + Math.random() * 0.9;
      m.scale.set(s,s,s);
      
      // 允许每朵云生成投影和接收投影
      m.castShadow = true;
      m.receiveShadow = true;
      
      // 把该立方体追加到上面我们创建的容器中
      this.mesh.add(m);
    } 
  }
}