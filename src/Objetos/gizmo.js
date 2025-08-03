// Add this to your scene creation function, after the light creation
import * as BABYLON from '@babylonjs/core';
// Create coordinate gizmo
export function createCoordinateGizmo (scene) {
    const gizmo = new BABYLON.TransformNode("coordinateGizmo", scene);
    
    // X-axis (red) - points right
    const xAxis = BABYLON.MeshBuilder.CreateCylinder("xAxis", {height: 4, diameter: 0.1}, scene);
    const xMaterial = new BABYLON.StandardMaterial("xMat", scene);
    xMaterial.emissiveColor = BABYLON.Color3.Red();
    xAxis.material = xMaterial;
    xAxis.rotation.z = -Math.PI/2; // Rotate to point along X axis
    xAxis.position.x = 2; // Move to center it
    xAxis.parent = gizmo;
    
    // X-axis arrow tip
    const xTip = BABYLON.MeshBuilder.CreateCylinder("xTip", {diameter: 0.3, height: 0.5}, scene);
    xTip.material = xMaterial;
    xTip.rotation.z = -Math.PI/2;
    xTip.position.x = 4.25;
    xTip.parent = gizmo;
    
    // Y-axis (green) - points up
    const yAxis = BABYLON.MeshBuilder.CreateCylinder("yAxis", {height: 4, diameter: 0.1}, scene);
    const yMaterial = new BABYLON.StandardMaterial("yMat", scene);
    yMaterial.emissiveColor = BABYLON.Color3.Green();
    yAxis.material = yMaterial;
    yAxis.position.y = 2;
    yAxis.parent = gizmo;
    
    // Y-axis arrow tip
    const yTip = BABYLON.MeshBuilder.CreateCylinder("yTip", {diameter: 0.3, height: 0.5}, scene);
    yTip.material = yMaterial;
    yTip.position.y = 4.25;
    yTip.parent = gizmo;
    
    // Z-axis (blue) - points forward
    const zAxis = BABYLON.MeshBuilder.CreateCylinder("zAxis", {height: 4, diameter: 0.1}, scene);
    const zMaterial = new BABYLON.StandardMaterial("zMat", scene);
    zMaterial.emissiveColor = BABYLON.Color3.Blue();
    zAxis.material = zMaterial;
    zAxis.rotation.x = Math.PI/2;
    zAxis.position.z = 2;
    zAxis.parent = gizmo;
    
    // Z-axis arrow tip
    const zTip = BABYLON.MeshBuilder.CreateCylinder("zTip", {diameter: 0.3, height: 0.5}, scene);
    zTip.material = zMaterial;
    zTip.rotation.x = Math.PI/2;
    zTip.position.z = 4.25;
    zTip.parent = gizmo;
    
    // Create text labels using GUI
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("CoordinateLabels", scene);
    
    // X label
    const xLabel = new BABYLON.GUI.TextBlock();
    xLabel.text = "X";
    xLabel.color = "red";
    xLabel.fontSize = 24;
    xLabel.fontWeight = "bold";
    advancedTexture.addControl(xLabel);
    
    // Y label
    const yLabel = new BABYLON.GUI.TextBlock();
    yLabel.text = "Y";
    yLabel.color = "green";
    yLabel.fontSize = 24;
    yLabel.fontWeight = "bold";
    advancedTexture.addControl(yLabel);
    
    // Z label
    const zLabel = new BABYLON.GUI.TextBlock();
    zLabel.text = "Z";
    zLabel.color = "blue";
    zLabel.fontSize = 24;
    zLabel.fontWeight = "bold";
    advancedTexture.addControl(zLabel);
    
    // Update label positions each frame
    scene.registerBeforeRender(() => {
        // Project 3D positions to screen coordinates
        const xTipWorldPos = xTip.getAbsolutePosition();
        const yTipWorldPos = yTip.getAbsolutePosition();
        const zTipWorldPos = zTip.getAbsolutePosition();
        
        const xScreenPos = BABYLON.Vector3.Project(
            xTipWorldPos,
            BABYLON.Matrix.Identity(),
            scene.getTransformMatrix(),
            camera.viewport.toGlobal(engine.getRenderWidth(), engine.getRenderHeight())
        );
        
        const yScreenPos = BABYLON.Vector3.Project(
            yTipWorldPos,
            BABYLON.Matrix.Identity(),
            scene.getTransformMatrix(),
            camera.viewport.toGlobal(engine.getRenderWidth(), engine.getRenderHeight())
        );
        
        const zScreenPos = BABYLON.Vector3.Project(
            zTipWorldPos,
            BABYLON.Matrix.Identity(),
            scene.getTransformMatrix(),
            camera.viewport.toGlobal(engine.getRenderWidth(), engine.getRenderHeight())
        );
        
        // Update label positions
        xLabel.leftInPixels = xScreenPos.x - advancedTexture.getSize().width / 2;
        xLabel.topInPixels = xScreenPos.y - advancedTexture.getSize().height / 2;
        
        yLabel.leftInPixels = yScreenPos.x - advancedTexture.getSize().width / 2;
        yLabel.topInPixels = yScreenPos.y - advancedTexture.getSize().height / 2;
        
        zLabel.leftInPixels = zScreenPos.x - advancedTexture.getSize().width / 2;
        zLabel.topInPixels = zScreenPos.y - advancedTexture.getSize().height / 2;
    });
    
    // Position the gizmo at origin
    gizmo.position = new BABYLON.Vector3(0, 0, 0);
    
    return gizmo;
};

