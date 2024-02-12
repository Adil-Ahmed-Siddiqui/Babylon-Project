import { SceneLoader, Vector3 } from "@babylonjs/core";
import { createSpotLight, createPointLight } from "../lights";
import { createAlien } from "../meshes/alien";

export async function importFootballField(scene, nonRigidMeshes) {
  const models = await SceneLoader.ImportMeshAsync(
    "",
    "./models/",
    "football_field.glb"
  );

  const boundingInfo = models.meshes[0].getBoundingInfo();
  const height = boundingInfo.maximum.y - boundingInfo.minimum.y;

  models.meshes[0].position = new Vector3(-3.6, -0.11, 4);
  models.meshes[0].scaling = new Vector3(0.05, 0.05, 0.05);
  models.meshes[0].rotation = new Vector3(0, Math.PI / 2, 0);

  models.meshes.forEach((mesh) => {
    nonRigidMeshes.push(mesh);

    if (mesh.material) {
      mesh.material.environmentIntensity = 1;
    }
  });
}

export async function importCar(scene) {
  const models = await SceneLoader.ImportMeshAsync("", "./models/", "car.glb");

  const boundingInfo = models.meshes[0].getBoundingInfo();
  const height = boundingInfo.maximum.y - boundingInfo.minimum.y;

  models.meshes[0].position = new Vector3(0.5, height / 2, 4);
  models.meshes[0].scaling = new Vector3(0.2, 0.2, 0.2);

  models.meshes.forEach((mesh) => {
    if (mesh.material) {
      mesh.material.environmentIntensity = 1;
    }
  });
}

export async function importStore(scene) {
  const models = await SceneLoader.ImportMeshAsync(
    "",
    "./models/",
    "store_low_poly.glb"
  );

  const boundingInfo = models.meshes[0].getBoundingInfo();
  const height = boundingInfo.maximum.y - boundingInfo.minimum.y;

  models.meshes[0].position = new Vector3(-4.5, height / 2, -4.4);
  models.meshes[0].scaling = new Vector3(0.07, 0.07, 0.07);

  models.meshes.forEach((mesh) => {
    if (mesh.material) {
      mesh.material.environmentIntensity = 1;
    }
  });
}

export async function importLamp(scene) {
  const models = await SceneLoader.ImportMeshAsync("", "./models/", "lamp.glb");

  models.meshes[0].parent = scene.meshes[67];
  models.meshes[0].position = new Vector3(0, 1, 0);
  models.meshes[0].scaling = new Vector3(2, 2, 2);

  models.meshes.forEach((mesh) => {
    if (mesh.material) {
      mesh.material.environmentIntensity = 1;
    }
  });

  let spotLight = createSpotLight(scene);
  // spotLight.parent = scene.meshes[67];
  spotLight.parent = models.meshes[0];
}

export async function importWatch(scene) {
  const models = await SceneLoader.ImportMeshAsync(
    "",
    "./models/",
    "watch.glb"
  );

  models.meshes[0].parent = scene.meshes[67];
  models.meshes[0].position = new Vector3(0, 2.4, 0.5);
  models.meshes[0].scaling = new Vector3(0.8, 0.8, 0.8);
  models.meshes[0].rotation = new Vector3(0, Math.PI / 2, 0);

  models.meshes.forEach((mesh) => {
    if (mesh.material) {
      mesh.material.environmentIntensity = 1;
    }
  });
}

export async function importStreetLight(scene) {
  const models = await SceneLoader.ImportMeshAsync(
    "",
    "./models/",
    "street_light.glb"
  );

  const streetLights = [models.meshes[0]];
  const pointLights = [];

  const boundingInfo = models.meshes[0].getBoundingInfo();
  const height = boundingInfo.maximum.y - boundingInfo.minimum.y;

  const numberOfClones = 9;

  models.meshes.forEach((mesh) => {
    if (mesh.material) {
      mesh.material.environmentIntensity = 1;
    }
  });

  for (let i = 0; i < numberOfClones; i++) {
    const clonedStreetLight = models.meshes[0].clone("street_light clone" + i);
    streetLights.push(clonedStreetLight);
  }

  streetLights.forEach((streetLight, index) => {
    streetLight.scaling = new Vector3(0.2, 0.2, 0.2);
    let pointLight = createPointLight(scene, index);

    if (index < 5) {
      streetLight.position = new Vector3(0.8, height / 2, index * 2 - 4);
      pointLight.position = new Vector3(-1.5, 1, index * 2 - 4);
    } else {
      streetLight.position = new Vector3(3.6, height / 2, index * 2 - 14);
      pointLight.position = new Vector3(1.5, 1, index * 2 - 14);
    }

    pointLights.push(pointLight);
  });
}

export async function importEnemies(scene, engine, enemies) {
  const models = await SceneLoader.ImportMeshAsync(
    "",
    "./models/",
    "grey_alien.glb"
  );

  models.meshes[0].isPickable = false;
  models.meshes[1].name = "alien";
  models.meshes[2].name = "alien";

  // const alienMinSize = 0.4;
  // const alienMaxSize = 1;
  const alienSize = 0.75; //Math.random() * (alienMaxSize - alienMinSize) + alienMinSize;

  // let alienCol = createAlien(models.meshes[0]);
  // models.meshes[0].parent = alienCol;

  // models.meshes[0].position = new Vector3(0, -0.6, 0);

  models.meshes[0].position = new Vector3(3, 0, 3);
  models.meshes[0].scaling = new Vector3(alienSize, alienSize, alienSize);

  scene.registerBeforeRender(() => {
    const camera = scene.cameras[0];
    const speed = 0.0075; // Adjust the speed as needed

    // const direction = camera.position.subtract(alienCol.position);
    // const movementDirection = new Vector3(direction.x, 0, direction.z);

    // alienCol.position.addInPlace(
    //   movementDirection.normalize().scaleInPlace(speed)
    // );

    // alienCol.lookAt(new Vector3(camera.position.x, 0, camera.position.z));

    const direction = camera.position.subtract(models.meshes[0].position);
    const movementDirection = new Vector3(direction.x, 0, direction.z);

    models.meshes[0].position.addInPlace(
      movementDirection.normalize().scaleInPlace(speed)
    );
    models.meshes[0].lookAt(
      new Vector3(camera.position.x, 0, camera.position.z)
    );
  });

  models.meshes.forEach((mesh) => {
    if (mesh.material) {
      mesh.material.environmentIntensity = 1;
    }
  });
}
