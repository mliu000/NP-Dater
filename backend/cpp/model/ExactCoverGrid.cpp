#include "ExactCoverGrid.hpp"

using namespace std;

// Constructor
ExactCoverGrid::ExactCoverGrid(DateBoard& dbg, unordered_map<string, Tile*>& gt) {
    createInstance(dbg, gt);
}


void ExactCoverGrid::createInstance(DateBoard& dbg, unordered_map<string, Tile*>& gt) {
    int width = dbg.getWidth();
    int height = dbg.getHeight();

    // Iterate through all the GridTiles: O(m)
    for (auto &it: gt) { 
        vector<vector<const Coord*>> outer;

        // Check the symmetry of the tiles and whether or not reflection is required: O(n)
        int symm = it.second->checkSymmetry();
        int reflect = it.second->needsReflection();

        // Iterate through all possible tile placements via the reference points: O(n)
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {

                // Iterate through all possible reflections if needed: O(1)
                for (int f = 0; f < reflect; f++) {

                    // Iterate through all possible rotations (4 possible rotations): O(1)
                    for (int r = 0; r < symm; r++) {
                        bool valid = true;
                        vector<const Coord*> inner;

                        // Iterate over all all the coords the tile covers relative to reference: O(n/m)
                        for (const Coord& coord: it.second->getCoords()) {
                            int currX = x + coord.getX();
                            int currY = y + coord.getY();
                            if (validPlacement(currX, currY, dbg)) {
                                inner.push_back(&dbg.getCoords().find(Coord(currX, currY))->first);
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

                    it.second->flip(); // O(n) worst case
                }

                for (int k = reflect; k < 2; k++) {
                    it.second->flip(); // O(n) worst case
                }
                
            }
        }

        instance.insert({it.second, outer});
    }
}


bool ExactCoverGrid::validPlacement(int x, int y, DateBoard& dbg) {
    bool withinX = x >= 0 && x < dbg.getWidth();
    bool withinY = y >= 0 && y < dbg.getHeight();

    // Make sure that lookup is only attempted if x and y are in bounds
    if (!(withinX && withinY)) {
        return false;
    }

    const unordered_map<Coord, bool>& coords = dbg.getCoords();
    auto it = coords.find(Coord(x, y));

    return it != coords.end() && !it->second;
}


const unordered_map<Tile*, vector<vector<const Coord*>>>& ExactCoverGrid::getInstance() const {
    return instance;
}