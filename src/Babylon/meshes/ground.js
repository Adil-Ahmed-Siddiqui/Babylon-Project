import { MeshBuilder } from "@babylonjs/core";
import { createGroundMaterial } from "../materials/ground";

export function createGround(scene) {
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 10, height: 10 },
    scene
  );

  ground.material = createGroundMaterial(scene);
  ground.material.maxSimultaneousLights = 10;
}
