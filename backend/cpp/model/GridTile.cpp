#include "GridTile.hpp"

using namespace std;

// Constructor
GridTile::GridTile(string id, vector<Coord> coordinates) : Tile(id), coords(coordinates) {}

void GridTile::rotateClockwise() {
    for (Coord& coord: coords) {
        int x = coord.getX();
        int y = coord.getY();
        coord.setX(-y);
        coord.setY(x);
    }
}

void GridTile::reflectX() {
    for (Coord& coord: coords) {
        int x = coord.getX();
        coord.setX(-x);
    }
}

void GridTile::addToSoln(const Coord& coord) {
    soln.push_back(coord);
}

const vector<Coord>& GridTile::getCoords() const {
    return coords;
}

const vector<Coord>& GridTile::getSoln() const {
    return soln;
}