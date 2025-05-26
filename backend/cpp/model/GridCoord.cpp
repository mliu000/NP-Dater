#include "GridCoord.hpp"

using namespace std;

// Constructor
GridCoord::GridCoord(int x, int y) : Coord(x, y) {};

bool GridCoord::operator==(const GridCoord& otherCoord) const {
    return x == otherCoord.x && y == otherCoord.y;
}

void GridCoord::__abstract_marker__() {} // DO NOT CALL