#include <iostream>
#include "DateBoardHex.hpp"

using namespace std;

// Constructor
DateBoardHex::DateBoardHex(int r) : DateBoard(2*r + 1, 2*r + 1), radius(r) {
    generateCoords();
}

void DateBoardHex::generateCoords() {
    for (int x = -radius; x <= radius; x++) {
        for (int y = -radius; y <= radius; y++) {
            // Check if the coordinate is within the hexagonal bounds
            if (abs(x + y) <= radius) {
                coords.insert({Coord(x, y), false});
            }
        }
    }
}