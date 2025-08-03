import * as BABYLON from '@babylonjs/core';

export function createTrack(scene) {
    const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    const ground = BABYLON.MeshBuilder.CreateBox('ground', {
        height: 0.5,
        width: 25,
        depth: 20
    }, scene);
    ground.position.y = 0;
    ground.material = groundMaterial;

    // Material das faixas
    const trackMaterial = new BABYLON.StandardMaterial('trackMaterial', scene);
    trackMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

    // Criando faixas centrais
    const rightLane = BABYLON.MeshBuilder.CreateBox('rightLane', {
        height: 0.5,
        width: 4,
        depth: 0.5
    }, scene);
    rightLane.position.set(0, 0.01, 3.5);
    rightLane.material = trackMaterial;

    const leftLane = rightLane.clone('leftLane');
    leftLane.position.z = -3.5;

    // Criando faixas laterais
    const rightSideStrip = BABYLON.MeshBuilder.CreateCylinder('rightSideStrip', {
        height: 25,
        diameter: 0.7
    }, scene);
    rightSideStrip.rotation.z = Math.PI / 2;
    rightSideStrip.position.z = 10.1;
    rightSideStrip.material = trackMaterial;

    const leftSideStrip = rightSideStrip.clone('leftSideStrip');
    leftSideStrip.position.z = -10.1;

    // Criando a track final com CSG
    const groundCSG = BABYLON.CSG2.FromMesh(ground);
    const trackFinalCSG = groundCSG
        .add(BABYLON.CSG2.FromMesh(rightLane))
        .add(BABYLON.CSG2.FromMesh(leftLane))
        .add(BABYLON.CSG2.FromMesh(rightSideStrip))
        .add(BABYLON.CSG2.FromMesh(leftSideStrip));

    const trackFinal = trackFinalCSG.toMesh("trackFinal", scene);
    trackFinal.position.y = -1;

    // Remover os objetos temporários
    ground.dispose();
    rightLane.dispose();
    leftLane.dispose();
    rightSideStrip.dispose();
    leftSideStrip.dispose();
    

    return trackFinal;
}
