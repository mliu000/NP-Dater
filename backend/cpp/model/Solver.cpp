#include "Solver.hpp"

using namespace std;

bool TileInfo::TileInfoComparator::operator()(const TileInfo* a, const TileInfo* b) const {
    // Compare based on the size of the domain
    return a->domain.size() > b->domain.size() || 
        (a->domain.size() == b->domain.size() && a->placementIndex >= b->placementIndex);
}

bool Solver::solveDatePuzzle(DateBoard& dbg, ExactCover& ecg) {
    // Check if instance is valid. If not, then return false without attempting to solve
    if (!validInstance(dbg.getCoords(), ecg.getInstance())) {
        return false;
    }

    // Start by instantiating all required variable values
    int rad = dynamic_cast<DateBoardHex*>(&dbg) ? dynamic_cast<DateBoardHex*>(&dbg)->getRadius() : 0;
    int fct = dbg.getWidth();

    // Instantiate all required data structures
    bitset<MAX_COORDS> bsb = boardToBitset(dbg, rad);
    vector<pair<TileInfo*, int>> soln;
    vector<TileInfo*> vti;
    convertExactCoverToTileInfo(ecg, vti, rad, fct);
    vector<vector<pair<TileInfo*, int>>> removalStack;

    // Simply a copy for deallocation purposes later
    vector<TileInfo*> cpy = vti;

    // Start solving using backtracking with MRV and forward checking heuristic
    while (!vti.empty()) {

        // MRV: Pick via linear scan
        TileInfo* ti = vti[0];
        for (int i = 1; i < static_cast<int>(vti.size()); i++) {
            // If the sizes are the same, use id determinism
            if (vti[i]->domain.size() < ti->domain.size() || 
                (vti[i]->domain.size() == ti->domain.size() && vti[i]->id < ti->id)) {
                ti = vti[i];
            }
        }

        /* Forward checking: If any of the tiles have no valid placements left, then backtrack.
        cascade if needed */
        bool backtrack = false;
        while (ti->domain.empty() || ti->placementIndex >= static_cast<int>(ti->domain.size())) {
            backtrack = true;
            if (soln.empty()) {
                deallocateTileInfoPointers(cpy);
                return false;
            }
            ti->placementIndex = 0; 
            // Undo the last placement, and return update the pointer to point to the undone Tile
            ti = undoLastPlacement(bsb, vti, soln, removalStack); 

        }

        // MRV: Start by placing the tile with the minimum number of valid placements
        // Iterate through the placements to try to place at valid placement
        if (!backtrack) {
            bool pcmFound = false;
            while (ti->placementIndex < static_cast<int>(ti->domain.size())) {
                int domainIdx = ti->domain[ti->placementIndex];
                bitset<MAX_COORDS>& pcm = ti->placements[domainIdx]; 
                // Check if the placement is valid
                ti->placementIndex++; 
                if ((bsb & pcm).none()) {
                    bsb |= pcm; 
                    soln.push_back({ti, domainIdx});
                    vti.erase(find(vti.begin(), vti.end(), ti));
                    pcmFound = true;
                    break;
                } 
            }
            if (!pcmFound) {
                // If we exhausted all placements without finding a valid one, we need to backtrack
                continue;
            }

            // MRV: Update the priority queue of the most recent tile placements
            removalStack.push_back({});
            for (TileInfo* currTi : vti) {
                vector<int> newDomain;
                for (int i: currTi->domain) {
                    if ((bsb & currTi->placements[i]).none()) {
                        newDomain.push_back(i);
                    } else {
                        // If the placement is not valid, we need to remove it from the domain
                        removalStack.back().push_back({currTi, i});
                    }
                }
                currTi->domain.swap(newDomain);
            }
        }
        
        
    }

    // The priority queue is empty, meaning we have found a solution
    recordSolution(soln, rad, fct);
    deallocateTileInfoPointers(cpy);
    return true;
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


bitset<MAX_COORDS> Solver::boardToBitset(DateBoard& dbg, int rad) {
    bitset<MAX_COORDS> bs;
    for (const auto& it : dbg.getCoords()) {
        if (it.second) {
            bs.set((it.first.getY() + rad) * dbg.getWidth() + (it.first.getX() + rad));
        }
    }
    return bs;
}


void Solver::convertExactCoverToTileInfo(ExactCover& ecg, vector<TileInfo*>& vti, int rad, int fct) {
    uint8_t indexId = 0;
    for (const auto& it : ecg.getInstance()) {
        // For each Tile, create a bitset for each placement
        Tile* tile = it.first;
        vector<bitset<MAX_COORDS>> placements;
        for (const vector<const Coord*>& coords : it.second) {
            bitset<MAX_COORDS> pbs;
            for (const Coord* coord : coords) {
                pbs.set((coord->getY() + rad) * fct + (coord->getX() + rad));
            }
            placements.push_back(pbs);
        }

        vector<int> domain;
        for (size_t i = 0; i < placements.size(); i++) {
            domain.push_back(static_cast<int>(i));
        }

        // Add the TileInfo to the priority queue
        TileInfo* ti = new TileInfo;
        ti->tile = tile;
        ti->id = indexId;
        ti->placementIndex = 0;
        ti->placements = placements;
        ti->domain = domain;
        vti.push_back(ti);
        indexId++;
    }
}

TileInfo* Solver::undoLastPlacement(bitset<MAX_COORDS>& bsb, vector<TileInfo*>& vti, 
        vector<pair<TileInfo*, int>>& soln, vector<vector<pair<TileInfo*, int>>>& rms){
    // Get the last placement + index and then remove it from the soln.
    pair<TileInfo*, int> lastPlacement = soln.back();
    soln.pop_back();

    // "Unpaste" the last placement from the board bitset
    bsb &= ~lastPlacement.first->placements[lastPlacement.second];
    
    // Add the last placement back to the vector of unplaced tiles
    vti.push_back(lastPlacement.first);

    // Update the domain of the TileInfo from removal stack
    vector <pair<TileInfo*, int>>& lastRemoval = rms.back();
    for (const pair<TileInfo*, int>& p : lastRemoval) {
        int idx = p.second;
        p.first->domain.push_back(idx);
    }
    rms.pop_back();

    return lastPlacement.first; // Return the TileInfo that was undone
}

void Solver::recordSolution(const vector<pair<TileInfo*, int>>& soln, int rad, int fct) {
    for (const pair<TileInfo*, int>& p : soln) {
        Tile* tile = p.first->tile;
        bitset<MAX_COORDS>& placement = p.first->placements[p.second];
        for (int i = 0; i < MAX_COORDS; i++) {
            if (placement.test(i)) {
                int x = (i % fct) - rad;
                int y = (i / fct) - rad;
                tile->addToSoln(Coord(x, y));
            }
        }
    }
}

void Solver::deallocateTileInfoPointers(vector<TileInfo*>& vti) {
    for (TileInfo* ti : vti) {
        delete ti;
    }
    vti.clear();
}