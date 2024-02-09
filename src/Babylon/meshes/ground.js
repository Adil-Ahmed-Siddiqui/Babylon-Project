import { MeshBuilder } from "@babylonjs/core";
import { createGroundMaterial } from "../materials/ground";

export function createGround(scene) {
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 50, height: 50 },
    scene
  );

  ground.material = createGroundMaterial(scene);
}
