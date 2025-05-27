#include "GridTile.hpp"

using namespace std;

// Constructor
GridTile::GridTile(string id, vector<GridCoord> coordinates) : Tile(id), coords(coordinates) {}

void GridTile::rotateClockwise() {
    for (GridCoord& coord: coords) {
        int x = coord.getX();
        int y = coord.getY();
        coord.setX(-y);
        coord.setY(x);
    }
}

const vector<GridCoord>& GridTile::getCoords() const {
    return coords;
}

const vector<GridCoord>& GridTile::getSoln() const {
    return soln;
} 