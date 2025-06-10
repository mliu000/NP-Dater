/* 
Mu Ye Liu - June 2025

Represents the HexGrid class for generating hexagonal grid coordinates
*/
export class HexGrid {

    /* Constuctor
    REQUIRES: - radius: must be a positive integer (default is 1)
    */
    constructor(radius = 1) {
        this.radius = radius;
        this.hexCoords = this.generateHexCoords(radius);
    }

    generateHexCoords(radius) {
        const coords = [];
        for (let q = -radius; q <= radius; q++) {
            const r1 = Math.max(-radius, -q - radius);
            const r2 = Math.min(radius, -q + radius);
            for (let r = r1; r <= r2; r++) {
                coords.push([q, r]);
            }
        }
        return coords;
    }

}