import * as BABYLON from '@babylonjs/core';
import { criarPista } from './Objetos/pista.js';
import { iniciarMovimentoPistas } from './Controles/controlePista.js';
import { criarCarro } from './Objetos/carro.js';

await BABYLON.InitializeCSG2Async({
  manifoldUrl: "https://unpkg.com/manifold-3d@2.5.1"
});
const canvas = document.getElementById('renderCanvas');
canvas.width = 1280;
canvas.height = 720;

const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    
    const camera = new BABYLON.ArcRotateCamera('camera', 0, 1, 25, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    scene.activeCamera = camera;

    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 5, 0), scene);
    light.intensity = 1.0;

    const pistaFinal = criarPista(scene);
    const carroFinal = criarCarro(scene);
    //iniciarMovimentoPistas(scene, pistaFinal);
    //pistaFinal.dispose();

    return scene;
};

const scene = createScene();

window.addEventListener("resize", () => engine.resize());
engine.runRenderLoop(() => scene.render());
