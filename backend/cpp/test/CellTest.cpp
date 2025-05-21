#define CATCH_CONFIG_MAIN
#include "../utility/Catch.hpp"
#include "../model/Cell.hpp"

#include <iostream>

using namespace std;

TEST_CASE("Test") {
    REQUIRE(3 == 3);
}

TEST_CASE("2") {
    REQUIRE(2 == 2);
}

TEST_CASE("3") {
    REQUIRE(1 == 1);
}