#include "../utility/Catch.hpp"
#include "../model/DateBoardGrid.hpp"

#include <iostream>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents test file for DateBoardGrid
*/

TEST_CASE("Date Constructor Test") {
    int width = 8;
    int height = 10;
    DateBoardGrid d(width, height);
    REQUIRE(d.getWidth() == width);
    REQUIRE(d.getHeight() == height);   

    vector<vector<Cell>> cells = d.getCells();
    REQUIRE(cells.size() == (size_t) width);
    REQUIRE(cells[0].size() == (size_t) height);
    REQUIRE(cells[0][0].getBlocked() == false);
    REQUIRE(cells[0][0].getSpecialAttribute() == "");
    
}