cmake_minimum_required(VERSION 3.14)
project(date_puzzle_solver)

set(CMAKE_CXX_STANDARD 17)

# Include headers
include_directories(include)

# Crow via FetchContent
include(FetchContent)
FetchContent_Declare(
  crow
  GIT_REPOSITORY https://github.com/CrowCpp/Crow.git
  GIT_TAG v1.0+2
)
FetchContent_MakeAvailable(crow)

# Add your source files
add_executable(solver
  src/main.cpp
  src/solver.cpp
)

# Link Crow
target_link_libraries(solver PRIVATE Crow::Crow)

# Link Windows-specific socket libraries
if (WIN32)
  target_link_libraries(solver PRIVATE ws2_32 mswsock)
endif()