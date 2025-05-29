#include "../utility/Catch.hpp"
#include "../model/GridTile.hpp"
#include "../model/Coord.hpp"
#include "../model/GridCoord.hpp"

#include <iostream>
#include <unordered_map>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents test file for the GridTile
*/

TEST_CASE("GridTile constructor test") {
    vector<GridCoord> vgc;
    vgc.push_back(GridCoord(0, 0));
    vgc.push_back(GridCoord(1, 0));
    vgc.push_back(GridCoord(1, 1));

    GridTile g("123", vgc);

    REQUIRE(g.getId() == "123");
    REQUIRE(g.getCoords().size() == 3);
}

TEST_CASE("GridTile rotate test") {
    vector<GridCoord> vgc;
    vgc.push_back(GridCoord(0, 0));
    vgc.push_back(GridCoord(1, 0));
    vgc.push_back(GridCoord(1, 1));

    GridTile g("123", vgc);
    g.rotateClockwise();
    REQUIRE(g.getCoords()[0] == GridCoord(0, 0));
    REQUIRE(g.getCoords()[1] == GridCoord(0, 1));
    REQUIRE(g.getCoords()[2] == GridCoord(-1, 1));
    g.rotateClockwise();
    REQUIRE(g.getCoords()[0] == GridCoord(0, 0));
    REQUIRE(g.getCoords()[1] == GridCoord(-1, 0));
    REQUIRE(g.getCoords()[2] == GridCoord(-1, -1));
}

TEST_CASE("GridTile reflect test") {
    vector<GridCoord> vgc;
    vgc.push_back(GridCoord(0, 0));
    vgc.push_back(GridCoord(1, 0));
    vgc.push_back(GridCoord(1, 1));

    GridTile g("123", vgc);
    g.reflectX();
    REQUIRE(g.getCoords()[0] == GridCoord(0, 0));
    REQUIRE(g.getCoords()[1] == GridCoord(-1, 0));
    REQUIRE(g.getCoords()[2] == GridCoord(-1, 1));
}