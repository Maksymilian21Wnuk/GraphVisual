
// given nodes position them on map
// so they do not intersect

import { XYPosition } from "@xyflow/react";


export default function positioning(n : number) : XYPosition[] {
    let positions : XYPosition[] = [];
    const RADIUS = 50 + n * 10;
    const angle_step = 2 * Math.PI / n;

    for (let i = 0; i < n; i++) {
        const angle = i * angle_step;
        const x = RADIUS * Math.cos(angle); 
        const y = RADIUS * Math.sin(angle);
        positions.push({x:x, y:y})
    }

    return positions;
} 