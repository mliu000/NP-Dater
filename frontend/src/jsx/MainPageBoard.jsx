import { useState, useContext } from 'react';
import GridBoard from '../model/GridBoard.js';
import HexBoard from '../model/HexBoard.js';
import PuzzleContext from '../context/PuzzleContext.jsx';

/*
Mu Ye Liu - June 2025

Represents the main page board for displaying the grid and hexagonal tiles
*/

const boardHeightPct = 70;

//// HELPER FUNCTIONS ////

function RenderGridCoords({ x, y }) {

    return (
        <div className="grid-coord" style={{
            left: `${x}%`, top: `${y}%`,
        }}>
        </div>
    );
}

function RenderHexCoords({ x, y }) {

}

function RenderGridBoard({ gridHeight, gridWidth }) {
    const { board } = useContext(PuzzleContext);
    board.current = new GridBoard(parseInt(gridHeight), parseInt(gridWidth));

    // Boolean to determine if the board is tall or wide
    const isTallBoard = gridHeight > gridWidth;
    const boundingDimension = isTallBoard ? "height" : "width";
    const boundingSize = isTallBoard ? '65%' : '40%';

    return (
        <div className="grid-board" style={{
            position: 'absolute',
            [boundingDimension]: boundingSize,
            aspectRatio: `${gridWidth}/${gridHeight}`,
            display: 'grid',
            gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
            gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
            border: '0.3vw solid var(--text-color)'
        }}>
            {board.current.gridCoords.map((coord, idx) => (
                <RenderGridCoords key={idx} x={coord.Coord[0]} y={coord.Coord[1]} />
            ))}
        </div>
    );
}

function RenderHexBoard({ hexRadius }) {
    const board = new HexBoard(parseInt(hexRadius));
    return (
        <div className="board">

        </div>
    );
}

///// MAIN FUNCTION /////

// Renders the main board
export function RenderMainBoard() {
    const { puzzleType, gridWidth, gridHeight, hexRadius, renderBoard } = useContext(PuzzleContext);


    if (puzzleType === '') return null;

    return (<>
        {renderBoard && <div>
            {puzzleType === 'grid' && (
                <RenderGridBoard gridHeight={gridHeight} gridWidth={gridWidth} />
            )}
            {puzzleType === 'hex' && (
                <RenderHexBoard hexRadius={hexRadius} />
            )}
        </div>}
    </>);
}
