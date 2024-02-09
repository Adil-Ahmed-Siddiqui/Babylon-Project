import { CubeTexture } from "@babylonjs/core";

export function createSkyBox(scene) {
  const envSkyTex = CubeTexture.CreateFromPrefilteredData(
    "./environment/sky.env",
    scene
  );

  const envNightTex = CubeTexture.CreateFromPrefilteredData(
    "./environment/night.env",
    scene
  );

  scene.environmentTexture = envSkyTex;
  scene.createDefaultSkybox(envSkyTex, true);

  return [envSkyTex, envNightTex];
}
