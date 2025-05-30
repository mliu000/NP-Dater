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
    if (isHexagon()) {
        return 1; // Hexagon is symmetric
    }

    
    if (is120degSymmetric()) {
        return 2; 
    }

    if (is180degSymmetric()) {
        return 3;
    }

    // Needs to rotate all times, so return 6
    return 6;
}

int HexTile::needsReflection() {
    // If hexagon, then no reflection needed
    if (isHexagon() || is120degSymmetric()) {
        return 1; 
    }

    int rotationsNotTheSame = 0;

    vector<Coord> original = coords;
    vector<Coord> reference = coords;
    normalizeCoords(original);
    normalizeCoords(reference);
    flipCoords(reference);
    normalizeCoords(reference);

    for (int i = 0; i < 6; i++) {
        unordered_set<Coord> referenceSet(reference.begin(), reference.end());
        for (const Coord& coord : original) {
            if (referenceSet.find(coord) == referenceSet.end()) {
                rotationsNotTheSame++;
                break;
            }
        }
        rotateCoordsClockwise(reference);
        normalizeCoords(reference);
    }

    return rotationsNotTheSame == 6 ? 2 : 1;
}

void HexTile::normalizeCoords(vector<Coord>& coordsParam) {
    // Normalize coordinates to ensure all are non-negative
    int maxX = INT_MIN;
    int maxY = INT_MIN;

    // Find the maximum x, y, and z values
    for (const Coord& coord : coordsParam) {
        maxX = max(maxX, coord.getX());
        maxY = max(maxY, coord.getY());
    }

    // Normalize the coordinates
    for (Coord& coord : coordsParam) {
        coord.setX(coord.getX() - maxX);
        coord.setY(coord.getY() - maxY);
    }
}


bool HexTile::isHexagon() {
    // Create 2 copies of the coordinates, one original, the other to rotate
    vector<Coord> originalCoords = coords;
    vector<Coord> toRotateCoords = coords;
    normalizeCoords(originalCoords);

    for (int i = 0; i < 6; i++) {
        rotateCoordsClockwise(toRotateCoords);
        normalizeCoords(toRotateCoords);
        
        unordered_set<Coord> toRotateSet(toRotateCoords.begin(), toRotateCoords.end());
        for (const Coord& coord : originalCoords) {
            if (toRotateSet.find(coord) == toRotateSet.end()) {
                return false; 
            }
        }
    }

    return true;

}

bool HexTile::is120degSymmetric() {
    // Create a copy of the coordinates to rotate, as well as the original coordinates to normalize
    vector<Coord> toNormalizeOriginal = coords;
    vector<Coord> toRotateCoords = coords;
    normalizeCoords(toNormalizeOriginal);
    normalizeCoords(toRotateCoords);

    // Rotate the coordinates two times (120 degrees) and normalize them
    rotateCoordsClockwise(toRotateCoords);
    rotateCoordsClockwise(toRotateCoords);
    normalizeCoords(toRotateCoords);
    
    unordered_set<Coord> rotatedSet(toRotateCoords.begin(), toRotateCoords.end());
    
    for (const Coord& coord : toNormalizeOriginal) {
        if (rotatedSet.find(coord) == rotatedSet.end()) {
            return false; 
        }
    }

    return true;
}


bool HexTile::is180degSymmetric() {
    // Create a copy of the coordinates to rotate, as well as the original coordinates to normalize
    vector<Coord> toNormalizeOriginal = coords;
    vector<Coord> toRotateCoords = coords;
    normalizeCoords(toNormalizeOriginal);
    normalizeCoords(toRotateCoords);

    // Rotate the coordinates three times (180 degrees) and normalize them
    rotateCoordsClockwise(toRotateCoords);
    rotateCoordsClockwise(toRotateCoords);
    rotateCoordsClockwise(toRotateCoords);
    normalizeCoords(toRotateCoords);
    
    unordered_set<Coord> rotatedSet(toRotateCoords.begin(), toRotateCoords.end());
    
    for (const Coord& coord : toNormalizeOriginal) {
        if (rotatedSet.find(coord) == rotatedSet.end()) {
            return false; 
        }
    }

    return true;
}

bool HexTile::flipCoords(vector<Coord>& coordsParam) const {
    for (Coord& coord : coordsParam) {
        int x = coord.getX();
        int y = coord.getY();
        coord.setX(y);
        coord.setY(x);
    }

    return true;
}


bool HexTile::rotateCoordsClockwise(vector<Coord>& coordsParam) const {
    for (Coord& coord : coordsParam) {
        int x = coord.getX();
        int y = coord.getY();
        int z = -x - y; 
        coord.setX(-z);
        coord.setY(-x);
    }

    return true;
}