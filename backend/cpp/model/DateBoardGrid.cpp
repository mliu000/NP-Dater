#include "DateBoardGrid.hpp"

using namespace std;

// Constructor
DateBoardGrid::DateBoardGrid(int w, int h) : width(w), height(h) {
    generateCells();
}

void DateBoardGrid::generateCells() {
    for (int x = 0; x < width; x++) {
        vector<Cell> innerCellList;
        for (int y = 0; y < height; y++) {
            innerCellList.push_back(Cell(false, ""));
        }
        cells.push_back(innerCellList);
    }
}

///// GETTERS /////

int DateBoardGrid::getHeight() const { return height; }
int DateBoardGrid::getWidth() const { return width; }

vector<vector<Cell>>& DateBoardGrid::getCells() { return cells; }
const vector<vector<Cell>>& DateBoardGrid::getCells() const { return cells; }

void to_json(json& j, const DateBoardGrid& g) {
    j = json{{"score", g.getCells()[0][0].getSpecialAttribute()}, {"status", g.getHeight()}};
}