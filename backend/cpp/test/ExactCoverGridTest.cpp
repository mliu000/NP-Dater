#include "../utility/Catch.hpp"
#include "../model/Coord.hpp"
#include "../model/ExactCoverGrid.hpp"
#include "../model/Solver.hpp"

#include <iostream>
#include <unordered_map>
#include <vector>
#include <chrono>

using namespace std;
using namespace std::chrono;

/*
Mu Ye Liu - May 2025

Represents test file for the ExactCoverGrid reduction class
*/


// Test Instance of exact cover
struct ExactCoverFixture {
    DateBoardGrid d;
    unordered_map<string, GridTile*> tiles;
    ExactCoverGrid* ecg;

    GridTile t1, t2, t3, t4;

    ExactCoverFixture()
        : d(2, 7),
          t1("1", {Coord(0, 0), Coord(-1, 0), Coord(0, 1), Coord(0, 2)}),
          t2("2", {Coord(0, 0), Coord(1, 0)}),
          t3("3", {Coord(0, 0), Coord(1, 0), Coord(0, 1), Coord(1, 1)}),
          t4("4", {Coord(0, 0), Coord(-1, 0), Coord(0, 1)})
    {
        d.blockCoordinate(0, 6);

        tiles.insert({t1.getId(), &t1});
        tiles.insert({t2.getId(), &t2});
        tiles.insert({t3.getId(), &t3});
        tiles.insert({t4.getId(), &t4});

        ecg = new ExactCoverGrid(d, tiles);

    }

    ~ExactCoverFixture() {
        delete ecg;
    }
};


///// HELPER FUNCTIONS /////

// Helper function that checks that the solution is valid
bool validSolution(const DateBoardGrid& dbg, const unordered_map<string, GridTile*>& tiles) {
    const unordered_map<Coord, bool>& coords = dbg.getCoords();
    size_t freeCoordsCount = 0;
    for (const auto& it : coords) {
        if (!it.second) {
            freeCoordsCount++;
        }
    }

    unordered_set<Coord> coveredCoords;
    for (const auto& it : tiles) {
        const vector<Coord>& soln = it.second->getSoln();
        for (const Coord& coord : soln) {
            coveredCoords.insert(coord);
        }
    }

    return coveredCoords.size() == freeCoordsCount;
}

///// TEST CASES /////


TEST_CASE_METHOD(ExactCoverFixture, "Grid: Test instance generation", "[ExactCover]") {
    /*
    const vector<vector<const Coord*>>& outer = ecg->getInstance().find(&t1)->second;
    for (size_t i = 0; i < outer.size(); i++) {
        const vector<const Coord*>& inner = outer[i];
        for (size_t j = 0; j < inner.size(); j++) {
            cout << "(" << inner[j]->getX() << ", " << inner[j]->getY() << ") ";
        }
        cout << endl;
    }
    */

    REQUIRE(ecg->getInstance().size() == 4);
    REQUIRE(ecg->getInstance().find(&t1)->second.size() == 17);
    REQUIRE(ecg->getInstance().find(&t2)->second.size() == 17);
    REQUIRE(ecg->getInstance().find(&t3)->second.size() == 5);
    REQUIRE(ecg->getInstance().find(&t4)->second.size() == 21);
}

TEST_CASE_METHOD(ExactCoverFixture, "Grid: Test solve simple valid instance", "[ExactCover]") {
    bool solvable = Solver::solveDatePuzzleGrid(d, *ecg);

    /*
    for (auto& it: tiles) {
        const vector<GridCoord>& soln = it.second->getSoln();
        cout << it.first << ": ";
        for (const GridCoord& solnCoord: soln) {
            cout << "(" << solnCoord.getX() << ", " << solnCoord.getY() << ") ";
        }
        cout << endl;
    }
    */

    REQUIRE(solvable);
    REQUIRE(validSolution(d, tiles));
}

TEST_CASE("Grid: Test solve simple invalid instance tile coverage mismatch", "[ExactCover]") {
    // Create a smaller instance with not enough tile coverage
    DateBoardGrid d1(2, 5);
    d1.blockCoordinate(0, 4);
    unordered_map<string, GridTile*> tiles1;

    GridTile t11("1", {Coord(0, 0), Coord(0, 1)});
    GridTile t12("2", {Coord(0, 0), Coord(1, 0)});
    GridTile t13("3", {Coord(0, 0), Coord(1, 0), Coord(0, 1), Coord(1, 1)});

    tiles1.insert({t11.getId(), &t11});
    tiles1.insert({t12.getId(), &t12});
    tiles1.insert({t13.getId(), &t13});

    ExactCoverGrid ecg1(d1, tiles1);

    bool solvable = Solver::solveDatePuzzleGrid(d1, ecg1);

    REQUIRE(!solvable);
    REQUIRE(!validSolution(d1, tiles1));
}

