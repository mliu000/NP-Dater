// Represents a grid and hex tile objects, similar to c++

export class Tile {

    /* Constructor to the tile
    REQUIRES: - id: Must be a string
              - coords: Must be a list of [a, b], where a and b are integers.
              - soln: must be an empty []
              - color: Must be a color, or not pass in this paramater
              - type: Must be an integer, default is 0 for grid tiles, 1 for hex tiles
    */
    constructor(id, coords, soln, color = 'blue', type = 0) {
        this.id = id;
        this.coords = coords;
        this.soln = soln;
        this.color = color;
        this.type = type;
    }
}
