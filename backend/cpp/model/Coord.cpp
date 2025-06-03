#include "Coord.hpp"

using namespace std;

// Constructor
Coord::Coord(int x, int y) : x(x), y(y) {}; 

bool Coord::operator==(const Coord& otherCoord) const {
    return x == otherCoord.x && y == otherCoord.y;
}

void Coord::setX(int newX) {
    x = newX;
} 

void Coord::setY(int newY) {
    y = newY;
} 

int Coord::getX() const { return x; }
int Coord::getY() const { return y; }

void to_json(json& j, const Coord& c) {
    j = json{{"x", c.getX()}, {"y", c.getY()}};
}
