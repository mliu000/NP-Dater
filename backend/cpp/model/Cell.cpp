#include "Cell.hpp"

using namespace std;

// Constructor
Cell::Cell(bool b, const string& s) : blocked(b), specialAttribute(s) {}

///// SETTERS /////

void Cell::setBlocked(bool b) {
    blocked = b;
}

void Cell::setSpecialAttribute(string s) {
    specialAttribute = s;
}

///// GETTERS /////

bool Cell::getBlocked() const {
    return blocked;
}

string Cell::getSpecialAttribute() const {
    return specialAttribute;
}
