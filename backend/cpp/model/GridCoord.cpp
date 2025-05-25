#include "GridCoord.hpp"

using namespace std;

// Constructor
GridCoord::GridCoord(int x, int y, bool b, const string& s) : Coord(b, s), x(x), y(y) {};

int GridCoord::getX() const { return x; }
int GridCoord::getY() const { return y; }

bool GridCoord::operator==(const GridCoord& other) const {
    return x == other.getX() && y == other.getY();
}

void Coord::__abstract_maker__() {}  // DO NOT CALL

