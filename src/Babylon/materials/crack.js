import { Texture, PBRMaterial } from "@babylonjs/core";

export function createCrackMaterial(scene) {
  const crackMat = new PBRMaterial("crackMat", scene);

  crackMat.roughness = 1;

  crackMat.albedoTexture = new Texture(
    "./textures/crack/crack_diffuse.png",
    scene
  );

  crackMat.albedoTexture.hasAlpha = true;

  crackMat.zOffset = -3;

  return crackMat;
}
