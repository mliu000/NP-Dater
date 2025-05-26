#pragma once
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
    GridCoord(int x, int y);
    
    // Override equals
    bool operator==(const GridCoord& otherCoord) const;

protected: 

    // DO NOT CALL. This is simply to mark this superclass as abstract to prevent insantiation.
    virtual void __abstract_marker__() override; 
};

// Custom hash function for coord class
namespace std {
    template <>
    struct hash<GridCoord> {
        size_t operator()(const GridCoord& c) const {
            return static_cast<size_t>(c.getX() * 37 + c.getY());
        }
    };
}
