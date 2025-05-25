#include "Coord.hpp"

using namespace std;

// Constructor
Coord::Coord(bool b, const string& s) : blocked(b), specialAttribute(s) {}

///// SETTERS /////

void Coord::setBlocked(bool b) {
    blocked = b;
}

void Coord::setSpecialAttribute(string s) {
    specialAttribute = s;
}

///// GETTERS /////

bool Coord::getBlocked() const {
    return blocked;
}

string Coord::getSpecialAttribute() const {
    return specialAttribute;
}
