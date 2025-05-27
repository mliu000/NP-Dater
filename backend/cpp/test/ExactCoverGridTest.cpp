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

// Test Instance of exact cover
struct ExactCoverFixture {
    DateBoardGrid d;
    unordered_map<string, GridTile*> tiles;
    ExactCoverGrid* ecg;

    GridTile t1, t2, t3;

    ExactCoverFixture()
        : d(2, 5),
          t1("1", {GridCoord(0, 0), GridCoord(-1, 0), GridCoord(0, 1)}),
          t2("2", {GridCoord(0, 0), GridCoord(1, 0)}),
          t3("3", {GridCoord(0, 0), GridCoord(1, 0), GridCoord(0, 1), GridCoord(1, 1)})
    {
        d.blockCoordinate(0, 4);

        tiles[t1.getId()] = &t1;
        tiles[t2.getId()] = &t2;
        tiles[t3.getId()] = &t3;

        ecg = new ExactCoverGrid(d, tiles);
    }

    ~ExactCoverFixture() {
        delete ecg;
    }
};

TEST_CASE_METHOD(ExactCoverFixture, "Test instance generation", "[ExactCover]") {
    const vector<vector<const GridCoord*>>& outer = ecg->getInstance().find(&t2)->second;

    for (size_t i = 0; i < outer.size(); i++) {
        const vector<const GridCoord*>& inner = outer[i];
        for (size_t j = 0; j < inner.size(); j++) {
            cout << "(" << inner[j]->getX() << ", " << inner[j]->getY() << ") ";
        }
        cout << endl;
    }

    REQUIRE(ecg->getInstance().size() == 3);
    REQUIRE(ecg->getInstance().find(&t1)->second.size() == 13);
    REQUIRE(ecg->getInstance().find(&t2)->second.size() == 11);
    REQUIRE(ecg->getInstance().find(&t3)->second.size() == 3);
}
