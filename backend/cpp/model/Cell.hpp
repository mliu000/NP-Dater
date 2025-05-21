#ifndef CELL_HPP
#define CELL_HPP

#include <string>

using namespace std;

class Cell {
public:

    // Constructor
    // REQUIRES: s is an int (in string form) from "1" to "31", a 3-letter day/month, or ""
    Cell(bool b, const string& s);

private:

    // Represents whether or not the cell is blocked
    bool blocked;

    // Represents whether or not the cell has special attribute. "" for no special attribute
    std::string specialAttribute;
};

#endif // CELL_HPP