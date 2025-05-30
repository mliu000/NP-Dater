#pragma once
#include <iostream>
#include <unordered_map>
#include <vector>
#include "../model/DateBoardGrid.hpp"
#include "../model/DateBoardHex.hpp"
#include "../model/GridTile.hpp"
#include "../model/HexTile.hpp"
#include "../model/Coord.hpp"
#include "../model/ExactCover.hpp"

using namespace std;

using Possibilities = unordered_map<Tile*, vector<vector<const Coord*>>>; // From ExactCover
using BoardCoords = vector<uint8_t>; // From the DateBoard
using Placement = pair<Tile*, const vector<const Coord*>*>; 

/*
Mu Ye Liu - May 2025

Represents a static utility class that will store all the solvers. 
*/
class Solver {
public:

    // Makes the class uninstantiable
    Solver() = delete;
    Solver(const Solver&) = delete;
    Solver& operator=(const Solver&) = delete;

    /* Attempts to solve the instance of Exact Cover. 
    Returns true if the instance can be solved, false if it cannot. 
    Runtime (m tiles and n coordinates): O(n^m) worst case, but grealy reduced through pruning, 
    backtracking, and MRV and LCV heuristics.
    */
    static bool solveDatePuzzle(DateBoard& dbg, ExactCover& ecg);

private:

    /* Checks the validity of the input. Makes sure that the total number of unblocked coords is 
    equal to the number of coords all tiles can cover together while non-overlapping
    Returns true if =, false if not.*/
    static bool validInstance(const unordered_map<Coord, bool>& coords, const Possibilities& poss);

    // Checks the validity of the placement. Returns true if valid, false if invalid
    static bool validTilePlacement(const vector<const Coord*>& coords, BoardCoords& bcg, int fct, int radius);

    // Places a tile and updates the grid
    static void placeTile(Tile* gt, const vector<const Coord*>& coords, 
        vector<Placement>& pg, BoardCoords& bcg, int fct, int radius);

    // Removes a tile and updates the grid
    static void displaceTile(vector<Placement>& pg, BoardCoords& bcg, int fct, int radius);

    // Finally, once algorithm is finished, record the solution for each of the tiles. 
    static void recordSolution(vector<Placement>& pg);
};