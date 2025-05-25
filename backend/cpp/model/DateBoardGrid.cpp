#include "DateBoardGrid.hpp"

using namespace std;

// Constructor
DateBoardGrid::DateBoardGrid(int w, int h) : width(w), height(h) {
    generateCoords();
}

void DateBoardGrid::generateCoords() {
    for (int x = 0; x < width; x++) {
        for (int y = 0; y < height; y++) {
            coords.insert(GridCoord(x, y, false, ""));
        }
    }
}

///// GETTERS /////

int DateBoardGrid::getHeight() const { return height; }
int DateBoardGrid::getWidth() const { return width; }

unordered_set<GridCoord>& DateBoardGrid::getCoords() { return coords; }
const unordered_set<GridCoord>& DateBoardGrid::getCoords() const { return coords; }

void to_json(json& j, const DateBoardGrid& g) {
    j = json{{"score", g.getCoords().find(GridCoord(0, 0, false, ""))->getSpecialAttribute()}, {"status", g.getHeight()}};
}