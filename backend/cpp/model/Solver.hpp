#pragma once
#include <iostream>
#include <unordered_map>
#include <vector>
#include <bitset>
#include <utility>
#include <queue>
#include <cstdint>
#include <algorithm>
#include "../model/DateBoardGrid.hpp"
#include "../model/DateBoardHex.hpp"
#include "../model/GridTile.hpp"
#include "../model/HexTile.hpp"
#include "../model/Coord.hpp"
#include "../model/ExactCover.hpp"

using namespace std;

using Possibilities = unordered_map<Tile*, vector<vector<const Coord*>>>; // From ExactCover

/*
Mu Ye Liu - May 2025

Represents a static utility class that will store all the solvers, as well as the struct to store
the tile states for solving purposes.
*/
constexpr int MAX_COORDS = 256;


struct TileInfo {
    Tile* tile;
    uint8_t id; // For tie-breaking purposes
    int placementIndex;
    vector<bitset<MAX_COORDS>> placements;
    vector<int> domain;
};

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

    ///// HELPER FUNCTIONS /////

    /* Checks the validity of the input. Makes sure that the total number of unblocked coords is 
    equal to the number of coords all tiles can cover together while non-overlapping
    Returns true if =, false if not.*/
    static bool validInstance(const unordered_map<Coord, bool>& coords, const Possibilities& poss);

    // Converts the DateBoard to a bitset representation
    static bitset<MAX_COORDS>boardToBitset(DateBoard& dbg, int rad);

    // Converts the exact cover instance to a vector of TileInfo pointers stored in a priority queue
    static void convertExactCoverToTileInfo(ExactCover& ecg, vector<TileInfo*>& vti, int rad, int fct);

    // Undoes the last placement, and returns a pointer to the TileInfo that was undone.
    static TileInfo* undoLastPlacement(bitset<MAX_COORDS>& bsb, vector<TileInfo*>& vti, 
        vector<pair<TileInfo*, int>>& soln, vector<vector<pair<TileInfo*, int>>>& rms);

    // Finally, once algorithm is finished, record the solution for each of the tiles. 
    static void recordSolution(const vector<pair<TileInfo*, int>>& soln, int rad, int fct);

    // Deallocate the memory for the TileInfo pointers
    static void deallocateTileInfoPointers(vector<TileInfo*>& tileInfos);
    
    
};