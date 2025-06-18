export function CarControls(scene, CarModel) {
    const speed = 0.15;
    const rotationSpeed = 0.005;
    const limitPosition = 8.0;
    const keys = {};


    window.addEventListener("keydown", (e) => {
        keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (e) => {
        keys[e.key.toLowerCase()] = false;
    });

    scene.onBeforeRenderObservable.add(() => {
        if (keys["d"]) {
            if (CarModel.position.z - speed >= -limitPosition) {
                CarModel.position.z -= speed;
                CarModel.rotation.y -= rotationSpeed;
            }
        }

        if (keys["a"]) {
            if (CarModel.position.z + speed <= limitPosition) {
                CarModel.position.z += speed;
                CarModel.rotation.y += rotationSpeed;
            }
        }

        if (keys["w"]) {
            if (CarModel.position.x + speed <= limitPosition) {
                CarModel.position.x += speed;
                
            }
        }

        if (keys["s"]) {
            if (CarModel.position.x - speed >= -limitPosition) {
                CarModel.position.x -= speed;
            }
        }
    });
}
