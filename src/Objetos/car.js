import * as BABYLON from '@babylonjs/core';
import earcut from 'earcut';

export function createCar(scene) {
    //base
    const outline = []

    for (let i = 0; i < 41; i++) {
        outline.push(new BABYLON.Vector3(1.2 * Math.cos(i * Math.PI / 40) + 0.2, 0, 1.5 * Math.sin(i * Math.PI / 40)));
    }

    outline.push(new BABYLON.Vector3(-2.5, 0, 0));
    outline.push(new BABYLON.Vector3(-2.5, 0, -1));
    outline.push(new BABYLON.Vector3(2.5, 0, -1));
    outline.push(new BABYLON.Vector3(2.5, 0, 0));
    const carShape = BABYLON.MeshBuilder.ExtrudePolygon("carShape", { shape: outline, depth: 1.5 }, scene, earcut);

    carShape.position.y = 4;
    carShape.rotation.x = -Math.PI / 2;



    // ------ Rodas do carShape ------

    const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", { diameter: 1.125, height: 0.55 })
    wheelRB.position.z = -0.25;
    wheelRB.position.x = -1.5;
    wheelRB.position.y = 2.735;
    wheelRB.rotation.x = -Math.PI / 2;

    const wheelRF = wheelRB.clone("wheelRF");
    wheelRF.position.x = 1.5;
    
    const wheelLB = wheelRB.clone("wheelLB");
    wheelLB.position.z = 1.75;
    
    const wheelLF = wheelRF.clone("wheelLF");
    wheelLF.position.z = 1.75;
    wheelLF.position.x = 1.5;
    

    // --------  Farol do carShape
    
    const headlightL = BABYLON.MeshBuilder.CreateCylinder("headlightL", { diameterBottom: 1.125, diameterTop: 2, height: 0.55 })
    headlightL.scaling.z *= 0.3;
    headlightL.scaling.y *= 0.3;
    headlightL.scaling.x *= 0.3;
    headlightL.rotation.z = 1.5;
    headlightL.position.y = 3.7;
    headlightL.position.x = -2.45;
    headlightL.position.z = 0.35;

    const headlightR = headlightL.clone("headlightR");
    headlightR.position.y = 3.7;
    headlightR.position.x = -2.45;
    headlightR.position.z = 1.15;
       
    
    
    // fazer o csg com dois cilindros e algo no meio

    const carFinal = BABYLON.CSG2.FromMesh(carShape)
        .add(BABYLON.CSG2.FromMesh(wheelLB))
        .add(BABYLON.CSG2.FromMesh(wheelLF))
        .add(BABYLON.CSG2.FromMesh(wheelRB))
        .add(BABYLON.CSG2.FromMesh(wheelRF))
        .add(BABYLON.CSG2.FromMesh(headlightL))
        .add(BABYLON.CSG2.FromMesh(headlightR))
    
    carShape.dispose();
    wheelLB.dispose();
    wheelRB.dispose();
    wheelLF.dispose();
    wheelRF.dispose();
    headlightL.dispose();
    headlightR.dispose();
    
    const carFinalCSG = carFinal.toMesh('carFinal', scene);
    carFinalCSG.rotation.y = Math.PI;
    carFinalCSG.position.y = 1.9;
    carFinalCSG.position.x = -1.9;


    return carFinalCSG;
}