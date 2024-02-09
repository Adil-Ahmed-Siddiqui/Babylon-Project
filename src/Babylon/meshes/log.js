import { MeshBuilder, Vector3 } from "@babylonjs/core";

export function createLog(scene) {
  const log = MeshBuilder.CreateCylinder(
    "log",
    { height: 0.5, diameter: 0.5 },
    scene
  );

  log.position = new Vector3(5, 0.13, 0);
}
