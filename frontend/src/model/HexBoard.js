/* 
Mu Ye Liu - June 2025

Represents the HexBoard class for generating hexagonal grid coordinates
*/
export default class HexBoard {

    /* Constuctor
    REQUIRES: - radius: must be a positive integer (default is 1)
    */
    constructor(radius = 1) {
        this.radius = radius;
        this.hexCoords = this.generateHexCoords(radius);
    }

    generateHexCoords(radius) {
        const coords = [];
        for (let x = -radius; x <= radius; x++) {
            for (let y = -radius; y <= radius; y++) {
                // Check if the coordinate is within the hexagonal bounds
                if (Math.abs(x + y) <= radius) {
                    coords.push({ Coord: [x, y], specialAttribute: '' });
                }
            }
        }
        return coords;
    }

    getSpecialAttribute(x, y) {
        // Find the coordinate and return its special attribute
        const coord = this.hexCoords.find(c => c.Coord[0] === x && c.Coord[1] === y);
        return coord ? coord.specialAttribute : '';
    }

    setSpecialAttribute(x, y, attribute) {
        // Find the coordinate and set its special attribute
        const coord = this.hexCoords.find(c => c.Coord[0] === x && c.Coord[1] === y);
        if (coord) {
            coord.specialAttribute = attribute;
        }
    }

}

// Calculates the bounds of the hexagonal coordinates
export function calculateHexBounds(coords) {
    const bounds = coords.reduce((acc, [x, y]) => {
        const z = -x - y;
        acc.minX = Math.min(acc.minX, x);
        acc.maxX = Math.max(acc.maxX, x);
        acc.minY = Math.min(acc.minY, y);
        acc.maxY = Math.max(acc.maxY, y);
        acc.minZ = Math.min(acc.minZ, z);
        acc.maxZ = Math.max(acc.maxZ, z);
        acc.minOffsetX = Math.min(acc.minOffsetX, x + z / 2);
        acc.maxOffsetX = Math.max(acc.maxOffsetX, x + z / 2);
        return acc;
    }, {
        minX: Infinity,
        maxX: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
        minZ: Infinity,
        maxZ: -Infinity,
        minOffsetX: Infinity,
        maxOffsetX: -Infinity,
    });

    return bounds;
}