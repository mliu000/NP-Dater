# Compiler and flags
CXX = g++
CXXFLAGS = -std=c++11 -Wall -Wextra

# Executable and object directory
TARGET = main.exe
OBJDIR = ../build

# Source files
SRC = Main.cpp Solver.cpp ../model/Cell.cpp ../model/DateBoardGrid.cpp

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
$(OBJDIR)/Main.o: Main.cpp | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/Solver.o: Solver.cpp | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/Cell.o: ../model/Cell.cpp | $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJDIR)/DateBoardGrid.o: ../model/DateBoardGrid.cpp | $(OBJDIR)
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
TEST_SRC = ../test/CellTest.cpp ../test/DateBoardGridTest.cpp
TEST_OBJ = $(OBJDIR)/Cell.o $(OBJDIR)/DateBoardGrid.o

test: $(TEST_TARGET)

$(TEST_TARGET): $(TEST_SRC) $(TEST_OBJ)
	@echo "Building test.exe..."
	$(CXX) $(CXXFLAGS) $^ -o $(TEST_TARGET)
	./$(TEST_TARGET)