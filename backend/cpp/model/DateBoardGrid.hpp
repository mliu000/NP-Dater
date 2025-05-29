#pragma once
#include <vector>
#include <string>
#include <functional>
#include <unordered_map>
#include "Coord.hpp"
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
    const unordered_map<Coord, bool>& getCoords() const;

private:
    // Width and height of the dateboard
    const int width, height;

    // Represents the grid of the date puzzle, and bool flag to indicate whether or not blocked
    unordered_map<Coord, bool> coords;

    // Generates the cells of the grid
    void generateCoords();

};

// To convert into json
void to_json(json& j, const DateBoardGrid& g);
