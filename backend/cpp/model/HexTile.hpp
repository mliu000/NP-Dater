#pragma once
#include <vector>
#include <unordered_set>
#include "../model/Coord.hpp"
#include "../model/Tile.hpp"

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the Hex tile class, which includes coordinates, the allows for rotations
The (0, 0) coordinate will always be the reference point. Extends the Tile superclass 
*/
class HexTile : public Tile {
public: 
    
    /* Constructor: Instantiates a gridtile with a set of coordinates that indicate its 
    coordinates relative to a pivot point 
    REQUIRES: At least one of the coordinates need to be (0, 0), with the remaining being 
              relative to it 
    */
    HexTile(string id, vector<Coord> coordinates);

    // Rotates the grid tile clockwise by 90deg
    void rotateClockwise() override;

    // Flips the tile by reflecting it across the y-axis (negating x-coordinates)
    void flip() override;

    /* Checks for symmetry: Runtime: O(n)
    Returns 1 if hexagon, 3 if 180deg symmetric, and 6 if asymmetric
    */
    int checkSymmetry() override;

    // Checks whether or not the tile needs to be reflected. Runtime: O(n)
    int needsReflection() override;

private:

    // Normalizes the coordinates by subtracting each coordinate by the maximum x, y and z values
    void normalizeCoords(vector<Coord>& coordsParam) override;

    // Checks whether or not the tile is a hexagon. Returns true if is a hexagon, false otherwise
    bool isHexagon();

    // Checks if the tile is 180deg symmetric
    bool is180degSymmetric();

    // Flips the coordinates of the tile
    bool flipCoords(vector<Coord>& coordsParam) const;

    // Rotates the copy of coordinates clockwise once
    bool rotateCoordsClockwise(vector<Coord>& coordsParam) const;
};