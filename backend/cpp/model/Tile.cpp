#include "Tile.hpp"

using namespace std;

// Constructor
Tile::Tile(string id) : id(id) {}

// Destructor
Tile::~Tile() {}

string Tile::getId() const {
    return id;
}