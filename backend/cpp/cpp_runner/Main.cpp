#include "../model/DateBoardGrid.hpp"
#include "../model/GridCoord.hpp" 

#include <iostream>
#include <string>
#include <unordered_set>


using namespace std;

int main() {
    DateBoardGrid* d = new DateBoardGrid(10, 15);

    unordered_set<GridCoord>& coords = d->getCoords();
    auto it = coords.find(GridCoord(0, 0, false, ""));
    GridCoord copy = *it;
    coords.erase(it);
    copy.setSpecialAttribute("May");
    coords.insert(copy);

    json j = *d;

    cout << j.dump(4) << endl;

    delete d;
    
    return 0;
}