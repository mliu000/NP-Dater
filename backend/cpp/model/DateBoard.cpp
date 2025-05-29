#include "DateBoard.hpp"

using namespace std;

// Constructor
DateBoard::DateBoard(int w, int h) : width(w), height(h) {};

DateBoard::~DateBoard() {}

void DateBoard::blockCoordinate(int x, int y) {
    auto it = coords.find(Coord(x, y));
    if (it != coords.end()) {
        it->second = true;
    }
}

int DateBoard::getHeight() const { 
    return height; 
}

int DateBoard::getWidth() const { 
    return width; 
}

const unordered_map<Coord, bool>& DateBoard::getCoords() const { 
    return coords; 
}