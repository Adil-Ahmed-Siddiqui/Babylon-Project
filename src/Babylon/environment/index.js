import { CubeTexture } from "@babylonjs/core";

export function createSkyBox(scene) {
  const envTex = CubeTexture.CreateFromPrefilteredData(
    "./environment/sky.env",
    scene
  );

  scene.environmentTexture = envTex;
  scene.createDefaultSkybox(envTex, true);
}
