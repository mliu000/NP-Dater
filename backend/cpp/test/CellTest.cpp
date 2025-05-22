#define CATCH_CONFIG_MAIN
#include "../utility/Catch.hpp"
#include "../model/Cell.hpp"

#include <iostream>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents test file for Cell
*/

TEST_CASE("Cell Constructor Test") {
    Cell c(false, "");
    REQUIRE(c.getBlocked() == false);
    REQUIRE(c.getSpecialAttribute() == "");
}

TEST_CASE("Cell Setter test") {
    Cell c1(false, "");
    Cell c2(false, "");
    c1.setSpecialAttribute("May");
    c2.setBlocked(true);
    REQUIRE(c1.getSpecialAttribute() == "May");
    REQUIRE(c2.getBlocked() == true);
}

