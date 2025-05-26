#define CATCH_CONFIG_MAIN
#include "../utility/Catch.hpp"
#include "../model/GridCoord.hpp"

#include <iostream>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents test file for GridCell
*/

TEST_CASE("GridCoord constructor test") {
    GridCoord c(3, 2); 
    REQUIRE(c.getX() == 3);
    REQUIRE(c.getY() == 2); 
}

TEST_CASE("GridCoord x and y setter test") {
    GridCoord c(1, 2);
    c.setX(2);
    c.setY(1);
    REQUIRE(c.getX() == 2);
    REQUIRE(c.getY() == 1);
}