TEST_CASE("Grid: Test solve valid but unsolvable instance", "[ExactCover]") {
    // Create a smaller instance with not enough tile coverage
    DateBoardGrid d2(2, 5);
    d2.blockCoordinate(0, 4);
    unordered_map<string, GridTile*> tiles2;

    GridTile t21("1", {Coord(0, 0), Coord(1, 0), Coord(1, 1), Coord(1, 2), Coord(0, 2)});
    GridTile t22("2", {Coord(0, 0), Coord(0, 1)});
    GridTile t23("3", {Coord(0, 0), Coord(0, 1)});

    tiles2.insert({t21.getId(), &t21});
    tiles2.insert({t22.getId(), &t22});
    tiles2.insert({t23.getId(), &t23});

    ExactCoverGrid ecg2(d2, tiles2);

    bool solvable = Solver::solveDatePuzzleGrid(d2, ecg2);

    REQUIRE(!solvable);
    REQUIRE(!validSolution(d2, tiles2));
}


TEST_CASE("Grid: Test solve valid hard instance", "[ExactCover]") {
    // Create a smaller instance with not enough tile coverage
    DateBoardGrid d3(7, 8);
    d3.blockCoordinate(6, 0);
    d3.blockCoordinate(6, 1);
    d3.blockCoordinate(0, 7);
    d3.blockCoordinate(1, 7);
    d3.blockCoordinate(2, 7);
    d3.blockCoordinate(3, 7);
    d3.blockCoordinate(5, 0);
    d3.blockCoordinate(0, 2);
    d3.blockCoordinate(3, 6);
    unordered_map<string, GridTile*> tiles3;

    GridTile t31("1", {Coord(0, 0), Coord(1, 0), Coord(2, 0), Coord(3, 0)});
    GridTile t32("2", {Coord(0, 0), Coord(0, 1), Coord(1, 0), Coord(2, 0), Coord(2, 1)});
    GridTile t33("3", {Coord(0, 0), Coord(1, 0), Coord(2, 0), Coord(3, 0), Coord(3, -1)});
    GridTile t34("4", {Coord(0, 0), Coord(0, 1), Coord(1, 1), Coord(2, 1), Coord(2, 2)});
    GridTile t35("5", {Coord(0, 0), Coord(1, 0), Coord(1, 1), Coord(2, 1), Coord(3, 1)});
    GridTile t36("6", {Coord(0, 0), Coord(0, 1), Coord(0, 2), Coord(1, 2), Coord(2, 2)});
    GridTile t37("7", {Coord(0, 0), Coord(1, 0), Coord(2, 0), Coord(1, 1), Coord(2, 1)});
    GridTile t38("8", {Coord(0, 0), Coord(0, 1), Coord(1, 1), Coord(2, 1)});
    GridTile t39("9", {Coord(0, 0), Coord(1, 0), Coord(1, 1), Coord(2, 1)});
    GridTile t310("10", {Coord(0, 0), Coord(0, 1), Coord(0, 2), Coord(-1, 2), Coord(1, 2)});

    tiles3.insert({t31.getId(), &t31});
    tiles3.insert({t32.getId(), &t32});
    tiles3.insert({t33.getId(), &t33});
    tiles3.insert({t34.getId(), &t34});
    tiles3.insert({t35.getId(), &t35});
    tiles3.insert({t36.getId(), &t36});
    tiles3.insert({t37.getId(), &t37});
    tiles3.insert({t38.getId(), &t38});
    tiles3.insert({t39.getId(), &t39});
    tiles3.insert({t310.getId(), &t310});

    ExactCoverGrid ecg3(d3, tiles3);

    auto start = high_resolution_clock::now();
    bool solvable = Solver::solveDatePuzzleGrid(d3, ecg3);
    auto end = high_resolution_clock::now();
    auto duration = duration_cast<milliseconds>(end - start);
    cout << "Solver took " << duration.count() << "ms" << endl;

    REQUIRE(solvable);
    REQUIRE(validSolution(d3, tiles3));
}
