#include "ExactCoverGrid.hpp"

using namespace std;

// Constructor
ExactCoverGrid::ExactCoverGrid(DateBoardGrid& dbg, unordered_map<string, GridTile*>& gt) {
    createInstance(dbg, gt);
}


void ExactCoverGrid::createInstance(DateBoardGrid& dbg, unordered_map<string, GridTile*>& gt) {
    int width = dbg.getWidth();
    int height = dbg.getHeight();

    // Iterate through all the GridTiles: O(m)
    for (auto &it: gt) { 
        vector<vector<const GridCoord*>> outer;

        // Check the symmetry of the tiles and whether or not reflection is required: O(n)
        int symm = checkSymmetry(it.second->getCoords());
        int reflect = needsReflection(it.second->getCoords());

        // Iterate through all possible tile placements via the reference points: O(n)
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {

                // Iterate through all possible reflections if needed: O(1)
                for (int f = 0; f < reflect; f++) {

                    // Iterate through all possible rotations (4 possible rotations): O(1)
                    for (int r = 0; r < symm; r++) {
                        bool valid = true;
                        vector<const GridCoord*> inner;

                        // Iterate over all all the coords the tile covers relative to reference: O(n/m)
                        for (const GridCoord& coord: it.second->getCoords()) {
                            int currX = x + coord.getX();
                            int currY = y + coord.getY();
                            if (validPlacement(currX, currY, dbg)) {
                                inner.push_back(&dbg.getCoords().find(GridCoord(currX, currY))->first);
                            } else {
                                valid = false;
                                break;
                            }
                        }

                        // Add to inner list to outer list if placement is valid
                        if (valid) {
                            outer.push_back(inner);
                        }

                        it.second->rotateClockwise(); // O(n) worst case
                    }

                    // Reset the tile's rotation allow coordinates to generate correctly. O(n) worse case
                    for (int i = symm; i < 4; i++) {
                        it.second->rotateClockwise();
                    }

                    it.second->reflectX(); // O(n) worst case
                }

                for (int k = reflect; k < 2; k++) {
                    it.second->reflectX(); // O(n) worst case
                }
                
            }
        }

        instance.insert({it.second, outer});
    }
}


bool ExactCoverGrid::validPlacement(int x, int y, DateBoardGrid& dbg) {
    bool withinX = x >= 0 && x < dbg.getWidth();
    bool withinY = y >= 0 && y < dbg.getHeight();

    // Make sure that lookup is only attempted if x and y are in bounds
    if (!(withinX && withinY)) {
        return false;
    }

    const unordered_map<GridCoord, bool>& coords = dbg.getCoords();
    auto it = coords.find(GridCoord(x, y));

    return it != coords.end() && !it->second;
}


int ExactCoverGrid::checkSymmetry(const vector<GridCoord>& coords) {
    // Check Square
    if (isSquare(coords)) {
        return 1;
    }

    // Check 180deg symmetry
    if (is180degSymmetric(coords)) {
        return 2;
    }

    // If none of the test passes, it means the tile is completely asymmetric, thus return 4
    return 4;
}

int ExactCoverGrid::needsReflection(const vector<GridCoord>& coords) {
    // Check if the tile is square, if so, no reflection needed
    if (isSquare(coords)) {
        return 1;
    }

    // Check whether or not the tile needs reflection
    vector<GridCoord> original = coords;
    vector<GridCoord> reference = coords;
    normalizeCoords(original);
    normalizeCoords(reference);

    reflectCoordsX(reference);
    normalizeCoords(reference);

    // If we notice that none of the rotations after the reflection are the same, then we need
    // to reflect the tile.
    int rotationsNotTheSame = 0;
    for (int i = 0; i < 4; i++) {
        unordered_set<GridCoord> referenceSet(reference.begin(), reference.end());
        for (GridCoord& coord: original) {
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

bool ExactCoverGrid::isSquare(const vector<GridCoord>& coords) {
    // Start by normalizing
    vector<GridCoord> toRotate = coords;
    vector<GridCoord> toReflectX = coords;
    normalizeCoords(toRotate);
    normalizeCoords(toReflectX);

    // Rotate and reflect the coordinates, store one of them in unordered map, check symmetry
    rotateCoords(toRotate);
    reflectCoordsX(toReflectX);

    unordered_set<GridCoord> reflectedCoordsSet(toReflectX.begin(), toReflectX.end());

    for (GridCoord& rotatedCoord: toRotate) {
        if (reflectedCoordsSet.find(rotatedCoord) == reflectedCoordsSet.end()) {
            return false;
        }
    }

    return true;
} 


bool ExactCoverGrid::is180degSymmetric(const vector<GridCoord>& coords) {
    // Start by normalizing
    vector<GridCoord> toNormalizeOriginal = coords;
    normalizeCoords(toNormalizeOriginal);

    vector<GridCoord> toRotateAndNormalize = toNormalizeOriginal;
    rotateCoords(toRotateAndNormalize);
    rotateCoords(toRotateAndNormalize);
    normalizeCoords(toRotateAndNormalize);

    unordered_set<GridCoord> finalCoordsSet(toRotateAndNormalize.begin(), toRotateAndNormalize.end());

    for (GridCoord& coord: toNormalizeOriginal) {
        if (finalCoordsSet.find(coord) == finalCoordsSet.end()) {
            return false;
        }
    } 

    return true;
}


void ExactCoverGrid::normalizeCoords(vector<GridCoord>& coords) {
    // Set all coords to -inf so the first x coord will always be recorded
    int maxX = numeric_limits<int>::min();
    int maxY = numeric_limits<int>::min();

    // Get the max x and y coordinates
    for (GridCoord& coord: coords) {
        int currX = coord.getX();
        int currY = coord.getY();
        if (currX > maxX) {
            maxX = currX;
        }
        if (currY > maxY) {
            maxY = currY;
        }
    }

    // Normalize all the coordinates
    for (GridCoord& coord: coords) {
        coord.setX(coord.getX() - maxX);
        coord.setY(coord.getY() - maxY);
    }
}


void ExactCoverGrid::rotateCoords(vector<GridCoord>& coords) {
    for (GridCoord& coord: coords) {
        int oldX = coord.getX();
        int oldY = coord.getY();

        coord.setX(-oldY);
        coord.setY(oldX);
    }
}


void ExactCoverGrid::reflectCoordsX(vector<GridCoord>& coords) {
    for (GridCoord& coord: coords) {
        int oldX = coord.getX();

        coord.setX(-oldX);
    }
}


const unordered_map<GridTile*, vector<vector<const GridCoord*>>>& ExactCoverGrid::getInstance() const {
    return instance;
}