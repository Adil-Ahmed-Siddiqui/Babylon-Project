import { ActionManager, ExecuteCodeAction, CubeTexture } from "@babylonjs/core";

export function toggleLights(scene) {
  scene.actionManager = new ActionManager(scene);

  scene.actionManager.registerAction(
    new ExecuteCodeAction(
      {
        trigger: ActionManager.OnKeyUpTrigger,
        parameter: "a",
      },
      function () {
        if (scene._environmentTexture.name.includes("sky")) {
          changeSkybox(scene, "night");
          return;
        }

        changeSkybox(scene, "sky");
      }
    )
  );
}

function changeSkybox(scene, filename) {
  const envTex = CubeTexture.CreateFromPrefilteredData(
    `./environment/${filename}.env`,
    scene
  );

  scene.environmentTexture = envTex;
  scene.createDefaultSkybox(envTex, true);
}
