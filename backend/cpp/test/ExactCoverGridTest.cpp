#include "../utility/Catch.hpp"
#include "../model/GridCoord.hpp"
#include "../model/GridCoord.hpp"
#include "../model/ExactCoverGrid.hpp"

#include <iostream>
#include <unordered_map>
#include <vector>

using namespace std;

/*
Mu Ye Liu - May 2025

Represents test file for the ExactCoverGrid reduction class
*/


TEST_CASE("ExactCoverGrid constructor/instantiation test") {
    // Instantiation
    DateBoardGrid d(2, 3);
    d.blockCoordinate(0, 2);

    unordered_map<string, GridTile*> tiles;

    vector<GridCoord> t1Coords;
    t1Coords.push_back(GridCoord(0, 0));
    t1Coords.push_back(GridCoord(-1, 0));
    t1Coords.push_back(GridCoord(0, 1));

    GridTile t1("1", t1Coords);

    vector<GridCoord> t2Coords;
    t2Coords.push_back(GridCoord(0, 0));
    t2Coords.push_back(GridCoord(1, 0));

    GridTile t2("2", t2Coords);

    tiles.insert({t1.getId(), &t1});
    tiles.insert({t2.getId(), &t2});

    ExactCoverGrid e(d, tiles);

    // Testing

    REQUIRE(e.getInstance().size() == 2);
    REQUIRE(e.getInstance().find(&t1)->second.size() == 5); 
    REQUIRE(e.getInstance().find(&t2)->second.size() == 5); 
}
