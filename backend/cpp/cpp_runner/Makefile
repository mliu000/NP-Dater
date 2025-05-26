# Compiler and flags
CXX = g++
CXXFLAGS = -std=c++11 -Wall -Wextra

# Executable and object directory
TARGET = main.exe
OBJDIR = ../build

# Source files
MAIN = Main.cpp
COORD = ../model/Coord.cpp
DATEBOARDGRID = ../model/DateBoardGrid.cpp
GRIDCOORD = ../model/GridCoord.cpp
TILE = ../model/Tile.cpp
GRIDTILE = ../model/GridTile.cpp
SRC = $(MAIN) $(COORD) $(DATEBOARDGRID) $(GRIDCOORD) $(TILE) $(GRIDTILE)

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

$(OBJDIR)/DateBoardGrid.o: $(DATEBOARDGRID) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/GridCoord.o: $(GRIDCOORD) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/Tile.o: $(TILE) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/GridTile.o: $(GRIDTILE) | $(OBJDIR)
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

GRIDCOORD_TEST = ../test/GridCoordTest.cpp
GRIDTILE_TEST = ../test/GridTileTest.cpp
DATEBOARDGRID_TEST = ../test/DateBoardGridTest.cpp

TEST_SRC = $(GRIDCOORD_TEST) $(DATEBOARDGRID_TEST) $(GRIDTILE_TEST)
TEST_OBJ = $(OBJDIR)/GridCoord.o $(OBJDIR)/Coord.o $(OBJDIR)/DateBoardGrid.o $(OBJDIR)/Tile.o $(OBJDIR)/GridTile.o

test: $(TEST_TARGET)

$(TEST_TARGET): $(TEST_SRC) $(TEST_OBJ)
	@echo "Building test.exe..."
	$(CXX) $(CXXFLAGS) $^ -o $(TEST_TARGET)
	./$(TEST_TARGET)