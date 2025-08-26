import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../css/InstructionsPage.css";

/*
Mu Ye Liu - June 2025

Represents the instructions page for displaying instructions
*/

function RenderNavigationButtons() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="typical-button"
        style={{
          position: "absolute",
          right: "2%",
          bottom: "2%",
          width: "25%",
          height: "8%",
          margin: "0",
        }}
        onClick={() => navigate("/front-page")}
      >
        Back to Front Page
      </button>
      <button
        className="typical-button"
        style={{
          position: "absolute",
          right: "2%",
          bottom: "12%",
          width: "20%",
          height: "8%",
          margin: "0",
        }}
        onClick={() => navigate("/main-page")}
      >
        Get Started
      </button>
    </>
  );
}

function RenderInstructions() {
  return (
    <div className="instructions-page">
      <h1>How To Use NP-Dater</h1>
      <p>
        Welcome to NP-Dater. If you are struggling relentlessly on trying to
        solve a date puzzle, this application will get the job done for you!
      </p>

      <h2>Getting Started</h2>
      <p>-Right when you enter your application, you will be given 2 options:</p>
      <ul>
        <li>
          <p>Choose existing puzzle</p>
        </li>
        <li>
          <p>Create new puzzle</p>
        </li>
      </ul>
      <p>
        -Since you don't have any saved puzzles yet, choose the "Create new
        puzzle" option.
      </p>
      <br />
      <p>-Choose between grid or hexagonal puzzle shapes.</p>
      <br />
      <p>
        -Choose the attributes (day of week, day of month, month) you want to
        include and solve for in your puzzle.
      </p>
      <br />
      <p>-For grid puzzles, choose the width and height of the grid.</p>
      <br />
      <p>-For hex puzzles, choose the radius of the hexagons.</p>
      <br />
      <p>
        -For the hex option, you will also be asked to choose the orientation of
        the hexagons.
      </p>
      <br />

      <p>Flat top:</p>
      <img
        src="/instructionImages/InstructionsFlatTop.png"
        alt="Flat top hexagon"
        style={{ width: "30%", border: "0.1vw solid black" }}
      />
      <br />

      <p>Pointy top:</p>
      <img
        src="/instructionImages/InstructionsPointyTop.png"
        alt="Pointy top hexagon"
        style={{ width: "30%", border: "0.1vw solid black" }}
      />
      <br />

      <p>
        -Once you are done, click "Start". If you get a message saying the
        username is taken, then it is already in the database, and you will need
        to try a new name.
      </p>

      <h2>Setting Up your puzzle</h2>
      <h3>Adding and modifying tiles</h3>
      <p>
        -To add a new tile, click on the "New Tile" button. Note that up to 12
        tiles can be added to the puzzle. You will be given a default tile that
        only covers one cell. To modify the tile, click on the tile window.
      </p>
      <br />
      <p>-You will be greeted with a popup that contains another copy of your board configuration.</p>
      <br />
      <p>
        -To change the shape of your tile, click on cells that you want to add
        to the tile. Click on already selected cell to remove it from the tile.
        Note that the middle cell is always included, and cannot be removed.
        Make sure the tile is connected, or else you will get an error.
      </p>
      <br />
      <p>
        -To change the colour of the tile, click on the colour picker on the top
        left to select a new colour.
      </p>
      <br />
      <p>-You can also delete the tile by clicking on the "Delete Tile" button.</p>
      <br />
      <img
        src="/instructionImages/InstructionsEditTile.png"
        alt="Tile instructions"
        style={{ width: "30%", border: "0.1vw solid black" }}
      />

      <h3>Editing Board</h3>
      <p>
        -To add attributes to your board, click on any coordinate. The selected
        coord will appear in yellow. On the right, you will be given a popup. To
        add an attribute, select it from the dropdown menu and click "Set".
      </p>
      <br />
      <p>{'-To remove an attribute, select "<No Attribute>" from the dropdown menu and click "Set".'}</p>
      <br />
      <p>
        -Note that only one attribute can be set for each coordinate, and each
        attribute can only be set once, mimicking a real date puzzle. Not all
        dates need to be set, but if you try to solve for that date, you will
        get an error.
      </p>
      <br />
      <img
        src="/instructionImages/InstructionsBoardSetAttribute.png"
        alt="Board instructions"
        style={{ width: "60%", border: "0.1vw solid black" }}
      />
      <br />
      <p>
        -If your puzzle isn't a perfect square/rectangle, or is irregularly
        shaped, you may choose to block certain cells. These cells will appear
        in black, and will not be considered when solving. To unblock, simply
        click on the blocked cell again, and click "Unblock" in the right side
        popup.
      </p>
      <br />
      <img
        src="/instructionImages/InstructionsBoardBlocked.png"
        alt="Blocked cells"
        style={{ width: "60%", border: "0.1vw solid black" }}
      />
      <br />

      <h2>Solving the puzzle</h2>
      <p>
        -Once you are done setting up your puzzle, click "Save" to save your
        puzzle and then try to solve it. If you get an error, then you will have
        to go back and correct your setup. You need at least 3 tiles, and the 2
        numbers at the bottom to match up. The top number tells you the amount
        of cells the tiles cover, and the bottom number tells you the amount of
        cells that need to be covered (minus the attributes you are solving
        for).
      </p>
      <br />
      <img
        src="/instructionImages/InstructionsNumMatch.png"
        alt="Solve instructions numbers match"
        style={{ width: "40%", border: "0.1vw solid black" }}
      />
      <br />
      <p>
        -If your puzzle matches the conditions described above, you will get a
        few dropdown menus on the right side. Simply select the date you want to
        solve for, and click "Solve".
      </p>
      <br />
      <img
        src="/instructionImages/InstructionsBoardSolve.png"
        alt="Solve instructions"
        style={{ width: "60%", border: "0.1vw solid black" }}
      />
      <br />
      <p>-If you get a message saying "No solution found", then there is no solution for that date.</p>
      <br />
      <p>
        -If you get a message saying "Unusually large instance", then your
        puzzle is too large to solve in a reasonable amount of time. You can
        still try to solve it, but it may take a long time.
      </p>
      <br />
      <p>-You may cancel the solving process by clicking "Abort" if the solver takes too long.</p>

      <h2>Saving and Loading Puzzles</h2>
      <p>
        -When you click the "Save Puzzle" button to try to solve a puzzle, it
        automatically saves your puzzle. You can also load a previously saved
        puzzle by clicking the "Choose existing puzzle" button on the front
        page.
      </p>
      <br />
      <p>
        -On the load existing puzzle page, there are 2 modes, enabled by a
        toggle. If the toggle is green, then it means you are in select mode. If
        it is red, then you are in delete mode. In select mode, you can click on
        a puzzle name to load it, and in delete mode, you can click on a puzzle
        name to delete it.
      </p>
      <br />
      <p>Select mode:</p>
      <img
        src="/instructionImages/InstructionsSelectMode.png"
        alt="Select mode"
        style={{ width: "50%", border: "0.1vw solid black" }}
      />
      <br />
      <p>Delete mode:</p>
      <img
        src="/instructionImages/InstructionsDeleteMode.png"
        alt="Delete mode"
        style={{ width: "50%", border: "0.1vw solid black" }}
      />
    </div>
  );
}

export default function InstructionsPage() {

useEffect(() => {
        // Set the page title
        document.title = 'NP-Dater - Instructions Page';
    }, []);

return (
    <>
      <RenderNavigationButtons />
      <RenderInstructions />
    </>
  );
}
