#include "Solver.hpp"

using namespace std;

bool Solver::solveDatePuzzleGrid(DateBoardGrid& dbg, ExactCoverGrid& ecg) {
    BoardCoordsGrid boardCoords = dbg.getCoords();
    const PossibilitiesGrid& poss = ecg.getInstance();

    // First, check validity of the solution
    if (!validGridInstance(boardCoords, poss)) {
        return false;
    }

    // Initialize the indices
    vector<pair<GridTile*, int>> indices;
    for (auto& it: poss) {
        indices.push_back({it.first, 0});
    }

    vector<PlacementGrid> soln;

    int i = 0; // Index counter

    while (i >= 0) {
        cout << i << endl;
        if (indices[i].second == static_cast<int>(poss.find(indices[i].first)->second.size())) {
            // Case where we exhaust all the possible placements for the tile.
            indices[i].second = 0;
            displaceGridTile(soln, boardCoords);
            i--;
        } else {
            // Case where we still have possible placements left.
            const vector<const GridCoord*>& currCoords = poss.find(indices[i].first)->second[indices[i].second];
            indices[i].second++;
            if (validGridTilePlacement(currCoords, boardCoords)) {
                placeGridTile(indices[i].first, currCoords, soln, boardCoords);
                i++;
            }
        }
        
        // Finished the algorithm
        if (i == static_cast<int>(indices.size())) {
            recordSolution(soln);
            return true;
        }

    }

    // If algorithm finishes without a soln, then return false;
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