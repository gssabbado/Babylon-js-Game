import * as BABYLON from '@babylonjs/core';

export function createTraps(scene) {
    const outline = [];
    const triangle = BABYLON.MeshBuilder.CreateDisc("disc", {radius: 2, tessellation: 3});
    triangle.rotation.x = Math.PI / 2;  
    


    return triangle;
}