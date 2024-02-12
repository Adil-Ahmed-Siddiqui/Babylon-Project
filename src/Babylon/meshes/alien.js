import { MeshBuilder, PhysicsImpostor, Vector3 } from "@babylonjs/core";

export function createAlien(alien) {
  const alienCol = MeshBuilder.CreateBox("alienCol", {
    width: 0.4,
    height: 1.2,
    depth: 0.4,
  });

  alienCol.position = new Vector3(3, 3, 3.5);
  alienCol.visibility = 0.5;
  alienCol.isPickable = false;

  alienCol.physicsImpostor = new PhysicsImpostor(
    alienCol,
    PhysicsImpostor.BoxImpostor,
    { mass: 100 }
  );

  return alienCol;
}
