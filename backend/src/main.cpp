#include "crow.h"
#include "solver.hpp"

using namespace std;

int main() {
    crow::SimpleApp app;

    CROW_ROUTE(app, "/solve").methods("POST"_method)
    ([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body) return crow::response(400, "Invalid JSON");

        string input = body["input"].s();
        string solution = solve_puzzle(input);

        crow::json::wvalue result;
        result["solution"] = solution;
        return crow::response(result);
    });

    app.port(8080).multithreaded().run();
}