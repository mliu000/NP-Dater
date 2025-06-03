#pragma once
#include <vector>
#include <string>
#include <functional>
#include <unordered_map>
#include "Coord.hpp"
#include "DateBoard.hpp"

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the date board with square tiles
*/
class DateBoardGrid : public DateBoard {
public:

    // Construct a dateBoard with given length and width
    DateBoardGrid(int w, int h);


private:

    // Generates the cells of the grid
    void generateCoords() override;

};
