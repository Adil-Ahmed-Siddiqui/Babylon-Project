import { ActionManager, ExecuteCodeAction } from "@babylonjs/core";
import {
  createArcCamera,
  createFollowCamera,
  createFreeCamera,
  createUniversalCamera,
} from "../cameras";

export function toggleLights(scene, skyBoxes) {
  scene.actionManager = new ActionManager(scene);

  scene.actionManager.registerAction(
    new ExecuteCodeAction(
      {
        trigger: ActionManager.OnKeyUpTrigger,
        parameter: "l",
      },
      function () {
        if (scene._environmentTexture.name.includes("sky")) {
          changeSkybox(scene, skyBoxes[1]);
          scene.lights.forEach((light) => {
            light.intensity = 10;
          });
          return;
        }

        changeSkybox(scene, skyBoxes[0]);
        scene.lights.forEach((light) => {
          light.intensity = 0;
        });
      }
    )
  );
}

function changeSkybox(scene, env) {
  scene.meshes.find((mesh) => mesh.id == "hdrSkyBox").dispose();
  scene.environmentTexture = env;
  scene.createDefaultSkybox(env, true);
}

export function toggleCameras(scene, canvas, engine) {
  const watch = scene.meshes[72];
  const car = scene.meshes[36];

  scene.actionManager
    .registerAction(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnKeyUpTrigger,
          parameter: "c",
        },
        function () {
          scene.cameras[0].dispose();
          createUniversalCamera(scene, canvas, engine);
        }
      )
    )
    .then(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnKeyUpTrigger,
          parameter: "c",
        },
        function () {
          scene.cameras[0].dispose();
          createArcCamera(scene, canvas, watch);
        }
      )
    )
    .then(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnKeyUpTrigger,
          parameter: "c",
        },
        function () {
          scene.cameras[0].dispose();
          createFollowCamera(scene, canvas, car);
        }
      )
    )
    .then(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnKeyUpTrigger,
          parameter: "c",
        },
        function () {
          scene.cameras[0].dispose();
          createFreeCamera(scene);
        }
      )
    );
}
