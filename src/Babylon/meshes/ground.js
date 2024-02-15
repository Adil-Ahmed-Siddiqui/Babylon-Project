import { MeshBuilder, PhysicsImpostor } from "@babylonjs/core";
import { createGroundMaterial } from "../materials/ground";

export function createGround(scene) {
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 100, height: 100 },
    scene
  );

  ground.material = createGroundMaterial(scene);
  ground.material.maxSimultaneousLights = 10;

  ground.physicsImpostor = new PhysicsImpostor(
    ground,
    PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 1 }
  );
}
