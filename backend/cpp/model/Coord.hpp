#pragma once
#include <iostream>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the general coord class
*/
class Coord {
public:

    // Constructor
    Coord(int x, int y);

    // Virtual destructor
    virtual ~Coord();

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

    // DO NOT CALL. This is simply to mark this superclass as abstract to prevent insantiation.
    virtual void __abstract_marker__() = 0; 

};