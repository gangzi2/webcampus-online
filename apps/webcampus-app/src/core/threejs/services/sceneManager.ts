import { Service, inject } from '@angular/core';
import * as THREE from 'three';
import { Color } from 'three';
import { GlobalService } from './globalService';
@Service()
export class SceneManager {
  globalService = inject(GlobalService);

  public handle_update(result: any, pieces: number, renderer: any): void {
    renderer.initWebGLObjects(result.scene);
    let m,
      material,
      count = 0;
    for (m in result.materials) {
      material = result.materials[m];
      if (
        !(material instanceof THREE.ShaderMaterial || material.morphTargets)
      ) {
        if (!material.program) {
          renderer.initMaterial(
            material,
            result.scene.__lights,
            result.scene.fog,
          );
          count += 1;
          if (count > pieces) {
            break;
          }
        }
      }
    }
  }

  initScene() {
    const scene = new THREE.Scene();
    scene.background = new Color('skyblue');
    this.globalService.scene.set(scene);
  }

  initLights() {
    // const result = this.globalService.globalConfig.value();
    // if (
    //   result.environment != undefined &&
    //   result.environment.lights != undefined
    // ) {
    //   const light_containers = result.environment.lights;
    //   let light_obj;
    //   for (const light of light_containers) {
    //     if (
    //       light.type == 'AmbientLight' ||
    //       light.type == 'SpotLight' ||
    //       light.type == 'DirectionalLight' ||
    //       light.type == 'PointLight'
    //     ) {
    //       const hex = light.hex !== undefined ? parseInt(light.hex) : 0xffffff;
    //       const intensity = light.intensity !== undefined ? light.intensity : 1;

    //       if (light.type == 'AmbientLight') {
    //         light_obj = new THREE.AmbientLight(hex);
    //       } else if (light.type == 'SpotLight') {
    //         const distance = light.distance !== undefined ? light.distance : 0;
    //         const angle =
    //           light.angle !== undefined ? Math.PI / light.angle : Math.PI / 3;
    //         const exponent = light.exponent !== undefined ? light.exponent : 10;

    //         light_obj = new THREE.SpotLight(
    //           hex,
    //           intensity,
    //           distance,
    //           angle,
    //           exponent,
    //         );
    //         light_obj.target.position.fromArray(light.target);
    //         light_obj.position.fromArray(light.position);
    //         light_obj.castShadow = light.castShadow;
    //         light_obj.shadow.mapSize.width = light.shadowMapWidth;
    //         light_obj.shadow.mapSize.height = light.shadowMapHeight;
    //       } else if (light.type == 'PointLight') {
    //         const distance = light.distance !== undefined ? light.distance : 0;

    //         light_obj = new THREE.PointLight(hex, intensity, distance);
    //         light_obj.position.fromArray(light.position);
    //         light_obj.castShadow = true;
    //         /*light.shadow.camera.near = 1;
    // 				light.shadow.camera.far = 50000;
    // 				// pointLight.shadowCameraVisible = true;
    // 				light.shadow.bias = 0.01;
    // 				light.shadow.mapSize.height = 2048;
    // 				light.shadow.mapSize.width = 2048;*/
    //         light_obj.shadow.mapSize.width = 2048;
    //         light_obj.shadow.mapSize.height = 2048;
    //       }
    //       if (light_obj) this.globalService.scene()?.add(light_obj);
    //     }
    //   }
    // }
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.globalService.scene()?.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 5);

    this.globalService.scene()?.add(dirLight);
    // if (this.loaded().currentCamera !== undefined) {
    //   //orientation ou position pas adapte?
    //   cameraManager.camera = this.loaded().currentCamera;

    //   cameraManager.camera.aspect =
    //     parseInt($(container3d).width()) / parseInt($(container3d).height());

    //   cameraManager.camera.updateProjectionMatrix();
    // }

    // if (result.SceneLoader.camera_main.type == 'fps')
    //   controls = new FpsControls(cameraManager.camera, physxManager.sphereBody);
    // else if (Globals.SceneLoader.camera_main.type == 'touch')
    //   controls = new TouchControls(
    //     cameraManager.camera,
    //     physxManager.sphereBody,
    //   );
    // else if (Globals.SceneLoader.camera_main.type == 'thirdperson')
    //   controls = new ThirdPersonControls(
    //     cameraManager.camera,
    //     physxManager.sphereBody,
    //   );
    // else
    //   controls = new PointerLockControls(
    //     cameraManager.camera,
    //     physxManager.sphereBody,
    //   );

    // if (Globals.SceneLoader.camera_main.speed != undefined)
    //   controls.speed = Globals.SceneLoader.camera_main.speed;

    // if (Globals.SceneLoader.camera_main.rotationSpeed != undefined)
    //   controls.rotationSpeed = Globals.SceneLoader.camera_main.rotationSpeed;

    // this.scene().add(controls.getObject());

    // if (Globals.SceneLoader.camera_main.radiusAvatar != undefined)
    //   physxManager.radiusSphere = Globals.SceneLoader.camera_main.radiusAvatar;

    // //shadow loading
    // if (Globals.environment.receiveShadow != undefined) {
    //   renderer.shadowMapEnabled = true;
    //   renderer.shadowMapType = THREE.PCFShadowMap;

    //   const shadow = Globals.environment.receiveShadow;
    //   for (const all_receive in shadow) {
    //     if (this.loaded().objects[all_receive] != undefined) {
    //       this.loaded().objects[all_receive].receiveShadow =
    //         shadow[all_receive];
    //       //this.loaded.objects[all_receive].castShadow = shadow[all_receive];
    //       //this.loaded.objects[all_receive].material.side = 2;
    //     }
    //   }
    // }
    // this.scene().autoUpdate.set(false); // INCREASE PERF BUT NEED TO ADD updateMatrix and UpdateMatrixWorld everywhere
    // this.globalService.renderer()?.autoUpdateObjects = false;
  }
}
