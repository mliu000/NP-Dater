#ifndef DATEBOARDGRID_HPP
#define DATEBOARDGRID_HPP

#include <vector>
#include <string>
#include "Cell.hpp"
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
    vector<vector<Cell>>& getCells();
    const vector<vector<Cell>>& getCells() const;

private:
    // Width and height of the dateboard
    const int width, height;

    // The cells of the board
    vector<vector<Cell>> cells;

    // Generates the cells of the grid
    void generateCells();
};

// To convert into json
void to_json(json& j, const DateBoardGrid& g);

#endif // DATEBOARDGRID_HPP