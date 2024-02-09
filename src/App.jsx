import "./App.css";
import SceneComponent from "babylonjs-hook";
import { BabylonProject } from "./Babylon/main";

const onSceneReady = (scene) => {
  scene.debugLayer.show(); // show inspector
  const canvas = scene.getEngine().getRenderingCanvas();
  const engine = scene.getEngine();

  new BabylonProject(engine, canvas, scene);
};

const onRender = (scene) => {
  // Will run on every frame render
  if (scene.meshes[36]) {
    const car = scene.meshes[36];
    if (car.position.z > -4) {
      car.position.z -= 0.025;
    }
  }
};

const App = () => (
  <SceneComponent
    antialias
    onSceneReady={onSceneReady}
    onRender={onRender}
    id="my-canvas"
    style={{
      width: "100%",
      height: "96vh",
      margin: "auto",
    }}
  />
);

export default App;
