#pragma once
#include <iostream>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the coord class
*/
class Coord {
public:

    // Constructor
    Coord(int x, int y);

    // Override equals
    bool operator==(const Coord& otherCoord) const;

    ///// SETTERS /////

    // Sets the x and y coordinates
    void setX(int newX);
    void setY(int newY);

    ///// GETTERS /////

    // Gets the x and y coordinates
    int getX() const;
    int getY() const;

protected:

    // Represents the x and y coordinates
    int x, y;

};

// Custom hash function for coord class
namespace std {
    template <>
    struct hash<Coord> {
        size_t operator()(const Coord& c) const {
            return static_cast<size_t>(c.getX() * 37 + c.getY());
        }
    };
}