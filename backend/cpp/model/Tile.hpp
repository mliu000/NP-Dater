#pragma once
#include <iostream>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the tile class, which includes coordinates, the allows for rotations
The (0, 0) coordinate will always be the reference point. Will be an abstract super class
*/
class Tile {
public:

    // Constructs a tile with an id
    Tile(string id);

    // Virtual destructor
    virtual ~Tile();

    // Gets the string
    string getId() const;

    // Rotates the string clockwise by one dimension
    virtual void rotateClockwise() = 0;

protected:

    // Unique Id for this tile and set of coordinates
    string id;
};