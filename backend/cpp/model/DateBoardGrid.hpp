#pragma once
#include <vector>
#include <string>
#include <functional>
#include <unordered_map>
#include "GridCoord.hpp"
#include  "../utility/json.hpp"
using json = nlohmann::json;

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the date board with square tiles
*/
class DateBoardGrid {
public:

    // Construct a dateBoard with given length and width
    DateBoardGrid(int w, int h);

    /* Sets the coordinate at given x and y to be blocked. Do nothing if coordinate with given x 
    and y do not exist */
    void blockCoordinate(int x, int y);

    ///// GETTERS /////

    int getWidth() const;
    int getHeight() const;
    const unordered_map<GridCoord, int>& getCoords() const;

private:
    // Width and height of the dateboard
    const int width, height;

    // Represents the grid of the date puzzle, where the int = 1 for blocked, = 0 for available
    unordered_map<GridCoord, int> coords;

    // Generates the cells of the grid
    void generateCoords();

};

// To convert into json
void to_json(json& j, const DateBoardGrid& g);
