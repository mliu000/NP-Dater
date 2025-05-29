#include "DateBoardGrid.hpp"

using namespace std;

// Constructor
DateBoardGrid::DateBoardGrid(int w, int h) : DateBoard(w, h) {
    generateCoords();
}

void DateBoardGrid::generateCoords() {
    for (int x = 0; x < width; x++) {
        for (int y = 0; y < height; y++) {
            coords.insert({Coord(x, y), false});
        }
    }
}

void to_json(json& j, const DateBoardGrid& g) {
    j = json{{"score", g.getCoords().find(Coord(0, 0))->second}, {"status", g.getHeight()}};
}