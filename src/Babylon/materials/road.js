import { Texture, PBRMaterial } from "@babylonjs/core";

export function createRoadMaterial(scene) {
  const roadMat = new PBRMaterial("roadMat", scene);
  const vScale = 4;

  roadMat.albedoTexture = new Texture(
    "./textures/road/road_diffuse.jpg",
    scene
  );

  roadMat.bumpTexture = new Texture("./textures/road/road_normal.jpg", scene);

  roadMat.invertNormalMapX = true;
  roadMat.invertNormalMapY = true;

  roadMat.roughness = new Texture("./textures/road/road_rough.jpg", scene);

  roadMat.ambientTexture = new Texture("./textures/road/road_ao.jpg", scene);

  roadMat.metallicTexture = new Texture(
    "./textures/road/road_metal.jpg",
    scene
  );

  let textures = [
    roadMat.metallicTexture,
    roadMat.bumpTexture,
    roadMat.albedoTexture,
    roadMat.ambientTexture,
    roadMat.roughness,
  ];

  textures.forEach((texture) => {
    texture.vScale = vScale;
  });

  roadMat.environmentIntensity = 2;

  return roadMat;
}
