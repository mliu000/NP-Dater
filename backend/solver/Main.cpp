#include <iostream>
#include <string>
#include "Solver.cpp"
using namespace std;

int main(int argc, char* argv[]) {
    Result result(42, "solved");
    json j = result;
    cout << j.dump() << endl; // stdout output for Node.js

    return 0;
}