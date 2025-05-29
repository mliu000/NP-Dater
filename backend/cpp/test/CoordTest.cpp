#define CATCH_CONFIG_MAIN
#include "../utility/Catch.hpp"
#include "../model/Coord.hpp"

#include <iostream>
#include <unordered_set>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents test file for GridCell
*/

TEST_CASE("Coord constructor test") {
    Coord c(3, 2); 
    REQUIRE(c.getX() == 3);
    REQUIRE(c.getY() == 2); 
}

TEST_CASE("Coord x and y setter test") {
    Coord c(1, 2);
    c.setX(2);
    c.setY(1);
    REQUIRE(c.getX() == 2);
    REQUIRE(c.getY() == 1);
}

TEST_CASE("Coord operator== test") {
    Coord c1(0, 0);
    Coord c2(0, 0);
    unordered_set<Coord> c;
    c.insert(c1);
    c.insert(c2);

    REQUIRE(c.size() == 1);
}

