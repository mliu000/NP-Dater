#include "Solver.hpp"

using namespace std;

bool Solver::solveDatePuzzleGrid(DateBoard& dbg, ExactCover& ecg) {
    const unordered_map<Coord, bool> coordsFromBoard = dbg.getCoords();
    const Possibilities& poss = ecg.getInstance();
    int fct = dbg.getWidth();

    // Don't even try if the instance is invalid
    if (!validGridInstance(coordsFromBoard, poss)) {
        return false;
    }

    BoardCoords boardCoords(fct * dbg.getHeight(), 0);
    vector<Tile*> tiles;
    for (const auto& it : poss) {
        tiles.push_back(it.first);
    }
    size_t n = tiles.size();
    vector<size_t> tileOrder(n); // Indices into tiles
    iota(tileOrder.begin(), tileOrder.end(), 0);
    vector<size_t> placementIdx(n, 0); // Which placement is being tried for each tile
    vector<vector<vector<const Coord*>>> validPlacementsStack(n); // Valid placements for each tile at each level
    vector<bool> initialized(n, false); // Whether validPlacementsStack[level] is initialized
    vector<Placement> soln;
    size_t level = 0;
    while (true) {
        if (level == n) {
            recordSolution(soln);
            return true;
        }
        // Only compute MRV and valid placements if not initialized at this level
        if (!initialized[level]) {
            size_t minIdx = level;
            size_t minCount = SIZE_MAX;
            vector<vector<const Coord*>> bestValid;
            for (size_t i = level; i < n; i++) {
                const auto& placements = poss.find(tiles[tileOrder[i]])->second;
                vector<vector<const Coord*>> valid;
                for (const auto& coords : placements) {
                    if (validGridTilePlacement(coords, boardCoords, fct)) {
                        valid.push_back(coords);
                    }
                }
                if (valid.size() < minCount) {
                    minCount = valid.size();
                    minIdx = i;
                    bestValid = valid;
                }
                if (minCount == 0) break;
            }
            if (minCount == 0) {
                // Dead end, backtrack
                if (level == 0) break;
                initialized[level] = false;
                placementIdx[level] = 0;
                level--;
                displaceGridTile(soln, boardCoords, fct);
                placementIdx[level]++;
                continue;
            }
            // LCV: Sort placements by how few options they block for remaining tiles
            vector<pair<int, vector<const Coord*>>> lcvPairs;
            for (const auto& coords : bestValid) {
                // Place temporarily
                for (const Coord* coord : coords) {
                    boardCoords[coord->getY() * fct + coord->getX()] = 1;
                }
                // Count total valid placements for remaining tiles
                int total = 0;
                for (size_t j = level + 1; j < n; ++j) {
                    const auto& placements = poss.find(tiles[tileOrder[j]])->second;
                    for (const auto& c : placements) {
                        if (validGridTilePlacement(c, boardCoords, fct)) {
                            total++;
                        }
                    }
                }
                // Unplace
                for (const Coord* coord : coords) {
                    boardCoords[coord->getY() * fct + coord->getX()] = 0;
                }
                lcvPairs.push_back({total, coords});
            }
            // Sort by descending total (least constraining value first)
            sort(lcvPairs.begin(), lcvPairs.end(),
                [](const pair<int, vector<const Coord*>>& a, 
                    const pair<int, vector<const Coord*>>& b) {
                    return a.first > b.first;
                });
            validPlacementsStack[level].clear();
            for (const auto& p : lcvPairs) {
                validPlacementsStack[level].push_back(p.second);
            }
            // Swap the chosen tile to the current level
            swap(tileOrder[level], tileOrder[minIdx]);
            placementIdx[level] = 0;
            initialized[level] = true;
        }
        // Try all valid placements for the current tile at this level
        if (placementIdx[level] < validPlacementsStack[level].size()) {
            const auto& coords = validPlacementsStack[level][placementIdx[level]];
            placeGridTile(tiles[tileOrder[level]], coords, soln, boardCoords, fct);
            ++level;
        } else {
            // No more placements at this level, backtrack
            initialized[level] = false;
            placementIdx[level] = 0;
            if (level == 0) break;
            level--;
            displaceGridTile(soln, boardCoords, fct);
            placementIdx[level]++;
        }
    }
    return false;
}


bool Solver::validGridInstance(const unordered_map<Coord, bool>& coords, const Possibilities& poss) {
    // Get the instances

    // Get the counts for both
    int unblockedCoords = 0;
    int availableTileCoverage = 0;

    for (auto& it: coords) {
        if (!it.second) {
            unblockedCoords++;
        }
    }

    for (auto& it: poss) {
        availableTileCoverage += it.first->getCoords().size();
    }

    return unblockedCoords == availableTileCoverage;
}


bool Solver::validGridTilePlacement(const vector<const Coord*>& coords, BoardCoords& bcg, int fct) {
    for (const Coord* coord: coords) {
        if (bcg[coord->getY() * fct + coord->getX()] == 1) {
            return false;
        }
    }
    
    // Return true if no blocked coords are found
    return true;
}


void Solver::placeGridTile(Tile* gt, const vector<const Coord*>& coords, 
        vector<Placement>& pg, BoardCoords& bcg, int fct) {
    for (const Coord* coord: coords) {
        bcg[coord->getY() * fct + coord->getX()] = 1;
    }

    pg.push_back({gt, &coords});
}


void Solver::displaceGridTile(vector<Placement>& pg, BoardCoords& bcg, int fct) {
    if (pg.empty()) {
        return;
    }

    Placement& latestPlacement = pg.back();
    for (const Coord* coord: *latestPlacement.second) {
        bcg[coord->getY() * fct + coord->getX()] = 0;
    }

    pg.pop_back();
}


void Solver::recordSolution(vector<Placement>& pg) {
    for (Placement p: pg) {
        Tile* currTile = p.first;
        for (const Coord* gc: *p.second) {
            currTile->addToSoln(*gc);
        }
    }
}