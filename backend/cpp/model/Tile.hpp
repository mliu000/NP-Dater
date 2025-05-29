#pragma once
#include <iostream>
#include <vector>
#include "../model/Coord.hpp"

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the tile class, which includes coordinates, the allows for rotations
The (0, 0) coordinate will always be the reference point. Will be an abstract super class
*/
class Tile {
public:

    // Constructs a tile with an id
    Tile(string id, vector<Coord> coordinates);

    // Virtual destructor
    virtual ~Tile();

    // Rotates the string clockwise by one dimension
    virtual void rotateClockwise() = 0;

    // Reflects the tile across the x-axis
    virtual void reflectX() = 0;
    

    // Adds Coordinates to solution
    void addToSoln(const Coord& coord);

    ///// GETTERS ///// 
    
    string getId() const;
    const vector<Coord>& getCoords() const;
    const vector<Coord>& getSoln() const;

protected:
    // Unique Id for this tile and set of coordinates
    string id;
    
    // Set of coordinates relative to a reference (0, 0)
    vector<Coord> coords;
    
    // Solution that stores the actual coordinates that the tile should be placed
    vector<Coord> soln;

};