#include "Tile.hpp"

using namespace std;

// Constructor
Tile::Tile(string id, vector<Coord> coordinates) : id(id), coords(coordinates) {}

// Destructor
Tile::~Tile() {}

void Tile::addToSoln(const Coord& coord) {
    soln.push_back(coord);
}

const vector<Coord>& Tile::getCoords() const {
    return coords;
}

const vector<Coord>& Tile::getSoln() const {
    return soln;
}

string Tile::getId() const {
    return id;
}