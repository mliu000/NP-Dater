/*
Mu Ye Liu - June 2025

Represents the main page board for displaying the grid and hexagonal tiles
*/

export default class GridBoard {

    constructor(width = 5, height = 5) {
        this.width = width;
        this.height = height;
        this.gridCoords = this.createGridBoard();
    }

    createGridBoard() {
        // Individual coordinates, not 2d array
        const gridCoords = [];
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                gridCoords.push({ Coord: [i, j], specialAttribute: '' });
            }
        }
        return gridCoords;
    }

    getSpecialAttribute(x, y) {
        // Find the coordinate and return its special attribute
        const coord = this.gridCoords.find(c => c.Coord[0] === x && c.Coord[1] === y);
        return coord.specialAttribute;
    }

    setSpecialAttribute(x, y, attribute) {
        // Find the coordinate and set its special attribute
        const coord = this.gridCoords.find(c => c.Coord[0] === x && c.Coord[1] === y);
        if (coord) {
            coord.specialAttribute = attribute;
        }
    }
}

export function calculateGridBounds(coords) {
    const bounds = coords.reduce((acc, [x, y]) => {
        acc.minX = Math.min(acc.minX, x);
        acc.minY = Math.min(acc.minY, y);
        acc.maxX = Math.max(acc.maxX, x);
        acc.maxY = Math.max(acc.maxY, y);
        return acc;
    }, { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
    return bounds;
}
