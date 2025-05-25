#ifndef GRIDCOORD_HPP
#define GRIDCOORD_HPP

#include <iostream>
#include <functional>
#include "Coord.hpp"

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the Grid coord inheritance class for square coordinates
Doesn't actually inherit anything, just for semantic purposes with relation to inheritance.
*/
class GridCoord : public Coord {
public: 

    // Constructor that just calls base coord constructor 
    GridCoord(int x, int y, bool b, const string& s);

    ///// GETTERS /////
    int getX() const;
    int getY() const;

    // Override equals to lookup coord in set based on stack allocation with same x and y
    bool operator==(const GridCoord& other) const;

private:

    // X and Y coordinates
    const int x;
    const int y;

};

// Custom hashing function for coord class
namespace std {
    template <>
    struct hash<GridCoord> {
        std::size_t operator()(const GridCoord& c) const {
            return static_cast<std::size_t>(c.getX()) * 31 + c.getY();
        }
    };
}

#endif
