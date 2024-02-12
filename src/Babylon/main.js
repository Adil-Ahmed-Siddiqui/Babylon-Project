import "@babylonjs/loaders";
import "@babylonjs/inspector";

import { createFreeCamera } from "./cameras";
import { createSkyBox } from "./environment";
import { createGround, createFootball, createLog, createRoad } from "./meshes";
import { toggleLights, toggleCameras } from "./actions";
import { createPhysics } from "./physics.js";
import { createGUI } from "./gui/index.js";
import {
  importFootballField,
  importCar,
  importStreetLight,
  importStore,
  importLamp,
  importWatch,
  importEnemies,
} from "./models";

export class BabylonProject {
  constructor(engine, canvas, scene) {
    this.engine = engine;
    this.canvas = canvas;
    this.scene = scene;
    this.skyBoxes = [];
    this.nonRigidMeshes = [];
    this.enemies = [];

    this.createEnvironment();
  }

  async createEnvironment() {
    this.engine.displayLoadingUI();
    createPhysics(this.scene, this.engine);

    await importFootballField(this.scene, this.nonRigidMeshes);
    await importStreetLight(this.scene);
    await importCar(this.scene);
    await importStore(this.scene);
    await importLamp(this.scene);
    await importWatch(this.scene);

    this.skyBoxes = createSkyBox(this.scene);

    createFreeCamera(this.scene);

    createGround(this.scene);
    createRoad(this.scene);
    createFootball(this.scene);
    // createLog(this.scene);

    toggleLights(this.scene, this.skyBoxes);
    toggleCameras(this.scene, this.canvas, this.engine);

    await importEnemies(this.scene, this.engine, this.enemies);

    this.scene.meshes.forEach((mesh) => {
      if (!this.nonRigidMeshes.includes(mesh)) {
        mesh.checkCollisions = true;
      }
    });

    await createGUI(this.scene, this.engine, this.canvas);

    setTimeout(() => this.engine.hideLoadingUI(), 1000);
  }
}
