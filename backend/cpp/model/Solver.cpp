#include "Solver.hpp"

using namespace std;

bool Solver::solveDatePuzzle(DateBoard& dbg, ExactCover& ecg) {
    const unordered_map<Coord, bool> coordsFromBoard = dbg.getCoords();
    const Possibilities& poss = ecg.getInstance();
    int fct = dbg.getWidth();

    int radius = dynamic_cast<DateBoardHex*>(&dbg) ? dynamic_cast<DateBoardHex*>(&dbg)->getRadius() : 0;

    // Don't even try if the instance is invalid
    if (!validInstance(coordsFromBoard, poss)) {
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
                    if (validTilePlacement(coords, boardCoords, fct, radius)) {
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
                displaceTile(soln, boardCoords, fct, radius);
                placementIdx[level]++;
                continue;
            }
            validPlacementsStack[level] = bestValid;
            // Swap the chosen tile to the current level
            swap(tileOrder[level], tileOrder[minIdx]);
            placementIdx[level] = 0;
            initialized[level] = true;
        }
        // Try all valid placements for the current tile at this level
        if (placementIdx[level] < validPlacementsStack[level].size()) {
            const auto& coords = validPlacementsStack[level][placementIdx[level]];
            placeTile(tiles[tileOrder[level]], coords, soln, boardCoords, fct, radius);
            level++;
        } else {
            // No more placements at this level, backtrack
            initialized[level] = false;
            placementIdx[level] = 0;
            if (level == 0) break;
            level--;
            displaceTile(soln, boardCoords, fct, radius);
            placementIdx[level]++;
        }
    }
    return false;
}


bool Solver::validInstance(const unordered_map<Coord, bool>& coords, const Possibilities& poss) {
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


bool Solver::validTilePlacement(const vector<const Coord*>& coords, BoardCoords& bcg, int fct, int radius) {
    for (const Coord* coord: coords) {
        if (bcg[(coord->getY() + radius) * fct + (coord->getX() + radius)]) {
            return false;
        }
    }
    return true;
}


void Solver::placeTile(Tile* gt, const vector<const Coord*>& coords, 
        vector<Placement>& pg, BoardCoords& bcg, int fct, int radius) {
    for (const Coord* coord: coords) {
        bcg[(coord->getY() + radius) * fct + (coord->getX() + radius)] = 1;
    }
    pg.push_back({gt, &coords});
}


void Solver::displaceTile(vector<Placement>& pg, BoardCoords& bcg, int fct, int radius) {
    if (pg.empty()) {
        return;
    }
    Placement& latestPlacement = pg.back();
    for (const Coord* coord: *latestPlacement.second) {
        bcg[(coord->getY() + radius) * fct + (coord->getX() + radius)] = 0;
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