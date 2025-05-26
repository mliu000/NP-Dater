#include "Coord.hpp"

using namespace std;

// Constructor
Coord::Coord(int x, int y) : x(x), y(y) {}; 

void Coord::setX(int newX) {
    x = newX;
} 

void Coord::setY(int newY) {
    y = newY;
} 

int Coord::getX() const { return x; }
int Coord::getY() const { return y; }

void Coord::__abstract_marker__() {}