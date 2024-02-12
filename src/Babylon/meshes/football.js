import { MeshBuilder, Vector3, PhysicsImpostor } from "@babylonjs/core";
import { createFootballMaterial } from "../materials/football";

export function createFootball(scene) {
  const ball = MeshBuilder.CreateSphere("ball", { diameter: 0.25 }, scene);

  ball.parent = scene.meshes[5];
  ball.position = new Vector3(0, 0, 0.7);

  ball.material = createFootballMaterial(scene);

  ball.physicsImpostor = new PhysicsImpostor(
    ball,
    PhysicsImpostor.BoxImpostor,
    { mass: 1 }
  );
}
