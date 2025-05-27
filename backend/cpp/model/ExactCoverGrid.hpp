#pragma once
#include <iostream>
#include <unordered_map>
#include <unordered_set>
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

    // Gets the instance
    const unordered_map<GridTile*, vector<vector<const GridCoord*>>>& getInstance() const;

    ///// SOLVER /////
    static void solve(ExactCoverGrid ecgInstance);

private:

    ///// HELPER FUNCTIONS /////

    /* Creates the instance
    Runtime (k tiles and n blocks): O(n^2)
    */ 
    void createInstance(DateBoardGrid& dbg, unordered_map<string, GridTile*>& gt);

    /* Checks for symmetry. Return 4 if asymmetric, 2 if symmetric 180deg, and 1 if a square.
    Runtime: O(n)
    */
    int checkSymmetry(const vector<GridCoord>& coords);

    /* Normalizes a vector of coordinates, by setting all coordinates to be <= 0
    Runtime: O(n)
    */
    void normalizeCoords(vector<GridCoord>& coords);

    /* Checks whether or not a tile is a square
    Runtime: O(n)
    */
    bool isSquare(const vector<GridCoord>& coords);

    /* Checks whether or not a tile is 180deg symmetric
    Runtime: O(n)*/
    bool is180degSymmetric(const vector<GridCoord>& coords);

    /* Rotates coordinates clockwise
    Runtime: O(n)
    */
    void rotateCoords(vector<GridCoord>& coords);

    /* Reflects the coordinates about the X-Axis
    Runtime: O(n)
    */
    void reflectCoordsX(vector<GridCoord>& coords);

    /* Checks whether or not the tile placement is valid. 
    Runtime: O(1)
    */
    bool validPlacement(int x, int y, DateBoardGrid& dbg);

    ///// FIELDS /////

    // Stores the instance of the reduced exact cover
    unordered_map<GridTile*, vector<vector<const GridCoord*>>> instance;
};
