import { inject, Service, signal } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GlobalService } from './globalService';

@Service()
export class ControlManager {
  scene = signal(new THREE.Scene());
  loaded = signal(false);
  path = signal('');
  globalService = inject(GlobalService);
  controls = signal<OrbitControls | null>(null);
  initControl() {
    const camera = this.globalService.mainCamera();
    if (camera) {
      const orbitControls = new OrbitControls(
        camera,
        this.globalService.renderer()?.domElement,
      );
      orbitControls.enableDamping = true;
      orbitControls.dampingFactor = 0.05;
      orbitControls.enableZoom = true;
      orbitControls.enableRotate = true;
      orbitControls.enablePan = true;

      this.globalService.controls.set(orbitControls);
      this.controls.set(orbitControls);
    }
  }

  updateTarget(position: THREE.Vector3) {
    const controls = this.controls();
    if (controls) {
      controls.target.copy(position);
      controls.update();
    }
  }
}
