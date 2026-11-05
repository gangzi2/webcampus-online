import { Service, signal } from '@angular/core';
import * as THREE from 'three';

@Service()
export class EventManager {
  scene = signal(new THREE.Scene());
  loaded = signal(false);
  path = signal('');

  private data: string[] = [];
}
