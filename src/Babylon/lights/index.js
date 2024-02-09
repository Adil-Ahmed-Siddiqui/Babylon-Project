import {
  Vector3,
  HemisphericLight,
  DirectionalLight,
  SpotLight,
  PointLight,
  Color3,
} from "@babylonjs/core";

export function createHemiSphericLight(scene) {
  const hemiLight = new HemisphericLight(
    "hemiLight",
    new Vector3(0, 1, 0),
    scene
  );

  hemiLight.intensity = 1;
}

export function createDirectionalLight(scene) {
  const directionalLight = new DirectionalLight(
    "directionalLight",
    new Vector3(0, -1, 0),
    scene
  );

  directionalLight.intensity = 0.4;
}

export function createPointLight(scene, number) {
  const pointLight = new PointLight(
    `pointLight ${number}`,
    new Vector3(Math.floor(2 * number) - 2, 1, Math.floor(2 * number) - 2),
    scene
  );

  pointLight.intensity = 10;
  pointLight.diffuse = new Color3(1, 1, 0);

  return pointLight;
}

export function createSpotLight(scene) {
  const spotLight = new SpotLight(
    `spotLight`,
    new Vector3(0, 1, 0),
    new Vector3(0, 1, 3),
    Math.PI / 2,
    10,
    scene
  );

  spotLight.intensity = 10000;
  spotLight.diffuse = new Color3(1, 0, 0);

  return spotLight;
}
