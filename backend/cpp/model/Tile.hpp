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

    // Flips the tile
    virtual void flip() = 0;

    // Checks for symmetry: Runtime: O(n)
    virtual int checkSymmetry() = 0;

    // Checks whether or not the tile needs to be reflected. Runtime: O(n)
    virtual int needsReflection() = 0;
    
    // Adds Coordinates to solution
    void addToSoln(const Coord& coord);

    ///// GETTERS ///// 
    
    string getId() const;
    const vector<Coord>& getCoords() const;
    const vector<Coord>& getSoln() const;

protected:

    /* Normalizes a vector of coordinates, by setting all coordinates to be <= 0
    Runtime: O(n)
    */
    virtual void normalizeCoords(vector<Coord>& coordsParam) = 0;

    // Unique Id for this tile and set of coordinates
    string id;

    // Set of coordinates relative to a reference (0, 0)
    vector<Coord> coords;
    
    // Solution that stores the actual coordinates that the tile should be placed
    vector<Coord> soln;

};