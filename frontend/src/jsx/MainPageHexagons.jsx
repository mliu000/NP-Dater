/* 
Mu Ye Liu - June 2025

Represents the file that creates the Hextiles
*/

// Calculates the bounds for hex tiles
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