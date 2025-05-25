#include "../utility/Catch.hpp"
#include "../model/DateBoardGrid.hpp"
#include "../model/GridCoord.hpp"

#include <iostream>
#include <unordered_set>

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

    unordered_set<GridCoord>& coords = d.getCoords();
    REQUIRE(coords.size() == (size_t) width*height);
    const GridCoord& randomCoord = *(coords.find(GridCoord(3, 4, false, "")));
    REQUIRE(randomCoord.getBlocked() == false);
    REQUIRE(randomCoord.getSpecialAttribute() == "");
    
}