import { MeshBuilder, Vector3, PhysicsImpostor } from "@babylonjs/core";
import { createFootballMaterial } from "../materials/football";

export function createFootball(scene) {
  const ball = MeshBuilder.CreateSphere("ball", { diameter: 0.25 }, scene);

  // ball.parent = scene.meshes[5];
  ball.position = new Vector3(3, 0.25 / 2, 3);

  ball.material = createFootballMaterial(scene);

  ball.physicsImpostor = new PhysicsImpostor(
    ball,
    PhysicsImpostor.SphereImpostor,
    { mass: 10, friction: 1, restitution: 1 }
  );
}
