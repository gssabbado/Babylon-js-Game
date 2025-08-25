export function createAndMoveTraps(scene, trapModel) {
    const config = {
        numTraps: 3,
        trapSpeed: 0.21,
        spacing: 30,
        limitPosition: -45,
        resetPosition: 65,
    };

    const lanes = [0, -7, 7];
    const traps = [];
    
    // Track the last used lane for each trap
    const lastUsedLanes = [];

    for (let i = 0; i < config.numTraps; i++) {
        let trap = trapModel.clone(`trap${i}`, null, true);
        
        let laneIndex = Math.floor(Math.random() * lanes.length);
        const selectedLane = lanes[laneIndex];
        
        // Store the initial lane for this trap
        lastUsedLanes[i] = laneIndex;

        const randomSpacing = config.spacing + (Math.random() - 0.5) * 10;
        
        trap.position.set(
            config.resetPosition + i * randomSpacing, 
            2.5, 
            selectedLane
        );
        
        traps.push(trap);
    }

    scene.registerBeforeRender(() => {
        traps.forEach((trap, index) => {
            trap.position.x -= config.trapSpeed;

            if (trap.position.x < config.limitPosition) {
                // When resetting, apply procedural logic for new position
                trap.position.x = config.resetPosition;
                
                // Get available lanes (excluding the last used lane for this trap)
                const availableLanes = [];
                for (let i = 0; i < lanes.length; i++) {
                    if (i !== lastUsedLanes[index]) {
                        availableLanes.push(i);
                    }
                }
                
                // Select from available lanes
                const newLaneIndex = availableLanes[Math.floor(Math.random() * availableLanes.length)];
                
                // Update trap position and track the new lane
                trap.position.z = lanes[newLaneIndex];
                lastUsedLanes[index] = newLaneIndex;
            }
        });
    });

    return traps;
}