# Compiler and flags
CXX = g++
CXXFLAGS = -std=c++11 -Wall -Wextra

# Executable and object directory
TARGET = main.exe
OBJDIR = ../build

# Source files
MAIN = Main.cpp
COORD = ../model/Coord.cpp
DATEBOARD = ../model/DateBoard.cpp
DATEBOARDGRID = ../model/DateBoardGrid.cpp
TILE = ../model/Tile.cpp
GRIDTILE = ../model/GridTile.cpp
EXACTCOVERGRID = ../model/ExactCoverGrid.cpp
SOLVER = ../model/Solver.cpp
SRC = $(MAIN) $(COORD) $(DATEBOARDGRID) $(DATEBOARD) $(GRIDCOORD) $(TILE) $(GRIDTILE) \
	$(EXACTCOVERGRID) $(SOLVER)

# Get base names like Cell.o, Main.o
OBJ_NAMES = $(notdir $(SRC:.cpp=.o))

# Prefix object files with ../build/
OBJ = $(addprefix $(OBJDIR)/, $(OBJ_NAMES))

# Default rule
all: $(TARGET)

# Link object files into executable
$(TARGET): $(OBJ)
	$(CXX) $(CXXFLAGS) -o $@ $^

# Explicit rules for compiling each .cpp to its corresponding .o
$(OBJDIR)/Main.o: $(MAIN) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/Coord.o: $(COORD) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/DateBoard.o: $(DATEBOARD) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/DateBoardGrid.o: $(DATEBOARDGRID) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/Tile.o: $(TILE) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/GridTile.o: $(GRIDTILE) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/ExactCoverGrid.o: $(EXACTCOVERGRID) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/Solver.o: $(SOLVER) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Create build directory if it doesn't exist
$(OBJDIR):
	mkdir -p $(OBJDIR)

# Clean up
clean:
	rm -f $(TARGET)
	rm -rf $(OBJDIR)

# Test build
TEST_TARGET = test.exe

COORD_TEST = ../test/CoordTest.cpp
GRIDTILE_TEST = ../test/GridTileTest.cpp
DATEBOARDGRID_TEST = ../test/DateBoardGridTest.cpp
EXACTCOVERGRID_TEST = ../test/ExactCoverGridTest.cpp

TEST_SRC = $(COORD_TEST) $(DATEBOARDGRID_TEST) $(GRIDTILE_TEST) $(EXACTCOVERGRID_TEST)
TEST_OBJ = $(OBJDIR)/Coord.o $(OBJDIR)/DateBoard.o $(OBJDIR)/DateBoardGrid.o \
	$(OBJDIR)/Tile.o $(OBJDIR)/GridTile.o $(OBJDIR)/ExactCoverGrid.o $(OBJDIR)/Solver.o

test: $(TEST_TARGET)

$(TEST_TARGET): $(TEST_SRC) $(TEST_OBJ)
	@echo "Building test.exe..."
	$(CXX) $(CXXFLAGS) $^ -o $(TEST_TARGET)
	./$(TEST_TARGET)