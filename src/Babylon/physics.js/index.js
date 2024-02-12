import Ammo from "ammojs-typed";
import { Vector3, Matrix, MeshBuilder } from "@babylonjs/core";
import * as CANNON from "cannon";
import { AmmoJSPlugin, CannonJSPlugin, Sound } from "@babylonjs/core";

import { createCrackMaterial } from "../materials/crack";
import { createBloodMaterial } from "../materials/blood";

export function createPhysics(scene, engine) {
  scene.enablePhysics(
    new Vector3(0, -9.81, 0),
    new CannonJSPlugin(true, 10, CANNON)
  );

  createPickingRay(scene, engine);
}

function createPickingRay(scene, engine) {
  const crackMat = createCrackMaterial(scene);
  const bloodMat = createBloodMaterial(scene);
  const hitSound = new Sound("hit", "./audio/hit.mp3", scene, null, {
    loop: false,
    autoplay: false,
  });
  const fireSound = new Sound("hit", "./audio/fire.mp3", scene, null, {
    loop: false,
    autoplay: false,
    volume: 0.1,
  });

  scene.onPointerDown = (evt) => {
    if (scene.cameras[0].name === "camera_D") {
      fireSound.play();
      //   engine.enterPointerlock();

      const ray = scene.createPickingRay(
        scene.pointerX,
        scene.pointerY,
        Matrix.Identity(),
        scene.cameras[0]
      );

      const raycastHit = scene.pickWithRay(ray);

      if (raycastHit.hit && raycastHit.pickedMesh.name !== "alien") {
        console.log(raycastHit.pickedMesh.name);

        const crack = MeshBuilder.CreateDecal("crack", raycastHit.pickedMesh, {
          position: raycastHit.pickedPoint,
          normal: raycastHit.getNormal(true),
          size: new Vector3(0.2, 0.2, 0.2),
        });

        crack.isPickable = false;
        crack.material = crackMat;
        crack.setParent(raycastHit.pickedMesh);

        setTimeout(() => crack.dispose(), 3000);
      } else if (raycastHit.hit && raycastHit.pickedMesh.name === "alien") {
        const blood = MeshBuilder.CreateDecal("blood", raycastHit.pickedMesh, {
          position: raycastHit.pickedPoint,
          normal: raycastHit.getNormal(true),
          size: new Vector3(0.05, 0.05, 0.05),
        });

        blood.isPickable = false;
        blood.material = bloodMat;
        blood.setParent(raycastHit.pickedMesh);

        hitSound.play();

        // let alienCol = raycastHit.pickedMesh.parent;

        // do {
        //   alienCol = alienCol.parent;
        // } while (!alienCol.physicsImpostor);

        // alienCol.physicsImpostor.applyImpulse(
        //   ray.direction.scale(25),
        //   raycastHit.pickedPoint
        // );

        setTimeout(() => blood.dispose(), 3000);
      }
    }
  };
}
