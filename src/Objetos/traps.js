
import * as BABYLON from '@babylonjs/core';

export function createTraps(scene) {
    
    const triangle = BABYLON.MeshBuilder.CreateCylinder("triangle1", {
        height: 0.4,
        diameterTop: 4,
        diameterBottom: 4,
        tessellation: 3 
    }, scene);
    
    triangle.rotation.z = Math.PI / 2;  
    triangle.position.x = 3;
    triangle.position.z = 3;
    triangle.position.y = 6;
    
    const triangleMaterial = new BABYLON.StandardMaterial("triangleMat", scene);
    triangleMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    triangleMaterial.backFaceCulling = false;
    triangle.material = triangleMaterial;
    
    
    const triangle2 = BABYLON.MeshBuilder.CreateCylinder("triangle2", {
        height: 0.4,
        diameterTop: 2,
        diameterBottom: 2,
        tessellation: 3
    }, scene);
    
    triangle2.rotation.z = Math.PI / 2;  
    triangle2.position.x = 3; 
    triangle2.position.z = 3;
    triangle2.position.y = 6;
    
    const triangleMaterial2 = new BABYLON.StandardMaterial("triangleMat2", scene);
    triangleMaterial2.diffuseColor = new BABYLON.Color3(1, 0.3, 0.3);
    triangleMaterial2.backFaceCulling = false;
    triangle2.material = triangleMaterial2;
    
    
    const triangleFinal = BABYLON.CSG2.FromMesh(triangle)
        .subtract(BABYLON.CSG2.FromMesh(triangle2));
    
    triangle.dispose();
    triangle2.dispose();
    const triangleFinalCSG = triangleFinal.toMesh('triangleFinal', scene);
    triangleFinalCSG.position.y = 2;

    
    
    return triangleFinalCSG;
}