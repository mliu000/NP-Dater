#pragma once
#include <vector>
#include <string>
#include <unordered_map>
#include "Coord.hpp"
#include "DateBoard.hpp"

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the date board with square tiles
*/
class DateBoardHex : public DateBoard {
public:

    // Construct a dateBoard with given length and width
    DateBoardHex(int r);

protected: 

    // Radius of the hexagonal grid
    int radius; 

private:

    // Generates the cells of the grid
    void generateCoords() override;

};