#include <iostream>
#include <string>
using namespace std;

void reverse(const string& input) {
    cout << string(input.rbegin(), input.rend()) << endl;
}

void countDigits(const string& input) {
    int count = 0;
    for (char c : input) {
        if (isdigit(c)) count++;
    }
    cout << count << endl;
}

int main(int argc, char* argv[]) {
    if (argc < 3) {
        cerr << "Usage: solver <function> <input>" << endl;
        return 1;
    }

    string func = argv[1];
    string input = argv[2];

    if (func == "reverse") {
        reverse(input);
    } else if (func == "countDigits") {
        countDigits(input);
    } else {
        cerr << "Unknown function: " << func << endl;
        return 1;
    }

    return 0;
}