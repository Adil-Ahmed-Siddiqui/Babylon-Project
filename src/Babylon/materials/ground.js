import { Texture, PBRMaterial } from "@babylonjs/core";

export function createGroundMaterial(scene) {
  const groundMat = new PBRMaterial("groundMat", scene);
  const uvScale = 10;

  groundMat.albedoTexture = new Texture(
    "./textures/ground/ground_diffuse.jpg",
    scene
  );

  groundMat.bumpTexture = new Texture(
    "./textures/ground/ground_normal.jpg",
    scene
  );

  groundMat.invertNormalMapX = true;
  groundMat.invertNormalMapY = true;

  groundMat.useAmbientOcclusionFromMetallicTextureRed = true;
  groundMat.useRoughnessFromMetallicTextureGreen = true;
  groundMat.useMetallnessFromMetallicTextureBlue = true;

  groundMat.metallicTexture = new Texture(
    "./textures/ground/ground_ao_rough_metal.jpg",
    scene
  );

  let textures = [
    groundMat.metallicTexture,
    groundMat.bumpTexture,
    groundMat.albedoTexture,
  ];

  textures.forEach((texture) => {
    texture.uScale = uvScale;
    texture.vScale = uvScale;
  });

  groundMat.environmentIntensity = 3;

  return groundMat;
}
