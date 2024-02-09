import "@babylonjs/loaders";
import "@babylonjs/inspector";
import { Vector3 } from "@babylonjs/core";

import {
  createFreeCamera,
  createArcCamera,
  createFollowCamera,
  createUniversalCamera,
} from "./cameras";
import { createSkyBox } from "./environment";
import { createGround, createFootball, createLog, createRoad } from "./meshes";
import { toggleLights } from "./actions";
import {
  importFootballField,
  importCar,
  importStreetLight,
  importStore,
  importLamp,
  importWatch,
} from "./models";

export class BabylonProject {
  constructor(engine, canvas, scene) {
    this.engine = engine;
    this.canvas = canvas;
    this.scene = scene;

    this.createEnvironment();
  }

  async createEnvironment() {
    this.engine.displayLoadingUI();

    await importFootballField(this.scene);
    await importStreetLight(this.scene);
    await importCar(this.scene);
    await importStore(this.scene);
    await importLamp(this.scene);
    await importWatch(this.scene);

    createSkyBox(this.scene);

    createFreeCamera(this.scene);
    // createUniversalCamera(this.scene, this.canvas);
    // createArcCamera(this.scene, this.canvas);
    // createFollowCamera(this.scene, this.canvas);

    createGround(this.scene);
    createRoad(this.scene);
    createFootball(this.scene);
    // createLog(this.scene);

    toggleLights(this.scene);

    this.scene.meshes.forEach((mesh) => {
      mesh.checkCollisions = true;
    });

    setTimeout(() => this.engine.hideLoadingUI(), 1000);
  }
}
