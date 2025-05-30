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

TEST_CASE("GridTile symmetry test") {
    // Asymmetric tile
    vector<Coord> vgc;
    vgc.push_back(Coord(0, 0));
    vgc.push_back(Coord(1, 0));
    vgc.push_back(Coord(1, 1));

    GridTile g("1", vgc);
    REQUIRE(g.checkSymmetry() == 4);

    // 180deg symmetric tile
    vector<Coord> vgc2;
    vgc2.push_back(Coord(0, 0));
    vgc2.push_back(Coord(1, 0));
    vgc2.push_back(Coord(1, 1));
    vgc2.push_back(Coord(2, 1));

    GridTile g2("2", vgc2);
    REQUIRE(g2.checkSymmetry() == 2);

    // Square tile
    vector<Coord> vgc3;
    vgc3.push_back(Coord(0, 0));
    vgc3.push_back(Coord(1, 0));
    vgc3.push_back(Coord(0, 1));
    vgc3.push_back(Coord(1, 1));

    GridTile g3("3", vgc3);
    REQUIRE(g3.checkSymmetry() == 1);

}

TEST_CASE("GridTile reflection test") {
    // Asymmetric tile but rotates into itself after reflection
    vector<Coord> vgc;
    vgc.push_back(Coord(0, 0));
    vgc.push_back(Coord(1, 0));
    vgc.push_back(Coord(1, 1));

    GridTile g("1", vgc);
    REQUIRE(g.needsReflection() == 1);

    // Square tile
    vector<Coord> vgc2;
    vgc2.push_back(Coord(0, 0));
    vgc2.push_back(Coord(1, 0));
    vgc2.push_back(Coord(0, 1));
    vgc2.push_back(Coord(1, 1));

    GridTile g2("2", vgc2);
    REQUIRE(g2.needsReflection() == 1);

    // Asymmetric tile that needs reflection
    vector<Coord> vgc3;
    vgc3.push_back(Coord(0, 0));
    vgc3.push_back(Coord(1, 0));
    vgc3.push_back(Coord(1, 1));
    vgc3.push_back(Coord(2, 1));

    GridTile g3("3", vgc3);
    REQUIRE(g3.needsReflection() == 2);
}

TEST_CASE("HexTile flip test") {
    vector<Coord> vhc;
    vhc.push_back(Coord(0, 0));
    vhc.push_back(Coord(1, 0));
    vhc.push_back(Coord(1, 1));

    HexTile h("1", vhc);
    h.flip();
    REQUIRE(h.getCoords()[0] == Coord(0, 0));
    REQUIRE(h.getCoords()[1] == Coord(0, 1));
    REQUIRE(h.getCoords()[2] == Coord(1, 1));
}

TEST_CASE("HexTile rotate test") {
    vector<Coord> vhc;
    vhc.push_back(Coord(0, 0));
    vhc.push_back(Coord(1, 0));
    vhc.push_back(Coord(1, 1));

    HexTile h("1", vhc);
    h.rotateClockwise();
    REQUIRE(h.getCoords()[0] == Coord(0, 0));
    REQUIRE(h.getCoords()[1] == Coord(1, -1));
    REQUIRE(h.getCoords()[2] == Coord(2, -1));
    h.rotateClockwise();
    REQUIRE(h.getCoords()[0] == Coord(0, 0));
    REQUIRE(h.getCoords()[1] == Coord(0, -1));
    REQUIRE(h.getCoords()[2] == Coord(1, -2));
}

TEST_CASE("HexTile symmetry and reflection test") {
    // Asymmetric tile
    vector<Coord> vhc;
    vhc.push_back(Coord(0, 0));
    vhc.push_back(Coord(1, 0));
    vhc.push_back(Coord(1, 1));

    HexTile h1("1", vhc);
    REQUIRE(h1.checkSymmetry() == 6);
    REQUIRE(h1.needsReflection() == 1);

    // 180deg symmetric tile that does not require reflection
    vector<Coord> vhc2;
    vhc2.push_back(Coord(0, 0));
    vhc2.push_back(Coord(1, 0));

    HexTile h2("2", vhc2);
    REQUIRE(h2.checkSymmetry() == 3);
    REQUIRE(h2.needsReflection() == 1);

    // 180deg symmetric tile that requires reflection
    vector<Coord> vhc3;
    vhc3.push_back(Coord(0, 0));
    vhc3.push_back(Coord(1, 0));
    vhc3.push_back(Coord(2, -1));
    vhc3.push_back(Coord(-1, 1));
    HexTile h3("3", vhc3);

    REQUIRE(h3.checkSymmetry() == 3);
    REQUIRE(h3.needsReflection() == 2);

    // Hexagonal tile
    vector<Coord> vhc4;
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            if (abs(i + j) <= 1) {
                vhc4.push_back(Coord(i - 4, j - 7)); 
            }
        }
    }

    HexTile h4("4", vhc4);
    REQUIRE(h4.checkSymmetry() == 1);
    REQUIRE(h4.needsReflection() == 1);

    // 120deg symmetric tile
    vector<Coord> vhc5;
    vhc5.push_back(Coord(0, 0));
    vhc5.push_back(Coord(1, 0));
    vhc5.push_back(Coord(-1, 1));
    vhc5.push_back(Coord(0, -1));

    HexTile h5("5", vhc5);
    REQUIRE(h5.checkSymmetry() == 2);
    REQUIRE(h5.needsReflection() == 1);

}