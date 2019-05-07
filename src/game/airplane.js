import * as THREE from 'three'
import colors from '../const/color-setting'

export default class AirPlane {

  mesh = null

  constructor () {
    this.mesh = new THREE.Object3D();
        
    // 创建机舱
    const geomCockpit = new THREE.BoxGeometry(60,50,50,1,1,1);
    const matCockpit = new THREE.MeshPhongMaterial({color: colors.red, flatShading: true});
    const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);
    
    // 创建发动机
    const geomEngine = new THREE.BoxGeometry(20,50,50,1,1,1);
    const matEngine = new THREE.MeshPhongMaterial({color: colors.white, flatShading: true});
    const engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);
    
    // 创建机尾
    const geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
    const matTailPlane = new THREE.MeshPhongMaterial({color: colors.red, flatShading: true});
    const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-35,25,0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);
    
    // 创建机翼
    const geomSideWing = new THREE.BoxGeometry(40,8,150,1,1,1);
    const matSideWing = new THREE.MeshPhongMaterial({color: colors.red, flatShading: true});
    const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);
    
    // 创建螺旋桨
    const geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
    const matPropeller = new THREE.MeshPhongMaterial({color: colors.brown, flatShading: true});
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;
    
    // blades
    const geomBlade = new THREE.BoxGeometry(1,100,20,1,1,1);
    const matBlade = new THREE.MeshPhongMaterial({color: colors.brownDark, flatShading: true});
    
    const blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8,0,0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50,0,0);
    this.mesh.add(this.propeller);
  }
}