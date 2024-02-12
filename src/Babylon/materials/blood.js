import { Texture, PBRMaterial } from "@babylonjs/core";

export function createBloodMaterial(scene) {
  const bloodMat = new PBRMaterial("bloodMat", scene);

  bloodMat.roughness = 1;

  bloodMat.albedoTexture = new Texture(
    "./textures/blood/blood_diffuse.png",
    scene
  );

  bloodMat.albedoTexture.hasAlpha = true;

  bloodMat.zOffset = -3;

  return bloodMat;
}
