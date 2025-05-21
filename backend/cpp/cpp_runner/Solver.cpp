#include <iostream>
#include  "../utility/json.hpp"
using json = nlohmann::json;
using namespace std;

/* 
Mu Ye Liu - May 2025

Represents the 
*/
class Result {
public:
    int score;
    string status;

    Result(int s, string st) : score(s), status(st) {

    }
};

// Let the library know how to convert your class to JSON
void to_json(json& j, const Result& r) {
    j = json{{"score", r.score}, {"status", r.status}};
}