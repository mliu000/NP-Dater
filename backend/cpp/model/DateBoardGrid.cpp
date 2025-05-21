#include "DateBoardGrid.hpp"

#include <vector>

using namespace std;

// Constructor
DateBoardGrid::DateBoardGrid(int w, int h) : width(w), height(h) {
    generateCells();
}

// Generates the cells of the grid
void DateBoardGrid::generateCells() {
    for (int x = 0; x < width; x++) {
        vector<Cell> innerCells;
        for (int y = 0; y < height; y++) {
            innerCells.push_back(Cell(false, ""));
        }
        cells.push_back(innerCells);
    }
}