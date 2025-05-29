#pragma once
#include <vector>
#include <unordered_set>
#include "../model/Coord.hpp"
#include "../model/Tile.hpp"

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the Grid tile class, which includes coordinates, the allows for rotations
The (0, 0) coordinate will always be the reference point. Extends the Tile superclass 
*/
class GridTile : public Tile {
public: 
    
    /* Constructor: Instantiates a gridtile with a set of coordinates that indicate its 
    coordinates relative to a pivot point 
    REQUIRES: At least one of the coordinates need to be (0, 0), with the remaining being 
              relative to it 
    */
    GridTile(string id, vector<Coord> coordinates);

    // Rotates the grid tile clockwise by 90deg
    void rotateClockwise() override;

    // Flips the tile
    void flip() override;

    /* Checks for symmetry: Runtime: O(n)
    Returns 0 if not symmetric, 1 if symmetric, and 2 if 180deg symmetric
    */
    int checkSymmetry() override;

    /* Checks whether or not the tile needs to be reflected. Runtime: O(n)
    Returns 1 if no reflection is needed, and 2 if needed;s
    */
    int needsReflection() override;

private:

    ///// HELPER FUNCTIONS /////

    /* Normalizes a vector of coordinates, by setting all coordinates to be <= 0
    Runtime: O(n)
    */
    void normalizeCoords(vector<Coord>& coordsParam);

    /* Checks whether or not a tile is a square
    Runtime: O(n)
    */
    bool isSquare();

    /* Checks whether or not a tile is 180deg symmetric
    Runtime: O(n)*/
    bool is180degSymmetric();

    /* Rotates coordinates clockwise
    Runtime: O(n)
    */
    void rotateCoords(vector<Coord>& coordsParam);

    /* Reflects the coordinates about the X-Axis
    Runtime: O(n)
    */
    void flipCheck(vector<Coord>& coordsParam);

};