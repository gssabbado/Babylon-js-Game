import * as BABYLON from '@babylonjs/core';

export function criarCarro(scene) {
    const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.7);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    const corpo = BABYLON.MeshBuilder.CreateBox('corpo', {
        height: 1.5,
        width: 5,
        depth: 2
    }, scene);
    corpo.position.y = 1;
    corpo.material = groundMaterial;

    
    
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

    // Criando a pista final com CSG
    const groundCSG = BABYLON.CSG2.FromMesh(ground);
    const pistaFinalCSG = groundCSG
        .add(BABYLON.CSG2.FromMesh(faixaPistaDireita))
        .add(BABYLON.CSG2.FromMesh(faixaPistaEsquerda))
        .add(BABYLON.CSG2.FromMesh(faixaLateralDireita))
        .add(BABYLON.CSG2.FromMesh(faixaLateralEsquerda));

    const pistaFinal = pistaFinalCSG.toMesh("pistaFinal", scene);
    pistaFinal.position.y = -1;

    // Remover os objetos temporários
    ground.dispose();
    faixaPistaDireita.dispose();
    faixaPistaEsquerda.dispose();
    faixaLateralDireita.dispose();
    faixaLateralEsquerda.dispose();
  */  

    return corpo;
}