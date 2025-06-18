import * as BABYLON from '@babylonjs/core';
import earcut from 'earcut';

export function criarCarro(scene) {
    /*const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.7);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    const corpo = BABYLON.MeshBuilder.CreateBox('corpo', {
        height: 1.5,
        width: 5,
        depth: 2
    }, scene);
    corpo.position.y = 1;
    corpo.material = groundMaterial;
*/
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



    // ------ Rodas do carShapero ------

    const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", { diameter: 1.125, height: 0.55 })
    //wheelRB.parent = carShape;
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
    

    // --------  Farol do carShapero
    
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


    /*   const CarShaperoShape = [
        // Criando a pista final com CSG
        const groundCSG = BABYLON.CSG2.FromMesh(ground);
        const pistaFinalCSG = groundCSG
            .add(BABYLON.CSG2.FromMesh(faixaPistaDireita))
            .add(BABYLON.CSG2.FromMesh(faixaPistaEsquerda))
            .add(BABYLON.CSG2.FromMesh(faixaLateralDireita))
            .add(BABYLON.CSG2.FromMesh(faixaLateralEsquerda));
      
        const pistaFinal = pistaFinalCSG.toMesh("pistaFinal", scene);
        pistaFinal.position.y = -1;
           new BABYLON.Vector3(-2, -1, 0),  // Inferior esquerdo
           new BABYLON.Vector3(2, -1, 0),   // Inferior direito
           new BABYLON.Vector3(1, 1, 0),    // Superior direito
           new BABYLON.Vector3(-1, 1, 0)    // Superior esquerdo
       ];
   
       const cabine = BABYLON.MeshBuilder.ExtrudeShape('cabine', {
           shape: CarShaperoShape,
           path: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 2)], // Extrusão no eixo Y
           closeShape: true
       }, scene, earcut);
       cabine.position.y = 4;
   */

    /*
        // Material das faixas
        const faixaMaterial = new BABYLON.StandardMaterial('faixaMaterial', scene);
        faixaMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    
        // Criando faixas centrais
        const faixaPistaDireita = BABYLON.MeshBuilder.CreateBox('faixaPistaDireita', {
            height: 0.5,
            width: 4,
            depth: 0.5
        }, scene);
        faixaPistaDireita.position.set(0, 0.01, 3.5);
        faixaPistaDireita.material = faixaMaterial;
    
        const faixaPistaEsquerda = faixaPistaDireita.clone('faixaPistaEsquerda');
        faixaPistaEsquerda.position.z = -3.5;
    
        // Criando faixas laterais
        const faixaLateralDireita = BABYLON.MeshBuilder.CreateCylinder('faixaLateralDireita', {
            height: 25,
            diameter: 0.7
        }, scene);
        faixaLateralDireita.rotation.z = Math.PI / 2;
        faixaLateralDireita.position.z = 10.1;
        faixaLateralDireita.material = faixaMaterial;
    
        const faixaLateralEsquerda = faixaLateralDireita.clone('faixaLateralEsquerda');
        faixaLateralEsquerda.position.z = -10.1;
    
    
        // Remover os objetos temporários
        ground.dispose();
        faixaPistaDireita.dispose();
        faixaPistaEsquerda.dispose();
        faixaLateralDireita.dispose();
        faixaLateralEsquerda.dispose();
      */

    return carFinalCSG;
}