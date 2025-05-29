#pragma once
#include <vector>
#include "../model/Coord.hpp"
#include "../model/Tile.hpp"

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the tile class, which includes coordinates, the allows for rotations
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

    // Reflects the grid tile across the x-axis
    void reflectX();

    // Adds Coordinates to solution
    void addToSoln(const Coord& coord);

    ///// GETTERS ///// 
    
    const vector<Coord>& getCoords() const;
    const vector<Coord>& getSoln() const;

private:

    // Set of coordinates relative to a reference (0, 0)
    vector<Coord> coords;
    
    // Solution that stores the actual coordinates that the tile should be placed
    vector<Coord> soln;
};