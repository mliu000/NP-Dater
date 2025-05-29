#pragma once
#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include "DateBoardGrid.hpp"
#include "DateBoardHex.hpp"
#include "GridTile.hpp"
#include "HexTile.hpp"
#include "Coord.hpp"

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
    ExactCoverGrid(DateBoard& dbg, unordered_map<string, Tile*>& gt);

    // Gets the instance
    const unordered_map<Tile*, vector<vector<const Coord*>>>& getInstance() const;

private:

    ///// HELPER FUNCTIONS /////

    /* Creates the instance
    Runtime (m tiles and n blocks): O(n^2)
    */ 
    void createInstance(DateBoard& dbg, unordered_map<string, Tile*>& gt);

    /* Checks whether or not the tile placement is valid. 
    Runtime: O(1)
    */
    bool validPlacement(int x, int y, DateBoard& dbg);

    ///// FIELDS /////

    // Stores the instance of the reduced exact cover
    unordered_map<Tile*, vector<vector<const Coord*>>> instance;
};
