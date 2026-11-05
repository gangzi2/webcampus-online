import { Service } from '@angular/core';
import * as CANNON from 'cannon-es';
import * as THREE from 'three';
@Service()
export class PhysxManager {
  world: CANNON.World = new CANNON.World();
  solver: CANNON.GSSolver = new CANNON.GSSolver();
  split = true;
  physicsMaterial: CANNON.Material = new CANNON.Material();
  sphereBody: CANNON.Body | null = null;
  physics_bodies: CANNON.Body[] = [];
  physics_mesh: THREE.Mesh[] = [];
  intersectsMove = 0;
  physicsContactMaterial: CANNON.ContactMaterial | null = null;
  //FOLLOW PATH
  findPointsArray: THREE.Vector3[] = [];
  prec_t = 0;
  isFollow = false;
  deltaFollow = 0;
  tube = 0;
  tubeMesh: THREE.Mesh | null = null;
  tubeEndDebug: THREE.Mesh | null = null;
  finishPoint: THREE.Vector3 = new THREE.Vector3();
  curPointPath = -1;
  speed = 2.5;

  mass = 100;
  radiusSphere = 20;

  init() {
    this.world = new CANNON.World();
    this.world.quatNormalizeSkip = 0;
    this.world.quatNormalizeFast = false;

    this.solver = new CANNON.GSSolver();

    this.world.defaultContactMaterial.contactEquationStiffness = 1e7;
    this.world.defaultContactMaterial.contactEquationRelaxation = 4;

    this.solver.iterations = 10;
    this.solver.tolerance = 0.1;
    this.split = true;
    if (this.split) this.world.solver = new CANNON.SplitSolver(this.solver);
    else this.world.solver = this.solver;

    this.world.gravity.set(0, 0, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();

    // Create a slippery material (friction coefficient = 0.0)
    this.physicsMaterial = new CANNON.Material();
    this.physicsContactMaterial = new CANNON.ContactMaterial(
      this.physicsMaterial,
      this.physicsMaterial,
      {
        friction: 0.0,
        restitution: 0.0,
      }, // restitution
    );
    /*
																friction: 0.3,
        restitution: 0.3,
        contactEquationStiffness: 1e7,
        contactEquationRelaxation: 3,
        frictionEquationStiffness: 1e7,
        frictionEquationRelaxation: 3
        */
    // We must add the contact materials to the world
    this.world.addContactMaterial(this.physicsContactMaterial);

    const sphereShape = new CANNON.Sphere(this.radiusSphere);

    this.sphereBody = new CANNON.Body({
      mass: this.mass,
      material: this.physicsMaterial,
      linearDamping: 0.0,
    });
    this.sphereBody.addShape(sphereShape);
    this.sphereBody.position.set(-0, this.radiusSphere, 0);

    this.world.addBody(this.sphereBody);
  }

  buildCollision(listBoundingBoxes: any[], scene: any) {
    const boxBody = new CANNON.Body({
      mass: 0,
      material: this.physicsMaterial,
    });

    for (let i = 0; i < listBoundingBoxes.length; i++) {
      listBoundingBoxes[i].updateMatrix();
      listBoundingBoxes[i].updateMatrixWorld();
      //console.log("builld collision " + listBoundingBoxes[i].name);
      //rename if the name is used
      while (scene.objects[listBoundingBoxes[i].name] !== undefined)
        listBoundingBoxes[i].name += '_second';

      //set them invisible, add collision box to scene
      listBoundingBoxes[i].visible = false;

      const x = listBoundingBoxes[i].position.x;
      const y = listBoundingBoxes[i].position.y;
      const z = listBoundingBoxes[i].position.z;

      if (listBoundingBoxes[i].name.substring(0, 5).toLowerCase() == 'floor')
        continue; // = exclude from cannon collision, but need for adjuste height position
      else if (
        listBoundingBoxes[i].name.substring(0, 3).toLowerCase() == 'con'
      ) {
        //|| (listBoundingBoxes[i].name.substring(0, 5).toLowerCase() == "floor"))
        //listBoundingBoxes[i].geometry.computeFaceNormals();
        const verts = [],
          faces = [],
          normals = [];
        for (
          let j = 0;
          j < listBoundingBoxes[i].geometry.vertices.length;
          j++
        ) {
          const vert = listBoundingBoxes[i].geometry.vertices[j];
          verts.push(new CANNON.Vec3(vert.x, vert.y, vert.z));
        }

        for (let j = 0; j < listBoundingBoxes[i].geometry.faces.length; j++) {
          const face = listBoundingBoxes[i].geometry.faces[j];
          faces.push([face.a, face.b, face.c]);
          normals.push([face.normal.x, face.normal.y, face.normal.z]);
        }

        const boxShape = new CANNON.ConvexPolyhedron({
          vertices: verts,
          faces: faces,
        });
        //boxBody.addShape(boxShape);
        //boxBody.position.set(x,y,z);

        boxBody.addShape(boxShape, new CANNON.Vec3(x, y, z));
      } else {
        const distx = listBoundingBoxes[i].geometry.boundingBox.max.x;
        const disty = listBoundingBoxes[i].geometry.boundingBox.max.y;
        const distz = listBoundingBoxes[i].geometry.boundingBox.max.z;

        const boxShape = new CANNON.Box(new CANNON.Vec3(distx, disty, distz));

        boxBody.addShape(boxShape, new CANNON.Vec3(x, y, z));
      }
    }

    this.world.addBody(boxBody);
    this.physics_bodies.push(boxBody);
  }

  getFloorIntersection(position: any, floorCollisions: any) {
    const raycaster = new THREE.Raycaster(
      new THREE.Vector3(position.x, position.y + 20, position.z),
      new THREE.Vector3(0, -1, 0),
    );
    const intersectObjects = raycaster.intersectObjects(floorCollisions);

    if (intersectObjects && intersectObjects.length > 0) {
      const pointIntersection = new THREE.Vector3(
        position.x,
        intersectObjects[0].point.y,
        position.z,
      );
      pointIntersection.y += this.radiusSphere;
      return pointIntersection;
    }

    return position;
  }

  // mouseIntersection(event: any, forceMousePosition: any) {
  //   if (
  //     !nodeManager ||
  //     !nodeManager.curNode ||
  //     !sceneManager.loaded ||
  //     !controls ||
  //     container3d.clientWidth == 0
  //   ) {
  //     return;
  //   }
  //   const mouse = new THREE.Vector3(0, 0, 0);

  //   if (forceMousePosition == undefined) {
  //     //layerX in firefox, offsetX for other browser
  //     const _offsetX =
  //       event.offsetX == undefined ? event.layerX : event.offsetX;
  //     const _offsetY =
  //       event.offsetY == undefined ? event.layerY : event.offsetY;
  //     mouse.x = (_offsetX / parseInt($(container3d).width())) * 2 - 1;
  //     mouse.y = -(_offsetY / parseInt($(container3d).height())) * 2 + 1;
  //     mouse.z = 0.5;
  //   } else {
  //     mouse.x = forceMousePosition.x;
  //     mouse.y = forceMousePosition.y;
  //     mouse.z = 0.5;
  //   }
  //   const projector = new THREE.Projector();
  //   const raycaster = projector.pickingRay(mouse.clone(), cameraManager.camera);

  //   controls.detectEvent(false);
  //   if (nodeManager && sceneManager.loaded) {
  //     if (this.intersectsMove && this.intersectsMove.length > 0) {
  //       for (let i = 0; i < this.intersectsMove.length; i++) {
  //         if (
  //           this.intersectsMove[i].object.nodeCorespond &&
  //           this.intersectsMove[i].object.nodeCorespond.distanceTo <
  //             this.intersectsMove[i].object.nodeCorespond.distanceTo
  //         )
  //           this.intersectsMove[i].object.visible = false;
  //       }
  //     }
  //     this.intersectsMove = raycaster.intersectObjects(
  //       nodeManager.curNode.arrayBBox,
  //     );

  //     if (this.intersectsMove.length > 0) {
  //       for (let i = 0; i < this.intersectsMove.length; i++) {
  //         if (
  //           this.intersectsMove[i].object.nodeCorespond &&
  //           this.intersectsMove[i].object.nodeCorespond.visibility == true &&
  //           this.intersectsMove[i].distance <
  //             this.intersectsMove[i].object.nodeCorespond.distanceTo
  //         ) {
  //           if (
  //             nodeManager.isClickable(
  //               this.intersectsMove[i].object.nodeCorespond,
  //             ) ||
  //             this.intersectsMove[i].object.nodeCorespond.accessible
  //           )
  //             controls.detectEvent(
  //               true,
  //               this.intersectsMove[i].object.nodeCorespond,
  //             ); //container3d.style.cursor="pointer";//change Cursors
  //           break;
  //         } else {
  //           if (
  //             Globals.SceneLoader.camera_main.distanceTo &&
  //             this.intersectsMove[i].object.visible == true &&
  //             this.intersectsMove[i].distance <
  //               Globals.SceneLoader.camera_main.distanceTo
  //           ) {
  //             controls.detectEvent(true); //container3d.style.cursor="pointer";//change Cursors
  //             break;
  //           }
  //         }
  //       }
  //     }
  //   }
  // } ////////////////PATH FINDING ///////////////////////////////////////////////////////////

  // makePath(mouse: any) {
  //   if (nodeManager.collisionBoxes.length !== 0) {
  //     this.finishPoint = findGoal(mouse);
  //     if (this.finishPoint.equals(myAvatar.pos)) return;

  //     if (this.tubeEndDebug) sceneManager.scene.remove(this.tubeEndDebug);

  //     this.findPointsArray = findPoint(this.finishPoint);

  //     if (this.tubeMesh) sceneManager.scene.remove(this.tubeMesh);

  //     const listPoints = [];
  //     for (let i = this.findPointsArray.length - 1; i >= 0; i--)
  //       listPoints.push(this.findPointsArray[i].pos);

  //     const spline = new THREE.SplineCurve3(listPoints);

  //     const segments = 100;
  //     this.tube = new THREE.TubeGeometry(spline, segments, 2, 1, false, false);

  //     this.prec_t = 0;
  //     this.isFollow = true;
  //     this.curPointPath = -1;
  //     this.deltaFollow = Date.now();
  //   }
  // }

  // goSplines(list: any) {
  //   // Try Animate Camera Along Spline
  //   const normal = new THREE.Vector3();
  //   const binormal = new THREE.Vector3();
  //   const time = Date.now() - this.deltaFollow;
  //   let looptime = 20 * 1000; //20 sec
  //   looptime = this.speed * 1.5 * this.tube.path.getLength();
  //   const t = (time % looptime) / looptime;

  //   const pos = this.tube.path.getPointAt(t);
  //   if (t >= this.prec_t) {
  //     // interpolation
  //     const segments = this.tube.tangents.length;
  //     const pickt = t * segments;
  //     const pick = Math.floor(pickt);
  //     const pickNext = (pick + 1) % segments;

  //     binormal.subVectors(
  //       this.tube.binormals[pickNext],
  //       this.tube.binormals[pick],
  //     );
  //     binormal.multiplyScalar(pickt - pick).add(this.tube.binormals[pick]);

  //     const dir = this.tube.path.getTangentAt(t);
  //     const offset = 15;

  //     normal.copy(binormal).cross(dir);

  //     // We move on an offset on its binormal
  //     pos.add(normal.clone().multiplyScalar(offset));

  //     const pos2 = new THREE.Vector3();
  //     pos2.copy(pos);
  //     pos2.y = this.radiusSphere;
  //     controls.setObject(pos2);

  //     const lookAt = this.tube.path
  //       .getPointAt((t + 30 / this.tube.path.getLength()) % 1)
  //       .multiplyScalar(1);

  //     // Camera Orientation 2 - up orientation via normal
  //     lookAt.copy(pos).add(dir);

  //     lookAt.y = this.radiusSphere;
  //     const obj = new THREE.Object3D();

  //     obj.position.copy(controls.getObject().position);
  //     obj.matrix.lookAt(
  //       controls.getObject().position,
  //       lookAt,
  //       new THREE.Vector3(0, 1, 0),
  //     );
  //     obj.rotation.setFromRotationMatrix(obj.matrix, 'YXZ');

  //     let rotDiff = controls.getObject().rotation.y - obj.rotation.y;
  //     if (controls.getObject().rotation.y * obj.rotation.y < 0) {
  //       // not same sign = not on same cadran 0->pi; -pi->0
  //       rotDiff =
  //         Math.PI -
  //         Math.abs(controls.getObject().rotation.y) +
  //         (Math.PI - Math.abs(obj.rotation.y));
  //       if (controls.getObject().rotation.y > 0) rotDiff = -1 * rotDiff;
  //     }

  //     //if(Math.abs(rotDiff)>Math.PI)
  //     //	rotDiff = rotDiff - Math.PI ;
  //     rotDiff = rotDiff * t;
  //     //controls.getObject().rotation.set(0, controls.getObject().rotation.y - rotDiff, 0);
  //     //controls.getObject().rotation._updateQuaternion();
  //     controls.getObject().rotation.y =
  //       controls.getObject().rotation.y - rotDiff;

  //     /*if( Math.abs(controls.getObject().rotation.y) > Math.PI)
  // 		{
  // 			var _diff = Math.abs(Math.abs(controls.getObject().rotation.y) - Math.PI);
  // 			if( controls.getObject().rotation.y < 0)
  // 				controls.getObject().rotation.y = Math.PI - _diff;
  // 			else
  // 				controls.getObject().rotation.y = -Math.PI + _diff;
  // 		}
  // 				debugstats.add("rotation " + yawObject.rotation.y );		*/
  //     //BUG with cannonBody when compute pah
  //     //controls.getObject().rotation.y = obj.rotation.y;
  //     //controls.getObject().quaternion.setFromEuler({_x:0, _y:obj.rotation.y, _z:0},"YXZ");
  //     //controls.getObject().matrix.lookAt(controls.getObject().position, lookAt, new THREE.Vector3(0,1,0));
  //     //controls.getObject().rotation.setFromRotationMatrix( controls.getObject().matrix, "YXZ" );

  //     this.prec_t = t;
  //   } else {
  //     this.isFollow = false;
  //     this.prec_t = 0;
  //     controls.getObject().position.copy(list[0].pos);
  //     controls.getObject().position.y = this.radiusSphere;
  //     //myAvatar.pos = list[0].pos
  //   }
  // }

  // folowUpdate() {
  //   this.goSplines(this.findPointsArray);
  // }

  update(delta: number) {
    this.world.step(delta / 1000);
  }
}
