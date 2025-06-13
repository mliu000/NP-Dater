/*
Mu Ye Liu - June 2025

Represents the main page board for displaying the grid and hexagonal tiles
*/

export default class GridBoard {

    constructor(rows = 5, cols = 5) {
        this.rows = rows;
        this.cols = cols;
        this.gridCoords = this.createGridBoard();
    }

    createGridBoard() {
        // Individual coordinates, not 2d array
        const gridCoords = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                gridCoords.push({ Coord: [i, j], specialAttribute: '' });
            }
        }
        return gridCoords;
    }

    getSpecialAttribute(x, y) {
        // Find the coordinate and return its special attribute
        const coord = this.gridCoords.find(c => c.Coord[0] === x && c.Coord[1] === y);
        return coord ? coord.specialAttribute : '';
    }

    setSpecialAttribute(x, y, attribute) {
        // Find the coordinate and set its special attribute
        const coord = this.gridCoords.find(c => c.Coord[0] === x && c.Coord[1] === y);
        if (coord) {
            coord.specialAttribute = attribute;
        }
    }

}