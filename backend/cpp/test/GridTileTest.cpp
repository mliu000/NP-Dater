#include "../utility/Catch.hpp"
#include "../model/GridTile.hpp"
#include "../model/Coord.hpp"
#include "../model/GridCoord.hpp"

#include <iostream>
#include <unordered_map>

using namespace std;

TEST_CASE("GridTile constructor test") {
    Coord* g1 = new GridCoord(0, 0);

    delete g1;

    Tile* t2 = new GridTile("245", vector<GridCoord>());

    delete t2;

}