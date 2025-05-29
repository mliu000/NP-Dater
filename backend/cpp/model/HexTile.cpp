#include "HexTile.hpp"

using namespace std;

// Constructor
HexTile::HexTile(string id, vector<Coord> coordinates) : Tile(id, coordinates) {}

void HexTile::rotateClockwise() {
    for (Coord& coord : coords) {
        int x = coord.getX();
        int y = coord.getY();
        int z = -x - y; 
        coord.setX(-z);
        coord.setY(-x);
    }
}

void HexTile::flip() {
    for (Coord& coord : coords) {
        int x = coord.getX();
        int y = coord.getY();
        coord.setX(y);
        coord.setY(x);
    }
}

int HexTile::checkSymmetry() {
    // TODO: Implement symmetry check for hexagonal tiles
    return 0;
}

int HexTile::needsReflection() {
    // TODO: Implement reflection check for hexagonal tiles
    return 1; // Assuming no reflection needed for 
}