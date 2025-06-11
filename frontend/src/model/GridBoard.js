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

}