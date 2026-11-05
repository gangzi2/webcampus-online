import { computed, resource, Service, signal } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { WebGPURenderer } from 'three/webgpu';
/**
 * Service global et singleton pour gérer la scène et d'autres éléments Three.js.
 */
@Service()
export class GlobalService {
  renderer = signal<WebGPURenderer | null>(null);
  scene = signal<THREE.Scene | null>(null);
  controls = signal<OrbitControls | null>(null);
  projetNom = signal('');
  globalConfig = resource({
    params: () => this.projetNom() || undefined,
    loader: async ({ params, abortSignal }) => {
      const response = await fetch(`/simulation/${params}/config.json`, {
        signal: abortSignal,
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    },
  });

  mainCamera = signal<THREE.PerspectiveCamera | null>(null);

  // controls = null;

  lights = computed(() => this.globalConfig.value()?.environment.lights);

  environment = computed(() => this.globalConfig.value()?.environment);
}
