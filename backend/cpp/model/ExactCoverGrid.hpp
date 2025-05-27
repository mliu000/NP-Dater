#pragma once
#include <iostream>
#include <unordered_map>
#include "DateBoardGrid.hpp"
#include "GridTile.hpp"
#include "GridCoord.hpp"

using namespace std;

/*
Mu Ye Liu - May 2025

Represents the class that reduces to exact cover. 
*/
class ExactCoverGrid {
public:

    /* Constructor
    REQUIRES: the total number of coords that all tiles must cover in total when none of them are 
              overlapping must be equal to the number of unblocked tiles. 
    */
    ExactCoverGrid(DateBoardGrid& dbg, unordered_map<string, GridTile*>& gt);

    const unordered_map<GridTile*, vector<vector<const GridCoord*>>>& getInstance() const;

    ///// SOLVER /////
    static void solve(ExactCoverGrid ecgInstance);

private:

    ///// HELPER FUNCTIONS /////

    /* Creates the instance
    Runtime (k tiles and n blocks): O(n^2*k)
    */ 
    void createInstance(DateBoardGrid& dbg, unordered_map<string, GridTile*>& gt);

    // Checks whether or not the tile placement is valid
    bool validPlacement(int x, int y, DateBoardGrid& dbg);

    ///// FIELDS /////

    // Stores the instance of the reduced exact cover
    unordered_map<GridTile*, vector<vector<const GridCoord*>>> instance;
};
