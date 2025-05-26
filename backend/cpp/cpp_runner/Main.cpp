#include "../model/DateBoardGrid.hpp"
#include "../model/GridCoord.hpp" 

#include <iostream>
#include <string>
#include <sstream>
#include <unordered_map>


using namespace std;

int main() {

    try {
        // Create the buffer, and wait for the input from express.js
        stringstream buffer;
        buffer << cin.rdbuf();

        // Convert it to a valid json format.
        json j = json::parse(buffer.str());

        if (j.contains("x") && j.contains("y")) {
            int x = j["x"];
            int y = j["y"];

            DateBoardGrid d(x, y);

            json j = d;

            json output = json::array();
            output.push_back(j);

            cout << output.dump() << endl;
        }
    } catch (const json::parse_error& e) {
        std::cerr << "JSON parsing error: " << e.what() << std::endl;
        return 1;
    } catch (const exception& e) {
        std::cerr << "Unhandled error: " << e.what() << std::endl;
        return 1;
    }

    
    return 0;
}