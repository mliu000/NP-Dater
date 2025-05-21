#ifndef DATEBOARDGRID_HPP
#define DATEBOARDGRID_HPP

#include <vector>
#include <string>
#include "Cell.hpp"

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the square date board
*/
class DateBoardGrid {
public:
    // Construct a dateBoard with given length and width
    DateBoardGrid(int w, int h);

private:
    // Width and height of the dateboard
    int width, height;

    // The cells of the board
    vector<vector<Cell>> cells;

    // Generates the cells of the grid
    void generateCells();
};

#endif // DATEBOARDGRID_HPP