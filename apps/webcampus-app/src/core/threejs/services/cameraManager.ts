import { Service } from '@angular/core';

@Service()
export class CameraManager {
  mainCamera = 0;
  currentCamera = 0;
  camera = 0;
  offset = 0;
  posInit = 0;
  posDiff = 0;
  targetInit = 0;
  targetDiff = 0;
  duration = 0;
  nextCamera = 0;
  quaternionTmp = 0;
  cameraList = [];
  cameraStack = {};
  state = 'free'; //freeze, free, SwitchInProgress, ....
  skip = false;
  move = false;

  // createMainCamera(data) {
  //   let cam = 0;
  //   if (data.camera_main != undefined) {
  //     cam = new Camera_fix(data.camera_main.name, data.camera_main);
  //     this.cameraStack[data.camera_main.name] = cam;
  //   } else {
  //     cam = new Camera_fix('CAM_MAIN');
  //     this.cameraStack['CAM_MAIN'] = cam;
  //   }

  //   this.mainCamera = cam;
  //   this.camera = this.mainCamera.camera;
  // }

  // zoomBackEvent(Node) {
  //   for (const ev in Node.event) {
  //     if (
  //       Node.event[ev] !== undefined &&
  //       Node.event[ev].obj !== undefined &&
  //       Node.event[ev].obj.update !== undefined &&
  //       Node.event[ev].fireOnZoomBack != undefined &&
  //       Node.event[ev].fireOnZoomBack == true
  //     ) {
  //       const varId = Node.event[ev].variable_name;

  //       //launch zoomback
  //       if (Node.event[ev].persistant == true)
  //         eventManager.addItemInUpdated(Node, Node.event[ev]);
  //       else Node.event[ev].obj.update(true, true);

  //       //start all events associated to varId
  //       variableManager.dispatchVariableFromEvent(Node.event[ev]);
  //     }
  //   }
  //   for (const child in Node.children) this.zoomBackEvent(Node.children[child]);
  // }
}
