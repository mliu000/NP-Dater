#include "DateBoardGrid.hpp"

using namespace std;

// Constructor
DateBoardGrid::DateBoardGrid(int w, int h) : width(w), height(h) {
    generateCoords();
}

void DateBoardGrid::generateCoords() {
    for (int x = 0; x < width; x++) {
        for (int y = 0; y < height; y++) {
            coords.insert({Coord(x, y), false});
        }
    }
}

void DateBoardGrid::blockCoordinate(int x, int y) {
    auto it = coords.find(Coord(x, y));
    if (it != coords.end()) {
        it->second = true;
    }
}

int DateBoardGrid::getHeight() const { 
    return height; 
}

int DateBoardGrid::getWidth() const { 
    return width; 
}

const unordered_map<Coord, bool>& DateBoardGrid::getCoords() const { 
    return coords; 
}

void to_json(json& j, const DateBoardGrid& g) {
    j = json{{"score", g.getCoords().find(Coord(0, 0))->second}, {"status", g.getHeight()}};
}