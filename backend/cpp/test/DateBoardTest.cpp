#include "../utility/Catch.hpp"
#include "../model/DateBoardGrid.hpp"
#include "../model/DateBoardHex.hpp"
#include "../model/Coord.hpp"

#include <iostream>
#include <unordered_map>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents test file for DateBoard, both Grid and Hexagonal
*/

TEST_CASE("DateBoardGrid Constructor Test") {
    int width = 8;
    int height = 10;
    DateBoardGrid d(width, height);
    REQUIRE(d.getWidth() == width);
    REQUIRE(d.getHeight() == height);   

    const unordered_map<Coord, bool>& coords = d.getCoords();
    REQUIRE(coords.size() == (size_t) width*height);
    REQUIRE(coords.find(Coord(4, 5))->second == false);
    REQUIRE(coords.find(Coord(2, 1))->second == false);
}

TEST_CASE("DateBoardGrid blockCoordinate Test") {
    DateBoardGrid d(4, 6);
    d.blockCoordinate(2, 5);
    d.blockCoordinate(1, 2);

    const unordered_map<Coord, bool>& coords = d.getCoords();
    REQUIRE(coords.find(Coord(2, 5))->second == true);
    REQUIRE(coords.find(Coord(1, 2))->second == true);
}

TEST_CASE("DateBoardHex Constructor Test") {
    DateBoardHex d(3);
    REQUIRE(d.getWidth() == 7);
    REQUIRE(d.getHeight() == 7);

    const unordered_map<Coord, bool>& coords = d.getCoords();
    // Check that the hexagonal grid has the correct number of coordinates
    REQUIRE(coords.size() == 37);
}