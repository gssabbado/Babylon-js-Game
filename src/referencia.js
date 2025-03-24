import * as BABYLON from '@babylonjs/core';

const canvas = document.getElementById('renderCanvas');
canvas.width = 900;
canvas.height = 600;

const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);


  const camera = new BABYLON.ArcRotateCamera('camera', 0, 1, 30, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);
  scene.activeCamera = camera;


  const light = new BABYLON.SpotLight('light', new BABYLON.Vector3(0, 5, 2), new BABYLON.Vector3(0, -1, -0.5), Math.PI / 4, 2, scene);
  //const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 0, 0), scene);
  
  light.intensity = 1.0;
  light.diffuse = new BABYLON.Color3(1, 1, 1);
  light.specular = new BABYLON.Color3(1, 1, 1);

  //const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);

  const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments: 50 }, scene);
  sphere.position = new BABYLON.Vector3(0, 2, 0);

  const utilLayer = new BABYLON.UtilityLayerRenderer(scene);

  const LightGizmo = new BABYLON.LightGizmo(utilLayer);
  LightGizmo.light = light;

  const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

  shadowGenerator.addShadowCaster(sphere);

  
  
  const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
  groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  groundMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
  
  /*const ground = BABYLON.MeshBuilder.CreateGround('ground', {
    height: 10,
    width: 10,
    subdivisions: 20
  }, scene);
*/
  const ground = new BABYLON.MeshBuilder.CreateBox('ground', {
    height: 0.5,
    width: 10,
    depth: 10,
    faceColors: [
      new BABYLON.Color4(1, 0, 0, 0.5),
      new BABYLON.Color4(0, 1, 0, 0.5),
      new BABYLON.Color4(0, 0, 1, 0.5),
      new BABYLON.Color4(1, 0, 1, 0.5),
      new BABYLON.Color4(1, 1, 0, 0.5),
      new BABYLON.Color4(0, 1, 1, 0.5)
    ]
  }
  , scene)

  ground.position = new BABYLON.Vector3(0, 0, 0);
  //ground.scaling.y = 0.5;
  ground.material = groundMaterial;
  //ground.material.wireframe = true;
  ground.receiveShadows = true;
  
  return scene;
};

const scene = createScene();

// Atualizar renderização ao redimensionar a janela
window.addEventListener("resize", function () {
  engine.resize();
});

engine.runRenderLoop(function () {
  scene.render();
});

