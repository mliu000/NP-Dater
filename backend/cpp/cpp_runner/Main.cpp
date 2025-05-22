#include "../model/DateBoardGrid.hpp"
#include "../model/Cell.hpp" 

#include <iostream>
#include <string>

using namespace std;

int main() {
    DateBoardGrid* d = new DateBoardGrid(10, 15);

    vector<vector<Cell>>& grid = d->getCells();
    grid[0][0].setSpecialAttribute("Jun");

    json j = *d;

    cout << j.dump(4) << endl;

    delete d;
    
    return 0;
}