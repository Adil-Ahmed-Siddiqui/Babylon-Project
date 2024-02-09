import { PBRMaterial, StandardMaterial, Texture } from "@babylonjs/core";

export function createGrassMaterial(scene) {
  const grassMat = new PBRMaterial("grassMat", scene);
  const uvScale = 20;
  const texArray = [];

  const diffuseTex = new Texture("./textures/grass/grass_diffuse.jpg", scene);
  grassMat.albedoTexture = diffuseTex;
  texArray.push(diffuseTex);

  const normalTex = new Texture("./textures/grass/grass_normal.png", scene);
  grassMat.bumpTexture = normalTex;
  grassMat.invertNormalMapX = true;
  grassMat.invertNormalMapY = true;
  texArray.push(normalTex);

  const aoTex = new Texture("./textures/grass/grass_ao.jpg", scene);
  grassMat.ambientTexture = aoTex;
  texArray.push(aoTex);

  const roughTex = new Texture("./textures/grass/grass_roughness.jpg", scene);
  grassMat.roughness = roughTex;
  texArray.push(roughTex);

  grassMat.environmentIntensity = 1;

  texArray.forEach((tex) => {
    tex.uScale = uvScale;
    tex.vScale = uvScale;
  });

  return grassMat;
}
