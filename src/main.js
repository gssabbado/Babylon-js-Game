import * as BABYLON from '@babylonjs/core';
import { createTrack} from './Objetos/track.js';
import { startMovementTracks } from './Controles/trackControl.js';
import { createCar } from './Objetos/car.js';
import { CarControls} from './Controles/CarControl.js'
import { createTraps } from './Objetos/traps.js';
import { createAndMoveTraps } from './Controles/trapControl.js';
import { createCoordinateGizmo } from './Objetos/gizmo.js';


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
    
    const camera2 = new BABYLON.UniversalCamera('gameplayCamera', new BABYLON.Vector3(-20, 10, 0), scene);
    camera2.rotation.y = Math.PI/2;
    camera2.rotation.x = Math.PI/6;
    camera2.attachControl(canvas, true);
    scene.activeCamera = camera2;
    
    
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(5, 5, 0), scene);
    light.intensity = 1.0;
    
    const trackGameplay = createTrack(scene, camera, engine);
    const carGameplay = createCar(scene);
    const trapModel = createTraps(scene);

    startMovementTracks(scene, trackGameplay);
    trackGameplay.setEnabled(false);
    
    const traps = createAndMoveTraps(scene, trapModel);
    trapModel.setEnabled(false);
    CarControls(scene, carGameplay);
    //const coordinateGizmo = createCoordinateGizmo(scene, camera, engine);


    scene.registerBeforeRender(() => {
        traps.forEach(trap => {
            if (trap.intersectsMesh(carGameplay, false)) {
                console.log("💥 Collision with trap!");
            }
        });
    });
    return scene;
};


const scene = createScene();



window.addEventListener("resize", () => engine.resize());
engine.runRenderLoop(() => scene.render());
