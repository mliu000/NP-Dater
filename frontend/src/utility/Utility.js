/*
Mu Ye Liu - June 2025

Represents js files that store the utility functions for the application.
*/

// Sorts the days of the week, months, and day of the month in a specific order.
export function sortDaysOfWeek(days) {
    const daysOfWeekOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayOfMonthOrder = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const dayOrder = [...daysOfWeekOrder, ...monthOrder, ...dayOfMonthOrder];

    days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
}

// Converts a hex color code to an RGB string.
export function hexToRGB(hex) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `RGB(${r}, ${g}, ${b})`;
}

// Checks whether or not gridcoords are connected via a BFS search.
export function areCoordsConnected(coords, mode = "hex") {
    if (coords.length === 0) return false;
    if (coords.length === 1) return true;

    const coordSet = new Set(coords.map(([x, y]) => `${x},${y}`));
    const visited = new Set();
    const queue = [];

    // Choose the correct direction set
    const directions = mode === "hex" ? [
        [1, 0],   // east
        [-1, 0],  // west
        [0, 1],   // southeast
        [0, -1],  // northwest
        [1, -1],  // northeast
        [-1, 1],  // southwest
    ] : [
        [1, 0],   // right
        [-1, 0],  // left
        [0, 1],   // down
        [0, -1],  // up
    ];

    // Start BFS
    const start = coords[0];
    queue.push(start);
    visited.add(`${start[0]},${start[1]}`);

    while (queue.length > 0) {
        const [x, y] = queue.shift();

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            const key = `${nx},${ny}`;

            if (coordSet.has(key) && !visited.has(key)) {
                visited.add(key);
                queue.push([nx, ny]);
            }
        }
    }

    return visited.size === coordSet.size;
}