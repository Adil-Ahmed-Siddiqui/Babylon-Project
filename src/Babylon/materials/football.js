import { Texture, PBRMaterial } from "@babylonjs/core";

export function createFootballMaterial(scene) {
  const ballMat = new PBRMaterial("ballMat", scene);
  const uvScale = 1;
  const texArray = [];

  const diffuseTex = new Texture(
    "./textures/football/football_diffuse.jpg",
    scene
  );
  ballMat.albedoTexture = diffuseTex;
  texArray.push(diffuseTex);

  const normalTex = new Texture(
    "./textures/football/football_normal.png",
    scene
  );
  ballMat.bumpTexture = normalTex;
  ballMat.invertNormalMapX = true;
  ballMat.invertNormalMapY = true;
  texArray.push(normalTex);

  const aoTex = new Texture("./textures/football/football_ao.jpg", scene);
  ballMat.ambientTexture = aoTex;
  texArray.push(aoTex);

  texArray.forEach((tex) => {
    tex.uScale = uvScale;
    tex.vScale = uvScale;
  });

  ballMat.roughness = 1;
  ballMat.environmentIntensity = 1;

  return ballMat;
}
