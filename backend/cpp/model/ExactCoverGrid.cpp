#include "ExactCoverGrid.hpp"

using namespace std;

// Constructor
ExactCoverGrid::ExactCoverGrid(DateBoardGrid& dbg, unordered_map<string, GridTile*>& gt) {
    createInstance(dbg, gt);
}

void ExactCoverGrid::createInstance(DateBoardGrid& dbg, unordered_map<string, GridTile*>& gt) {
    int width = dbg.getWidth();
    int height = dbg.getHeight();

    // Iterate through all the GridTiles: O(k)
    for (auto it = gt.begin(); it != gt.end(); it++) { 
        vector<vector<const GridCoord*>> outer;

        // Iterate through all possible tile placements via the reference points: O(n)
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {

                // Iterate through all possible rotations (4 possible rotations): O(1)
                for (int r = 0; r < 4; r++) {
                    bool valid = true;
                    vector<const GridCoord*> inner;

                    // Iterate over all all the coords the tile covers relative to reference: O(n/k)
                    for (const GridCoord& coord: it->second->getCoords()) {
                        if (validPlacement(x + coord.getX(), y + coord.getY(), dbg)) {
                            inner.push_back(&coord);
                        } else {
                            valid = false;
                            break;
                        }
                    }

                    if (valid) {
                        outer.push_back(inner);
                    }
                    it->second->rotateClockwise();
                }
            }
        }

        instance.insert({it->second, outer});
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

const unordered_map<GridTile*, vector<vector<const GridCoord*>>>& ExactCoverGrid::getInstance() const {
    return instance;
}

void ExactCoverGrid::solve(ExactCoverGrid ecgInstance) {
    // TODO
}