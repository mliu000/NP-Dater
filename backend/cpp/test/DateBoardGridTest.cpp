#include "../utility/Catch.hpp"
#include "../model/DateBoardGrid.hpp"
#include "../model/GridCoord.hpp"

#include <iostream>
#include <unordered_map>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents test file for DateBoardGrid
*/

TEST_CASE("DateBoardGrid Constructor Test") {
    int width = 8;
    int height = 10;
    DateBoardGrid d(width, height);
    REQUIRE(d.getWidth() == width);
    REQUIRE(d.getHeight() == height);   

    const unordered_map<GridCoord, bool>& coords = d.getCoords();
    REQUIRE(coords.size() == (size_t) width*height);
    REQUIRE(coords.find(GridCoord(4, 5))->second == false);
    REQUIRE(coords.find(GridCoord(2, 1))->second == false);
}

TEST_CASE("DateBoardGrid blockCoordinate Test") {
    DateBoardGrid d(4, 6);
    d.blockCoordinate(2, 5);
    d.blockCoordinate(1, 2);

    const unordered_map<GridCoord, bool>& coords = d.getCoords();
    REQUIRE(coords.find(GridCoord(2, 5))->second == true);
    REQUIRE(coords.find(GridCoord(1, 2))->second == true);
}