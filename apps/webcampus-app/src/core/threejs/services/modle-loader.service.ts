import { Service } from '@angular/core';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Service()
export class ModelLoaderService {
  private loader = new GLTFLoader();
  loadModel(url: string): Promise<GLTF> {
    return this.loader.loadAsync(url);
  }
}
