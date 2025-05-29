#include "GridTile.hpp"

using namespace std;

// Constructor
GridTile::GridTile(string id, vector<Coord> coordinates) : Tile(id, coordinates) {}

void GridTile::rotateClockwise() {
    for (Coord& coord: coords) {
        int x = coord.getX();
        int y = coord.getY();
        coord.setX(-y);
        coord.setY(x);
    }
}

void GridTile::flip() {
    for (Coord& coord: coords) {
        int x = coord.getX();
        coord.setX(-x);
    }
}