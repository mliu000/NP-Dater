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