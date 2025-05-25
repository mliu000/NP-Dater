#define CATCH_CONFIG_MAIN
#include "../utility/Catch.hpp"
#include "../model/GridCoord.hpp"

#include <iostream>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents test file for Cell
*/

TEST_CASE("GridCoord Constructor Test") {
    GridCoord c(3, 2, false, "");
    REQUIRE(c.getBlocked() == false);
    REQUIRE(c.getSpecialAttribute() == "");
    REQUIRE(c.getX() == 3);
    REQUIRE(c.getY() == 2); 
}

TEST_CASE("GridCoord Setter test") {
    GridCoord c1(1, 2, false, "");
    GridCoord c2(3, 4, false, "");
    c1.setSpecialAttribute("May");
    c2.setBlocked(true);
    REQUIRE(c1.getSpecialAttribute() == "May");
    REQUIRE(c2.getBlocked() == true);
}

