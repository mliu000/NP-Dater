#include "../utility/Catch.hpp"
#include "../model/Coord.hpp"
#include "../model/ExactCover.hpp"
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
    unordered_map<string, Tile*> tiles;
    ExactCover* ecg;

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

        ecg = new ExactCover(d, tiles);

    }

    ~ExactCoverFixture() {
        delete ecg;
    }
};


///// HELPER FUNCTIONS /////

// Helper function that checks that the solution is valid
bool validSolution(const DateBoard& dbg, const unordered_map<string, Tile*>& tiles) {
    const unordered_map<Coord, bool>& coords = dbg.getCoords();
    size_t freeCoordsCount = 0;
    for (const auto& it : coords) {
        if (!it.second) {
            freeCoordsCount++;
        }
    }

    int totalCoordsFromTileSoln = 0;
    unordered_set<Coord> coveredCoords;
    for (const auto& it : tiles) {
        const vector<Coord>& soln = it.second->getSoln();
        totalCoordsFromTileSoln += soln.size();
        for (const Coord& coord : soln) {
            coveredCoords.insert(coord);
        }
    }

    return coveredCoords.size() == freeCoordsCount
        && totalCoordsFromTileSoln == static_cast<int>(freeCoordsCount);
}

///// TEST CASES /////


TEST_CASE_METHOD(ExactCoverFixture, "Grid: Test instance generation", "[ExactCover]") {
    /*
    const vector<vector<const Coord*>>& outer = ecg->getInstance().find(&t1)->second;
    for (size_t i = 0; i < outer.size(); i++) {
        const vector<const Coord*>& inner = outer[i];even 
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
    bool solvable = Solver::solveDatePuzzle(d, *ecg);

    /*
    for (auto& it: tiles) {
        const vector<Coord>& soln = it.second->getSoln();
        cout << it.first << ": ";
        for (const Coord& solnCoord: soln) {
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
    unordered_map<string, Tile*> tiles1;

    GridTile t11("1", {Coord(0, 0), Coord(0, 1)});
    GridTile t12("2", {Coord(0, 0), Coord(1, 0)});
    GridTile t13("3", {Coord(0, 0), Coord(1, 0), Coord(0, 1), Coord(1, 1)});

    tiles1.insert({t11.getId(), &t11});
    tiles1.insert({t12.getId(), &t12});
    tiles1.insert({t13.getId(), &t13});

    ExactCover ecg1(d1, tiles1);

    bool solvable = Solver::solveDatePuzzle(d1, ecg1);

    REQUIRE(!solvable);
    REQUIRE(!validSolution(d1, tiles1));
}


TEST_CASE("Grid: Test solve valid but unsolvable instance", "[ExactCover]") {
    // Create a smaller instance with not enough tile coverage
    DateBoardGrid d2(2, 5);
    d2.blockCoordinate(0, 4);
    unordered_map<string, Tile*> tiles2;

    GridTile t21("1", {Coord(0, 0), Coord(1, 0), Coord(1, 1), Coord(1, 2), Coord(0, 2)});
    GridTile t22("2", {Coord(0, 0), Coord(0, 1)});
    GridTile t23("3", {Coord(0, 0), Coord(0, 1)});

    tiles2.insert({t21.getId(), &t21});
    tiles2.insert({t22.getId(), &t22});
    tiles2.insert({t23.getId(), &t23});

    ExactCover ecg2(d2, tiles2);

    bool solvable = Solver::solveDatePuzzle(d2, ecg2);

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
    unordered_map<string, Tile*> tiles3;

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

    ExactCover ecg3(d3, tiles3);

    auto start = high_resolution_clock::now();
    bool solvable = Solver::solveDatePuzzle(d3, ecg3);
    auto end = high_resolution_clock::now();
    auto duration = duration_cast<milliseconds>(end - start);
    cout << "Grid Solver took " << duration.count() << "ms" << endl;

    REQUIRE(solvable);
    REQUIRE(validSolution(d3, tiles3));
}

TEST_CASE("Hex: Generate simple instances", "[ExactCover]") {
    DateBoardHex d(1);
    unordered_map<string, Tile*> tiles;

    HexTile t1("Hex 1", {Coord(0, 0), Coord(1, 0), Coord(2, 0)});
    HexTile t2("Hex 2", {Coord(0, 0), Coord(0, 1), Coord(1, 1)});
    HexTile t3("Hex 3", {Coord(0, 0)});
    HexTile t4("Hex 4", {Coord(0, 0), Coord(0, 1), Coord(-1, 1)});

    tiles.insert({t1.getId(), &t1});
    tiles.insert({t2.getId(), &t2});
    tiles.insert({t3.getId(), &t3});
    tiles.insert({t4.getId(), &t4});

    ExactCover ecg(d, tiles);
    
    REQUIRE(ecg.getInstance().size() == 4);
    REQUIRE(ecg.getInstance().find(&t1)->second.size() == 3);
    REQUIRE(ecg.getInstance().find(&t2)->second.size() == 12);
    REQUIRE(ecg.getInstance().find(&t3)->second.size() == 7);
    REQUIRE(ecg.getInstance().find(&t4)->second.size() == 6);
    
}

TEST_CASE("Hex: Simple value instance solvable", "[ExactCover]") {
    DateBoardHex d(1);
    unordered_map<string, Tile*> tiles;

    HexTile t1("Hex 1", {Coord(0, 0), Coord(0, 1), Coord(-1, 1)});
    HexTile t2("Hex 2", {Coord(0, 0), Coord(1, 0), Coord(-1, 1)});
    HexTile t3("Hex 3", {Coord(0, 0)});

    tiles.insert({t1.getId(), &t1});
    tiles.insert({t2.getId(), &t2});
    tiles.insert({t3.getId(), &t3});

    ExactCover ecg(d, tiles);

    bool solvable = Solver::solveDatePuzzle(d, ecg);

    REQUIRE(solvable);
    REQUIRE(validSolution(d, tiles));
}

TEST_CASE("Hex: Simple value instance but not solvable", "[ExactCover]") {
    DateBoardHex d(1);
    unordered_map<string, Tile*> tiles;
    HexTile t1("Hex 1", {Coord(0, 0), Coord(0, 1), Coord(0, 2)});
    HexTile t2("Hex 2", {Coord(0, 0), Coord(0, 1), Coord(0, 2)});
    HexTile t3("Hex 3", {Coord(0, 0)});

    tiles.insert({t1.getId(), &t1});
    tiles.insert({t2.getId(), &t2});
    tiles.insert({t3.getId(), &t3});

    ExactCover ecg(d, tiles);

    bool solvable = Solver::solveDatePuzzle(d, ecg);

    REQUIRE(!solvable);
    REQUIRE(!validSolution(d, tiles));
}

TEST_CASE("Hex: Invalid instance with tile mismatch", "[ExactCover]") {
    DateBoardHex d(1);
    unordered_map<string, Tile*> tiles;

    HexTile t1("Hex 1", {Coord(0, 0), Coord(1, 0), Coord(2, 0)});
    HexTile t2("Hex 2", {Coord(0, 0), Coord(0, 1)});
    HexTile t3("Hex 3", {Coord(0, 0)});

    tiles.insert({t1.getId(), &t1});
    tiles.insert({t2.getId(), &t2});
    tiles.insert({t3.getId(), &t3});

    ExactCover ecg(d, tiles);

    bool solvable = Solver::solveDatePuzzle(d, ecg);

    REQUIRE(!solvable);
    REQUIRE(!validSolution(d, tiles));
}

TEST_CASE("Hex: Valid hard instance", "[ExactCover]") {
    DateBoardHex d(4);

    d.blockCoordinate(0, 4);
    d.blockCoordinate(1, 3);
    d.blockCoordinate(2, 2);
    d.blockCoordinate(3, 1);
    d.blockCoordinate(4, 0);
    d.blockCoordinate(4, -1);
    d.blockCoordinate(4, -3);
    d.blockCoordinate(4, -4);
    d.blockCoordinate(3, -4);
    d.blockCoordinate(1, -4);
    d.blockCoordinate(0, -4);
    d.blockCoordinate(-1, -3);
    d.blockCoordinate(-3, -1);
    d.blockCoordinate(-4, 0);
    d.blockCoordinate(-4, 1);
    d.blockCoordinate(-4, 3);
    d.blockCoordinate(-4, 4);
    d.blockCoordinate(-3, 4);
    d.blockCoordinate(-1, 4);
    d.blockCoordinate(0, 2);
    unordered_map<string, Tile*> tiles;

    HexTile t1("Hex 1", {Coord(0, 0), Coord(1, -1), Coord(-1, 1), Coord(0, -1)});
    HexTile t2("Hex 2", {Coord(0, 0), Coord(1, 0), Coord(-1, 0), Coord(1, -1), Coord(0, -1)});
    HexTile t3("Hex 3", {Coord(0, 0), Coord(1, 0), Coord(-1, 0), Coord(0, -1)});
    HexTile t4("Hex 4", {Coord(0, 0), Coord(0, -1), Coord(0, -2), Coord(0, -3)});
    HexTile t5("Hex 5", {Coord(0, 0), Coord(0, -1), Coord(1, -2), Coord(1, -3)});
    HexTile t6("Hex 6", {Coord(0, 0), Coord(0, -1), Coord(0, -2), Coord(-1, 1)});
    HexTile t7("Hex 7", {Coord(0, 0), Coord(0, -1), Coord(-1, 0), Coord(-1, -1)});
    HexTile t8("Hex 8", {Coord(0, 0), Coord(0, -1), Coord(1, 0), Coord(-1, 1)});
    HexTile t9("Hex 9", {Coord(0, 0), Coord(0, -1), Coord(0, -2), Coord(1, 0)});
    HexTile t10("Hex 10", {Coord(0, 0), Coord(0, -1), Coord(1, -2), Coord(2, -2)});

    tiles.insert({t1.getId(), &t1});
    tiles.insert({t2.getId(), &t2});
    tiles.insert({t3.getId(), &t3});
    tiles.insert({t4.getId(), &t4});
    tiles.insert({t5.getId(), &t5});
    tiles.insert({t6.getId(), &t6});
    tiles.insert({t7.getId(), &t7});
    tiles.insert({t8.getId(), &t8});
    tiles.insert({t9.getId(), &t9});
    tiles.insert({t10.getId(), &t10});

    ExactCover ecg(d, tiles);

    auto start = high_resolution_clock::now();
    bool solvable = Solver::solveDatePuzzle(d, ecg);
    auto end = high_resolution_clock::now();
    auto duration = duration_cast<milliseconds>(end - start);
    cout << "Hex Solver took " << duration.count() << "ms" << endl;

    REQUIRE(solvable);
    REQUIRE(validSolution(d, tiles));
}

