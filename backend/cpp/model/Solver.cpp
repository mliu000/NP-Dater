#include "Solver.hpp"

using namespace std;

bool Solver::solveDatePuzzleGrid(DateBoardGrid& dbg, ExactCoverGrid& ecg) {
    BoardCoordsGrid boardCoords = dbg.getCoords();
    const PossibilitiesGrid& poss = ecg.getInstance();

    if (!validGridInstance(boardCoords, poss)) {
        return false;
    }

    // Prepare a list of tiles to place
    vector<GridTile*> tiles;
    for (const auto& it : poss) {
        tiles.push_back(it.first);
    }

    vector<PlacementGrid> soln;
    return solveDatePuzzleGridMRV(boardCoords, poss, tiles, soln);
}

// Helper function for MRV-based recursive backtracking
bool Solver::solveDatePuzzleGridMRV(BoardCoordsGrid& boardCoords, const PossibilitiesGrid& poss, 
    vector<GridTile*>& tiles, vector<PlacementGrid>& soln) {
    if (tiles.empty()) {
        recordSolution(soln);
        return true;
    }

    // MRV: Find the tile with the fewest valid placements
    int minIdx = -1;
    size_t minCount = SIZE_MAX;
    vector<vector<const GridCoord*>> validPlacements;
    for (size_t i = 0; i < tiles.size(); ++i) {
        const auto& placements = poss.find(tiles[i])->second;
        vector<vector<const GridCoord*>> valid;
        for (const auto& coords : placements) {
            if (validGridTilePlacement(coords, boardCoords)) {
                valid.push_back(coords);
            }
        }
        if (valid.size() < minCount) {
            minCount = valid.size();
            minIdx = static_cast<int>(i);
            validPlacements = valid;
        }
        if (minCount == 0) break; // Early exit if any tile has no valid placements
    }
    if (minCount == 0) return false; // Dead end

    // Try all valid placements for the most constrained tile
    GridTile* tile = tiles[minIdx];
    // Remove tile from list for recursion
    tiles.erase(tiles.begin() + minIdx);
    for (const auto& coords : validPlacements) {
        placeGridTile(tile, coords, soln, boardCoords);
        if (solveDatePuzzleGridMRV(boardCoords, poss, tiles, soln)) {
            return true;
        }
        displaceGridTile(soln, boardCoords);
    }
    // Restore tile to list
    tiles.insert(tiles.begin() + minIdx, tile);
    return false;
}


bool Solver::validGridInstance(const BoardCoordsGrid& coords, const PossibilitiesGrid& poss) {
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


bool Solver::validGridTilePlacement(const vector<const GridCoord*>& coords, BoardCoordsGrid& bcg) {
    for (const GridCoord* coord: coords) {
        if (bcg[*coord]) {
            return false;
        }
    }
    
    // Return true if no blocked coords are found
    return true;
}


void Solver::placeGridTile(GridTile* gt, const vector<const GridCoord*>& coords, 
        vector<PlacementGrid>& pg, BoardCoordsGrid& bcg) {
    for (const GridCoord* coord: coords) {
        bcg[*coord] = true;
    }

    pg.push_back({gt, &coords});
}


void Solver::displaceGridTile(vector<PlacementGrid>& pg, BoardCoordsGrid& bcg) {
    if (pg.empty()) {
        return;
    }

    PlacementGrid& latestPlacement = pg.back();
    for (const GridCoord* coord: *latestPlacement.second) {
        bcg[*coord] = false;
    }

    pg.pop_back();
}


void Solver::recordSolution(vector<PlacementGrid>& pg) {
    for (PlacementGrid p: pg) {
        GridTile* currTile = p.first;
        for (const GridCoord* gc: *p.second) {
            currTile->addToSoln(*gc);
        }
    }
}