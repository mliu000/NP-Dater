#pragma once
#include <iostream>
#include <unordered_map>
#include <vector>
#include "../model/DateBoardGrid.hpp"
#include "../model/GridTile.hpp"
#include "../model/GridCoord.hpp"
#include "../model/ExactCoverGrid.hpp"

using namespace std;

using PossibilitiesGrid = unordered_map<GridTile*, vector<vector<const GridCoord*>>>; // From ExactCover
using BoardCoordsGrid = unordered_map<GridCoord, bool>; // From the DateBoard
using PlacementGrid = pair<GridTile*, const vector<const GridCoord*>*>; 

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
    Runtime (m tiles and n coordinates): O(n^m) worst case, but greatly reduced through pruning. 
    */
    static bool solveDatePuzzleGrid(DateBoardGrid& dbg, ExactCoverGrid& ecg);

private:

    /* Checks the validity of the input. Makes sure that the total number of unblocked coords is 
    equal to the number of coords all tiles can cover together while non-overlapping
    Returns true if =, false if not.*/
    static bool validGridInstance(const BoardCoordsGrid& coords, const PossibilitiesGrid& poss);

    // Checks the validity of the placement. Returns true if valid, false if invalid
    static bool validGridTilePlacement(const vector<const GridCoord*>& coords, BoardCoordsGrid& bcg);

    // Places a tile and updates the grid
    static void placeGridTile(GridTile* gt, const vector<const GridCoord*>& coords, 
        vector<PlacementGrid>& pg, BoardCoordsGrid& bcg);

    // Removes a tile and updates the grid
    static void displaceGridTile(vector<PlacementGrid>& pg, BoardCoordsGrid& bcg);

    // Finally, once algorithm is finished, record the solution for each of the tiles. 
    static void recordSolution(vector<PlacementGrid>& pg);
};