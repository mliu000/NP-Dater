#pragma once

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the coord class for 
*/
class Coord {
public:

    // Constructor
    Coord(int x, int y);

    ///// SETTERS /////

    // Sets the x and y coordinates
    void setX(int newX);
    void setY(int newY);

    ///// GETTERS /////

    // Gets the x and y coordinates
    int getX() const;
    int getY() const;

private:

    // DO NOT CALL. This is simply to mark this superclass as abstract to prevent insantiation.
    virtual void __abstract_marker__();

protected:

    // Represents the x and y coordinates
    int x, y;

};