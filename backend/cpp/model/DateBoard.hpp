#pragma once
#include <vector>
#include <string>
#include <functional>
#include <unordered_map>
#include "Coord.hpp"

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the dateBoard abstract class
*/
class DateBoard {
public: 

    // Construct a dateBoard with given length and width
    DateBoard(int w, int h);

    // Virtual destructor
    virtual ~DateBoard();

    /* Sets the coordinate at given x and y to be blocked. Do nothing if coordinate with given x 
    and y do not exist */
    void blockCoordinate(int x, int y);

    ///// GETTERS /////

    const unordered_map<Coord, bool>& getCoords() const;
    int getWidth() const;
    int getHeight() const;
    
protected:

    // Width and height of the dateboard
    const int width, height;

    // Generates the cells of the grid (should be implemented by derived classes)
    virtual void generateCoords() = 0;

    // Represents the grid of the date puzzle, and bool flag to indicate whether or not blocked
    unordered_map<Coord, bool> coords;

};