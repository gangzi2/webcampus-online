import { inject, Service, signal } from '@angular/core';
import * as THREE from 'three';
import { CameraManager } from './cameraManager';
import { EventManager } from './eventManager';
import { NodeManager } from './nodeManager';
import { PhysxManager } from './physxManager';
import { SceneManager } from './sceneManager';

@Service()
export class Start {
  globalConfig = signal({});
  sceneManager = inject(SceneManager);
  gameManager = null;
  physxManager = inject(PhysxManager);
  cameraManager = inject(CameraManager);
  eventManager = inject(EventManager);
  nodeManager = inject(NodeManager);
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  /**
   * Initialise la simulation en chargeant le fichier de configuration.
   * @param projetNom Le nom du projet
   */
  initSimulation(projetNom: string) {
    //recuperer le simulation fichier config

    const configFilePath = `./simulations/${projetNom}/config.json`;
    // Charger le fichier de configuration
    fetch(configFilePath)
      .then(async (response) => {
        this.globalConfig.set(JSON.parse(await response.text()));
      })
      .catch((error) => {
        console.error('Erreur lors du chargement de la configuration:', error);
      });
  }

  init3D(containerEl: HTMLElement) {
    this.renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
    containerEl.appendChild(this.renderer.domElement);
  }
}
