// Represents a grid and hex tile objects, similar to c++

export class GridTile {

    /* Constructor to the tile
    REQUIRES: - id: Must be a string
              - coords: Must be a list of [a, b], where a and b are integers.
              - soln: must be an empty []
              - color: Must be a color, or not pass in this paramater
    */
    constructor(id, coords, soln, color = 'blue') {
        this.id = id;
        this.coords = coords;
        this.soln = soln;
        this.color = color;
    }
}

export class HexTile {

    /* Constructor to the tile
    REQUIRES: - id: Must be a string
              - coords: Must be a list of {a, b}, where a and b are integers.
              - soln: must be an empty []
              - color: Must be a color, or not pass in this paramater
    */
    constructor(id, coords, soln, color = 'blue') {
        this.id = id;
        this.coords = coords;
        this.soln = soln;
        this.color = color;
    }
}
