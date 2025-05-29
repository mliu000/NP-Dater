#include "../utility/Catch.hpp"
#include "../model/GridTile.hpp"
#include "../model/HexTile.hpp"
#include "../model/Coord.hpp"

#include <iostream>
#include <unordered_map>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents test file for the GridTile
*/

TEST_CASE("GridTile constructor test") {
    vector<Coord> vgc;
    vgc.push_back(Coord(0, 0));
    vgc.push_back(Coord(1, 0));
    vgc.push_back(Coord(1, 1));

    GridTile g("123", vgc);

    REQUIRE(g.getId() == "123");
    REQUIRE(g.getCoords().size() == 3);
}

TEST_CASE("GridTile rotate test") {
    vector<Coord> vgc;
    vgc.push_back(Coord(0, 0));
    vgc.push_back(Coord(1, 0));
    vgc.push_back(Coord(1, 1));

    GridTile g("123", vgc);
    g.rotateClockwise();
    REQUIRE(g.getCoords()[0] == Coord(0, 0));
    REQUIRE(g.getCoords()[1] == Coord(0, 1));
    REQUIRE(g.getCoords()[2] == Coord(-1, 1));
    g.rotateClockwise();
    REQUIRE(g.getCoords()[0] == Coord(0, 0));
    REQUIRE(g.getCoords()[1] == Coord(-1, 0));
    REQUIRE(g.getCoords()[2] == Coord(-1, -1));
}

TEST_CASE("GridTile flip test") {
    vector<Coord> vgc;
    vgc.push_back(Coord(0, 0));
    vgc.push_back(Coord(1, 0));
    vgc.push_back(Coord(1, 1));

    GridTile g("123", vgc);
    g.flip();
    REQUIRE(g.getCoords()[0] == Coord(0, 0));
    REQUIRE(g.getCoords()[1] == Coord(-1, 0));
    REQUIRE(g.getCoords()[2] == Coord(-1, 1));
}

TEST_CASE("HexTile flip test") {
    vector<Coord> vhc;
    vhc.push_back(Coord(0, 0));
    vhc.push_back(Coord(1, 0));
    vhc.push_back(Coord(1, 1));

    HexTile h("123", vhc);
    h.flip();
    REQUIRE(h.getCoords()[0] == Coord(0, 0));
    REQUIRE(h.getCoords()[1] == Coord(0, 1));
    REQUIRE(h.getCoords()[2] == Coord(1, 1));
}