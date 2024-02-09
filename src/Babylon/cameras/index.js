import {
  FreeCamera,
  Vector3,
  ArcRotateCamera,
  FollowCamera,
  UniversalCamera,
} from "@babylonjs/core";

export function createFreeCamera(scene) {
  scene.onPointerDown = (evt) => {};

  const camera = new FreeCamera("camera_A", new Vector3(0, 1, -5), scene);
  camera.attachControl();
  camera.speed = 0.25;
}

export function createArcCamera(scene, canvas, targetMesh) {
  scene.onPointerDown = (evt) => {};

  const camera = new ArcRotateCamera(
    "camera_B",
    0,
    Math.PI / 2,
    0.2,
    targetMesh,
    scene
  );

  camera.attachControl(canvas, true);
  camera.wheelPrecision = 1000;

  camera.minZ = 0.055;

  camera.lowerRadiusLimit = 0.13;
  camera.upperRadiusLimit = 0.2;

  camera.useAutoRotationBehavior = true;
  camera.useFramingBehavior = true;
}

export function createFollowCamera(scene, canvas, targetMesh) {
  scene.onPointerDown = (evt) => {};

  const camera = new FollowCamera("camera_C", new Vector3(0, 1, -5), scene);

  camera.heightOffset = 3;
  camera.radius = 5;
  camera.rotationOffset = -90;
  camera.cameraAcceleration = 0.005;
  camera.maxCameraSpeed = 10;
  camera.minZ = 0.1;

  camera.attachControl(canvas, true);
  camera.lockedTarget = targetMesh;
}

export function createUniversalCamera(scene, canvas, engine) {
  scene.gravity = new Vector3(0, -0.15, 0);
  scene.collisionsEnabled = true;

  scene.onPointerDown = (evt) => {
    if (evt.button === 0) engine.enterPointerlock();
    if (evt.button === 1) engine.exitPointerlock();
  };

  const camera = new UniversalCamera("camera_D", new Vector3(3, 0.4, 0), scene);

  camera.applyGravity = true;
  camera.checkCollisions = true;

  camera.angularSensibility = 2500;

  camera.keysUp.push(87);
  camera.keysLeft.push(65);
  camera.keysDown.push(83);
  camera.keysRight.push(68);

  camera.ellipsoid = new Vector3(0.1, 0.2, 0.1);
  // camera.ellipsoidOffset = new Vector3(0, 0, 0);

  camera.minZ = 0.1;

  camera.setTarget(new Vector3(0, 0.4, 0));
  camera.attachControl(canvas, true);
  camera.speed = 0.05;
}
