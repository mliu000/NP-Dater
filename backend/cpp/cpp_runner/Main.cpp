#include "../model/DateBoardGrid.hpp"
#include "../model/GridCoord.hpp" 

#include <iostream>
#include <string>
#include <unordered_map>


using namespace std;

int main() {
    DateBoardGrid* d = new DateBoardGrid(10, 15);
    d->blockCoordinate(0, 0);

    json j = *d;
    cout << j.dump(4) << endl;

    delete d;
    
    return 0;
}