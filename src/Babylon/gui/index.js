import { MeshBuilder, PhysicsImpostor, Vector3 } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui/2D";

export async function createGUI(scene, engine, canvas) {
  const calcPlane = MeshBuilder.CreatePlane("calcPlane", {
    width: 0.5,
    height: 0.75,
  });

  calcPlane.position = new Vector3(3, 0.75 / 2, 5);
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(calcPlane);
  await advancedTexture.parseFromSnippetAsync("86LGV7#5");

  let text_result = advancedTexture.getControlByName("Text_Result");
  text_result.text = "";

  const buttons = advancedTexture.getControlsByType("Button");
  let calcError = false;

  buttons.forEach((button) => {
    button.onPointerClickObservable.add(function () {
      let btnText = button.getChildByName("Button_button");
      if (btnText.text == "=" && !calcError) {
        try {
          text_result.text = eval(text_result.text);
        } catch (err) {
          text_result.text = err;
          calcError = true;
          setTimeout(() => {
            calcError = false;
            text_result.text = "";
          }, 1000);
        }
      } else if (btnText.text != "=" && !calcError) {
        text_result.text += btnText.text;
      }
    });
  });
}
