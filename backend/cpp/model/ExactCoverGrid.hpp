#pragma once
#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include "DateBoardGrid.hpp"
#include "GridTile.hpp"
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

    /* Checks for symmetry. Return 4 if asymmetric, 2 if symmetric 180deg, and 1 if a square.
    Runtime: O(n)
    */
    int checkSymmetry(const vector<Coord>& coords);

    /* Checks whether or not the tile needs to be reflected. Returns 2 if yes, 1 if no.
    */
    int needsReflection(const vector<Coord>& coords);

    /* Normalizes a vector of coordinates, by setting all coordinates to be <= 0
    Runtime: O(n)
    */
    void normalizeCoords(vector<Coord>& coords);

    /* Checks whether or not a tile is a square
    Runtime: O(n)
    */
    bool isSquare(const vector<Coord>& coords);

    /* Checks whether or not a tile is 180deg symmetric
    Runtime: O(n)*/
    bool is180degSymmetric(const vector<Coord>& coords);

    /* Rotates coordinates clockwise
    Runtime: O(n)
    */
    void rotateCoords(vector<Coord>& coords);

    /* Reflects the coordinates about the X-Axis
    Runtime: O(n)
    */
    void flip(vector<Coord>& coords);

    /* Checks whether or not the tile placement is valid. 
    Runtime: O(1)
    */
    bool validPlacement(int x, int y, DateBoard& dbg);

    ///// FIELDS /////

    // Stores the instance of the reduced exact cover
    unordered_map<Tile*, vector<vector<const Coord*>>> instance;
};
