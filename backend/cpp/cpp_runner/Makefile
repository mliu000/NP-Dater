# Detect OS
ifeq ($(OS),Windows_NT)
    EXE_EXT = .exe
    RM = del /q
    RMDIR = if exist $(OBJDIR) rmdir /s /q $(OBJDIR)
    MKDIR = if not exist $(OBJDIR) mkdir $(OBJDIR)
	OBJDIR = ../build
else
    EXE_EXT =
    RM = rm -f
    RMDIR = rm -rf $(OBJDIR)
    MKDIR = mkdir -p $(OBJDIR)
	OBJDIR = ../build_mac_linux
endif

# Compiler and flags
CXX = g++
CXXFLAGS = -std=c++11 -Wall -Wextra -g

# Executable and object directory
TARGET = main$(EXE_EXT)

# Source files
MAIN = Main.cpp
COORD = ../model/Coord.cpp
DATEBOARD = ../model/DateBoard.cpp
DATEBOARDGRID = ../model/DateBoardGrid.cpp
DATEBOARDHEX = ../model/DateBoardHex.cpp
TILE = ../model/Tile.cpp
HEXTILE = ../model/HexTile.cpp
GRIDTILE = ../model/GridTile.cpp
EXACTCOVER = ../model/ExactCover.cpp
SOLVER = ../model/Solver.cpp
SRC = $(MAIN) $(COORD) $(DATEBOARDGRID) $(DATEBOARDHEX) $(DATEBOARD) $(GRIDCOORD) $(TILE) \
	$(GRIDTILE) $(HEXTILE) $(EXACTCOVER) $(SOLVER)

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

$(OBJDIR)/DateBoardHex.o: $(DATEBOARDHEX) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/Tile.o: $(TILE) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/GridTile.o: $(GRIDTILE) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/HexTile.o: $(HEXTILE) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/ExactCover.o: $(EXACTCOVER) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/Solver.o: $(SOLVER) | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Create build directory if it doesn't exist
$(OBJDIR):
	mkdir -p $(OBJDIR)

# Clean up
clean:
	del /q $(TARGET) $(TEST_TARGET) 2>nul || exit 0
	if exist $(OBJDIR) rmdir /s /q $(OBJDIR)

# Test build
TEST_TARGET = test$(EXE_EXT)

COORD_TEST = ../test/CoordTest.cpp
TILE_TEST = ../test/TileTest.cpp
DATEBOARD_TEST = ../test/DateBoardTest.cpp
EXACTCOVER_TEST = ../test/ExactCoverTest.cpp

TEST_SRC = $(COORD_TEST) $(DATEBOARD_TEST) $(TILE_TEST) $(EXACTCOVER_TEST)
TEST_OBJ = $(OBJDIR)/Coord.o $(OBJDIR)/DateBoard.o $(OBJDIR)/DateBoardGrid.o $(OBJDIR)/DateBoardHex.o \
	$(OBJDIR)/Tile.o $(OBJDIR)/GridTile.o $(OBJDIR)/HexTile.o $(OBJDIR)/ExactCover.o \
	$(OBJDIR)/Solver.o

test: $(TEST_TARGET)

$(TEST_TARGET): $(TEST_SRC) $(TEST_OBJ)
	@echo "Building test.exe..."
	$(CXX) $(CXXFLAGS) $^ -o $(TEST_TARGET)