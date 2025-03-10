import { MeshBuilder, PhysicsImpostor } from "@babylonjs/core";
import { createRoadMaterial } from "../materials/road";

export function createRoad(scene) {
  const road = MeshBuilder.CreateGround(
    "road",
    { width: 2.5, height: 10 },
    scene
  );

  road.position.y = 0.001;
  road.material = createRoadMaterial(scene);
  road.material.maxSimultaneousLights = 10;

  road.physicsImpostor = new PhysicsImpostor(
    road,
    PhysicsImpostor.BoxImpostor,
    { mass: 0 }
  );
}
