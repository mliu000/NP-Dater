#ifndef DATEBOARDGRID_HPP
#define DATEBOARDGRID_HPP

#include <vector>
#include <string>
#include <functional>
#include <unordered_set>
#include "GridCoord.hpp"
#include  "../utility/json.hpp"
using json = nlohmann::json;

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the square date board
*/
class DateBoardGrid {
public:
    // Construct a dateBoard with given length and width
    DateBoardGrid(int w, int h);

    ///// GETTERS /////

    int getWidth() const;
    int getHeight() const;
    unordered_set<GridCoord>& getCoords();
    const unordered_set<GridCoord>& getCoords() const;

private:
    // Width and height of the dateboard
    const int width, height;

    // The coordinates of the board
    unordered_set<GridCoord> coords;

    // Generates the cells of the grid
    void generateCoords();

};

// To convert into json
void to_json(json& j, const DateBoardGrid& g);

#endif // DATEBOARDGRID_HPP