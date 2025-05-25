#ifndef COORD_HPP
#define COORD_HPP

#include <string>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the coord class for 
*/
class Coord {
public:

    // Constructor
    // REQUIRES: s is an int (in string form) from "1" to "31", a 3-letter day/month, or ""
    Coord(bool b, const string& s);

    ///// SETTERS /////

    // Sets the blocked status of the coord
    void setBlocked(bool b);

    /* Sets the special attribute 
    REQUIRES: - s: must be an int from 1 to 31 in string form, or a 3 letter string representing 
    the first letters of day of week, or month of year, with 1st letter caps
    */
    void setSpecialAttribute(string s);

    ///// GETTERS /////

    bool getBlocked() const;
    string getSpecialAttribute() const;

private:
    // DO NOT IMPLEMENT. This is simply to mark this superclass as abstract to prevent insantiation.
    virtual void __abstract_maker__();

    // Represents whether or not the cell is blocked
    bool blocked;

    // Represents whether or not the cell has special attribute. "" for no special attribute
    string specialAttribute;
};

#endif // CELL_HPP