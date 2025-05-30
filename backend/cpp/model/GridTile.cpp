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

int GridTile::checkSymmetry() {
    // Check Square
    if (isSquare()) {
        return 1;
    }

    // Check 180deg symmetry
    if (is180degSymmetric()) {
        return 2;
    }

    // If none of the test passes, it means the tile is completely asymmetric, thus return 4
    return 4;
}

int GridTile::needsReflection() {
    // Check if the tile is square, if so, no reflection needed
    if (isSquare()) {
        return 1;
    }

    // Check whether or not the tile needs reflection
    vector<Coord> original = coords;
    vector<Coord> reference = coords;
    normalizeCoords(original);
    normalizeCoords(reference);

    flipCheck(reference);
    normalizeCoords(reference);

    // If we notice that none of the rotations after the reflection are the same, then we need
    // to reflect the tile.
    int rotationsNotTheSame = 0;
    for (int i = 0; i < 4; i++) {
        unordered_set<Coord> referenceSet(reference.begin(), reference.end());
        for (Coord& coord: original) {
            if (referenceSet.find(coord) == referenceSet.end()) {
                rotationsNotTheSame++;
                break;
            }
        }
        rotateCoords(reference);
        normalizeCoords(reference);
    }

    // Otherwise, no reflection is needed
    return rotationsNotTheSame == 4 ? 2 : 1;
}

bool GridTile::isSquare() {
    // Start by normalizing
    vector<Coord> toRotate = coords;
    vector<Coord> toFlip = coords;
    normalizeCoords(toRotate);
    normalizeCoords(toFlip);

    // Rotate and reflect the coordinates, store one of them in unordered map, check symmetry
    rotateCoords(toRotate);
    flipCheck(toFlip);

    unordered_set<Coord> reflectedCoordsSet(toFlip.begin(), toFlip.end());

    for (Coord& rotatedCoord: toRotate) {
        if (reflectedCoordsSet.find(rotatedCoord) == reflectedCoordsSet.end()) {
            return false;
        }
    }

    return true;
} 


bool GridTile::is180degSymmetric() {
    // Start by normalizing
    vector<Coord> toNormalizeOriginal = coords;
    normalizeCoords(toNormalizeOriginal);

    vector<Coord> toRotateAndNormalize = toNormalizeOriginal;
    rotateCoords(toRotateAndNormalize);
    rotateCoords(toRotateAndNormalize);
    normalizeCoords(toRotateAndNormalize);

    unordered_set<Coord> finalCoordsSet(toRotateAndNormalize.begin(), toRotateAndNormalize.end());

    for (Coord& coord: toNormalizeOriginal) {
        if (finalCoordsSet.find(coord) == finalCoordsSet.end()) {
            return false;
        }
    } 

    return true;
}


void GridTile::normalizeCoords(vector<Coord>& coordsParam) {
    // Set all coords to -inf so the first x coord will always be recorded
    int maxX = INT_MIN;
    int maxY = INT_MIN;

    // Get the max x and y coordinates
    for (Coord& coord: coordsParam) {
        int currX = coord.getX();
        int currY = coord.getY();
        maxX = max(maxX, currX);
        maxY = max(maxY, currY);
    }

    // Normalize all the coordinates
    for (Coord& coord: coordsParam) {
        coord.setX(coord.getX() - maxX);
        coord.setY(coord.getY() - maxY);
    }
}


void GridTile::rotateCoords(vector<Coord>& coordsParam) {
    for (Coord& coord: coordsParam) {
        int oldX = coord.getX();
        int oldY = coord.getY();

        coord.setX(-oldY);
        coord.setY(oldX);
    }
}


void GridTile::flipCheck(vector<Coord>& coordsParam) {
    for (Coord& coord: coordsParam) {
        int oldX = coord.getX();

        coord.setX(-oldX);
    }
}