import * as BABYLON from '@babylonjs/core';
import { createTrack } from './Objetos/track.js';
import { startMovementTracks } from './Controles/trackControl.js';
import { createCar } from './Objetos/car.js';
import { CarControls } from './Controles/CarControl.js';
import { createTraps } from './Objetos/traps.js';
import { createAndMoveTraps } from './Controles/trapControl.js';
import { createCoordinateGizmo } from './Objetos/gizmo.js';
import { AdvancedDynamicTexture, TextBlock, Control } from "@babylonjs/gui";

async function initGame() {
    let scene, engine, canvas, isPaused = false;
    const dayNightDuration = 15;
    let score = 0;
    let gameInitialized = false;

    await BABYLON.InitializeCSG2Async({
        manifoldUrl: "https://unpkg.com/manifold-3d@2.5.1"
    });

    canvas = document.getElementById('renderCanvas');
    canvas.width = 1280;
    canvas.height = 720;

    engine = new BABYLON.Engine(canvas, true);

    // Store the main render function
    let mainRenderLoop;

    const createScene = () => {
        scene = new BABYLON.Scene(engine);

        const camera = new BABYLON.ArcRotateCamera('camera', 0, 1, 25, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);

        const camera2 = new BABYLON.UniversalCamera('gameplayCamera', new BABYLON.Vector3(-20, 10, 0), scene);
        camera2.rotation.y = Math.PI / 2;
        camera2.rotation.x = Math.PI / 6;
        camera2.attachControl(canvas, true);
        scene.activeCamera = camera2;

        const light2 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 3, 0), new BABYLON.Vector3(-3, -1, 0), Math.PI / 4, 2, scene);
        light2.intensity = 0.5;

        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(3, 10, 0), scene);
        light.intensity = 1.0;

        const trackGameplay = createTrack(scene, camera, engine);
        const carGameplay = createCar(scene);
        light2.parent = carGameplay;
        const trapModel = createTraps(scene);

        startMovementTracks(scene, trackGameplay);
        trackGameplay.setEnabled(false);

        const traps = createAndMoveTraps(scene, trapModel);
        trapModel.setEnabled(false);
        CarControls(scene, carGameplay);

        // Materials
        carGameplay.material = new BABYLON.StandardMaterial("carMaterial", scene);
        carGameplay.material.diffuseColor = new BABYLON.Color3(0.3, 0.5, 0.8);

        // Reset score
        score = 0;

        // collision detection
        scene.registerBeforeRender(() => {
            traps.forEach(trap => {
                if (carGameplay.intersectsMesh(trap, true)) {
                    console.log("Collision detected with trap!");
                    resetGame();
                }
            });
        });

        // Criar a UI em tela cheia
        const gui = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

        // Texto de Score
        const scoreText = new TextBlock();
        scoreText.text = "Score: 0";
        scoreText.color = "red";
        scoreText.fontSize = 32;
        scoreText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        scoreText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        scoreText.top = "-47%";
        scoreText.left = "42%";

        gui.addControl(scoreText);

        // Create the main render function that includes everything
        mainRenderLoop = () => {
            if (!isPaused) {
                scene.render();
                scoreTrack(scoreText);
                dayNightDurationCycle(light, light2);
            }
        };

        // Only add event listener once
        if (!gameInitialized) {
            window.addEventListener("keydown", (event) => {
                if (event.key.toLowerCase() === "p") {
                    isPaused = !isPaused;
                    console.log(isPaused);
                    if (isPaused) {
                        engine.stopRenderLoop();
                    } else {
                        engine.runRenderLoop(mainRenderLoop);
                    }
                }
            });
            gameInitialized = true;
        }

        return scene;
    };

    scene = createScene();

    window.addEventListener("resize", () => engine.resize());
    // Start the main render loop
    engine.runRenderLoop(mainRenderLoop);

    function scoreTrack(scoreText) {
        score += 1;
        scoreText.text = "Score: " + score;
    }

    function dayNightDurationCycle(light, light2) {
        const t = performance.now() * 0.001;
        const phase = (2 * Math.PI * t) / dayNightDuration;
        const cycle = (Math.sin(phase) + 1) / 2;

        const nightColor = new BABYLON.Color3(0.05, 0.05, 0.2);
        const dayColor = new BABYLON.Color3(0.6, 0.8, 1.0);

        const r = BABYLON.Scalar.Lerp(nightColor.r, dayColor.r, cycle);
        const g = BABYLON.Scalar.Lerp(nightColor.g, dayColor.g, cycle);
        const b = BABYLON.Scalar.Lerp(nightColor.b, dayColor.b, cycle);

        scene.clearColor = new BABYLON.Color4(r, g, b, 1.0);

        light.intensity = 1 * cycle;
        light2.intensity = 0.5 * (1 - cycle);
    }

    function resetGame() {
        console.log("Resetting game...");
        engine.stopRenderLoop();
        isPaused = false;

        setTimeout(() => {
            if (scene) {
                scene.stopAllAnimations();
                scene.dispose();
            }
            scene = createScene();
            engine.runRenderLoop(mainRenderLoop);
            console.log("Game reset complete");
        }, 1000);
    }
}

// Inicializa o jogo
initGame();
