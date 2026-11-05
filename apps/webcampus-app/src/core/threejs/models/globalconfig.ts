export interface GlobalConfig {
  main: Main;
  ihm: string[];
  checkTerrainHeight: boolean;
  commentaire1: string;
  SceneLoader: SceneLoader;
  commentaire2: string;
  ChooseRoom: ChooseRoom;
  environment: Environment;
}

export interface Main {
  variableLoop: number;
  gameStepLoop: number;
}

export interface SceneLoader {
  camera_near: number;
  camera_far: number;
  camera_aspect: number;
  light_map_extension: string;
  light_map_directory: string;
  camera_main: CameraMain;
  defaultHeight: number;
}

export interface CameraMain {
  name: string;
  near: number;
  far: number;
  fov: number;
  aspect: number;
  type: string;
}

export interface ChooseRoom {
  firstloadedfile: string;
  firstroom: string;
  ams: Ams;
}

export interface Ams {
  path_scene: string;
  path_event: string;
  path_camera: string;
  path_collision: string;
  positionStart: number[];
  rotationStart: number;
}

export interface Environment {
  lights: light[];
}

export interface light {
  type: string;
  hex: string;
  intensity: number;
  distance: number;
  angle: number;
  exponent: number;
  position: number[];
  target: number[];
  castShadow: boolean;
  onlyShadow: boolean;
  shadowDarkness: number;
  shadowMapWidth: number;
  shadowMapHeight: number;
  shadowCameraVisible: boolean;
}
