export function createAndMoveTraps(scene, trapModel) {
    const config = {
        numTraps: 3,
        trapSpeed: 0.1,
        spacing: 30,
        limitPosition: -45,
        resetPosition: 65,
        pattern: 'random' // 'random', 'alternating', 'wave', 'clustered', 'safe_corridor'
    };

    const lanes = [0, -7, 7];
    const traps = [];
    let patternIndex = 0;

    // Generate initial traps with your original logic but enhanced
    for (let i = 0; i < config.numTraps; i++) {
        const trap = trapModel.clone(`trap${i}`, null, true);
        
        // Apply different generation patterns
        let laneIndex;
        switch (config.pattern) {
            case 'alternating':
                laneIndex = i % lanes.length;
                break;
            case 'wave':
                laneIndex = Math.floor(Math.sin(i * 0.5) * lanes.length / 2) + 1;
                break;
            case 'clustered':
                // Group traps in clusters
                laneIndex = Math.floor(i / 2) % lanes.length;
                break;
            default: // 'random'
                laneIndex = Math.floor(Math.random() * lanes.length);
        }
        
        const selectedLane = lanes[laneIndex];
        
        // Add some procedural variation to spacing
        const randomSpacing = config.spacing + (Math.random() - 0.5) * 10;
        
        trap.position.set(
            i * randomSpacing - config.resetPosition / 2, 
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
                
                // Procedurally select new lane
                let newLaneIndex;
                switch (config.pattern) {
                    case 'alternating':
                        newLaneIndex = patternIndex % lanes.length;
                        patternIndex++;
                        break;
                    case 'safe_corridor':
                        // Ensure at least one lane stays safe
                        const occupiedLanes = traps
                            .filter(t => t !== trap && Math.abs(t.position.x - trap.position.x) < 20)
                            .map(t => lanes.findIndex(lane => Math.abs(t.position.z - lane) < 1));
                        
                        const availableLanes = lanes.map((_, i) => i).filter(i => !occupiedLanes.includes(i));
                        newLaneIndex = availableLanes.length > 0 ? 
                            availableLanes[Math.floor(Math.random() * availableLanes.length)] :
                            Math.floor(Math.random() * lanes.length);
                        break;
                    default:
                        newLaneIndex = Math.floor(Math.random() * lanes.length);
                }
                
                trap.position.z = lanes[newLaneIndex];
            }
        });
    });

    return traps;
}