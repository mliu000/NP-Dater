#include "../model/DateBoardGrid.hpp"
#include "../model/DateBoardHex.hpp"
#include "../model/Coord.hpp" 
#include "../model/GridTile.hpp"
#include "../model/HexTile.hpp"
#include "../model/ExactCover.hpp"
#include "../model/Solver.hpp"
#include  "../utility/json.hpp"
using json = nlohmann::json;

#include <iostream>
#include <string>
#include <sstream>
#include <unordered_map>
#include <chrono>

using namespace std;
using namespace std::chrono;

int main() {

    try {
        // Create the buffer, and wait for the input from express.js
        stringstream buffer;
        buffer << cin.rdbuf();

        // Convert it to a valid json format.
        json j = json::parse(buffer.str());

        // Extract the json input and convert it into objects
        // j["inputType"] = 0 = Grid, 1 = Hex
        int type = j["inputType"];
        DateBoard* db = nullptr;
        if (type == 0) {
            // Grid
            int width = j["width"];
            int height = j["height"];
            db = new DateBoardGrid(width, height);
        } else {
            // Hex
            int radius = j["radius"];
            db = new DateBoardHex(radius);
        }

        for (const auto& blockedCoord: j["blocked"]) {
            int x = blockedCoord["x"];
            int y = blockedCoord["y"];
            db->blockCoordinate(x, y);
        }

        // Iterate through the tiles and create them
        unordered_map<string, Tile*> tiles;
        for (const auto& tileJson: j["tiles"]) {
            string id = tileJson["id"];
            vector<Coord> coords;
            for (const auto& coordJson: tileJson["coords"]) {
                int x = coordJson["x"];
                int y = coordJson["y"];
                coords.push_back(Coord(x, y));
            }
            if (type == 0) {
                tiles.insert({id, new GridTile(id, coords)});
            } else {
                tiles.insert({id, new HexTile(id, coords)});
            }
        }

        // Create the exact cover instance, solve and record time taken to solve
        ExactCover ecg(*db, tiles);
        auto start = high_resolution_clock::now();
        bool valid = Solver::solveDatePuzzle(*db, ecg);
        auto end = high_resolution_clock::now();
        auto duration = duration_cast<milliseconds>(end - start);

        if (!valid) {
            cerr << "No solution found." << endl;
            return 3;
        }

        // Convert solution back to json format
        json returnJson = json::object();
        returnJson["tiles"] = json::array();
        for (const auto& tile: tiles) {
            json tileJson = *tile.second;
            returnJson["tiles"].push_back(tileJson);
        }
        returnJson["timeToSolve"] = duration.count();

        // Output the result so the express.js can read it
        cout << returnJson.dump(4) << endl;

        // In the end, delete the dynamically allocated memory
        delete db;
        for (const auto& tile: tiles) {
            delete tile.second;
        }

    } catch (const json::parse_error& e) {
        cerr << "JSON parsing error: " << e.what() << endl;
        return 1;
    } catch (const exception& e) {
        cerr << "Unhandled error: " << e.what() << endl;
        return 2;
    }
    
    return 0;
}