/*
Mu Ye Liu - June 2025

Represents the Tile class for creating tiles in a grid or hexagonal layout
*/

export default class Tile {

    /* Constructor to the tile
    REQUIRES: - id: Must be a string
              - coords: Must be a list of [a, b], where a and b are integers.
              - soln: must be an empty []
              - color: Must be a color, or not pass in this paramater
              - type: Must be an integer, default is 0 for grid tiles, 1 for hex tiles
    */
    constructor(id, coords, soln, color = 'blue', type = 0) {
        this.id = id;
        this.coords = coords; // List of coordinates, in the form [[a, b], [c, d], ...]
        this.soln = soln; // List of solution coordinates, in the form [[a, b], [c, d], ...]
        this.color = color;
        this.type = type;
    }
}
