import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  PLATFORM_ID,
  untracked,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { color, cos, positionLocal, sin, time, vec3, vec4 } from 'three/tsl';
import { MeshStandardNodeMaterial, WebGPURenderer } from 'three/webgpu';
import { ControlManager } from './services/controlManager';
import { GlobalService } from './services/globalService';
import { ModelLoaderService } from './services/modle-loader.service';
import { SceneManager } from './services/sceneManager';
@Component({
  selector: 'app-vr-scene',
  standalone: true,
  template: `<div
    #canvasContainer
    style="width: 100%; height: 600px; position: relative; overflow: hidden;"
  ></div>`,
})
export class VrSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) container!: ElementRef;
  projectName = input<string>('Amis');
  private resizeObserver!: ResizeObserver;
  private sceneManager = inject(SceneManager);
  private globalService = inject(GlobalService);
  private platformId = inject(PLATFORM_ID);
  private controlManager = inject(ControlManager);
  private modelLoader = inject(ModelLoaderService);
  private animationFrameId!: number;
  private idleBase: THREE.Vector3 | null = null;
  private idleEnabled = false;
  constructor() {
    effect(() => this.globalService.projetNom.set(this.projectName()));

    effect(() => {
      if (this.globalService.globalConfig.hasValue()) {
        const config = this.globalService.globalConfig.value();
        if (!config || !this.globalService.renderer()) return;
        untracked(() => this.updateScene());
      }
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initRenderer();
  }

  updateScene() {
    this.sceneManager.initScene();
    this.sceneManager.initLights();
    // this.ajouterObjects();
    this.loadModel('/test/ams_09.gltf');
  }

  loadModel(url: string) {
    {
      this.modelLoader.loadModel(url).then((gltf) => {
        gltf.scene.rotation.x = -Math.PI / 2;
        gltf.scene.updateMatrixWorld(true);
        gltf.scene.traverse((child) => {
          if (
            child instanceof THREE.PerspectiveCamera &&
            child?.name === 'PhysCamera001'
          ) {
            const cameraPosition = new THREE.Vector3();
            child.getWorldPosition(cameraPosition);
            const cameraDirection = new THREE.Vector3();
            child.getWorldDirection(cameraDirection);

            // 3. Calculer un point cible (target) situé à une distance arbitraire devant la caméra (ex: 10 unités)
            const targetPosition = cameraPosition
              .clone()
              .add(cameraDirection.multiplyScalar(10));
            const camera = this.globalService.mainCamera();
            if (camera) {
              camera.position.copy(cameraPosition);
              camera.lookAt(targetPosition);
              this.idleBase = cameraPosition.clone();
              this.idleEnabled = true;
              this.controlManager.updateTarget(targetPosition);
            }
          }
        });
        this.globalService.scene()?.add(gltf.scene);
      });
    }
  }

  ajouterObjects() {
    // 4. Géométrie du plan d'eau (subdivisé pour les vagues)
    const geometry = new THREE.PlaneGeometry(10, 10, 128, 128);
    geometry.rotateX(-Math.PI / 2);

    // 5. Matériau TSL
    const material = new MeshStandardNodeMaterial({
      roughness: 0.1,
      metalness: 0.1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.globalService.scene()?.add(mesh);
    // --- TSL : Déplacement des sommets (Vertex) plus doux ---
    const freqX = positionLocal.x.mul(0.8); // Vagues plus larges
    const freqZ = positionLocal.z.mul(0.8);
    const slowTime = time.mul(0.5); // Mouvement plus lent

    // Calcul d'une hauteur beaucoup plus subtile (amplitude de 0.08 au lieu de 0.3)
    const waveHeight = sin(freqX.add(slowTime))
      .mul(cos(freqZ.add(slowTime)))
      .mul(0.08);

    const displacedPosition = positionLocal.add(vec3(0.0, waveHeight, 0.0));
    material.vertexNode = vec4(displacedPosition, 1.0);
    // Gestion des couleurs (Fragment Shader via TSL)
    const colorFactor = waveHeight.mul(1.5).add(0.5).clamp(0.0, 1.0);
    const deepWaterColor = color(0x051d40);
    const shallowWaterColor = color(0x00a8cc);

    material.colorNode = colorFactor.mix(deepWaterColor, shallowWaterColor);

    const waterMesh = new THREE.Mesh(geometry, material);
    this.globalService.scene()?.add(waterMesh);
    cancelAnimationFrame(this.animationFrameId);
    this.animate();
  }

  private async initRenderer() {
    const containerEl: HTMLElement = this.container.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    containerEl.appendChild(canvas);
    const width = containerEl.clientWidth || 1;
    const height = containerEl.clientHeight || 1;
    const renderer = new WebGPURenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    await renderer.init();
    this.globalService.renderer.set(renderer);
    this.initCamera(containerEl);
    this.sceneManager.initScene();
    this.controlManager.initControl();
    this.controlManager
      .controls()
      ?.addEventListener('start', this.stopIdleMotion);
    this.globalService.renderer()?.setAnimationLoop(() => {
      this.animationcamera();
      this.controlManager.controls()?.update();
      this.globalService
        .renderer()
        ?.render(
          this.globalService?.scene() ?? new THREE.Scene(),
          this.globalService?.mainCamera() ?? new THREE.PerspectiveCamera(),
        );
    });
  }

  initCamera(containerEl: HTMLElement) {
    const width = containerEl.clientWidth || 1;
    const height = containerEl.clientHeight || 1;
    this.globalService.mainCamera.set(
      new THREE.PerspectiveCamera(75, width / height, 1, 10000),
    );
    const camera = this.globalService.mainCamera();
    if (camera) {
      camera.position.set(200, -206, -1800);
      camera.lookAt(100, 106, 100);
    }
  }

  animationcamera() {
    const camera = this.globalService.mainCamera();
    const base = this.idleBase;
    if (!camera || !base || !this.idleEnabled) return;

    const t = performance.now() * 0.001;
    camera.position.set(
      base.x + Math.sin(t * 1) * 1.5,
      base.y + Math.sin(t * 0.6) * 1.5,
      base.z + Math.cos(t * 0.4) * 1.5,
    );
  }

  private stopIdleMotion = () => {
    this.idleEnabled = false;
  };

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.animationcamera();
    this.globalService
      ?.renderer()
      ?.render(
        this.globalService?.scene() ?? new THREE.Scene(),
        this.globalService?.mainCamera() ?? new THREE.PerspectiveCamera(),
      );
  };

  private disposeScene() {
    this.resizeObserver?.disconnect();
    this.globalService.scene()?.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const materials = Array.isArray(obj.material)
          ? obj.material
          : [obj.material];
        materials.forEach((material) => {
          Object.values(material).forEach((value) => {
            if (value instanceof THREE.Texture) {
              value.dispose();
            }
          });

          material.dispose();
        });
      }
    });
    this.globalService.scene()?.clear();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.disposeScene();
    cancelAnimationFrame(this.animationFrameId);
    const renderer = this.globalService.renderer();

    if (renderer) {
      renderer.dispose();
    }
  }
}
