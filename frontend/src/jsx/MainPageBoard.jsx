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
        <div className="grid-coord" style={{ left: `${x}%`, top: `${y}%` }}>
            {`(${x}, ${y})`}
        </div>
    );
}

function RenderHexCoords({ x, y }) {

}

function RenderGridBoard({ gridHeight, gridWidth }) {
    const board = new GridBoard(parseInt(gridHeight), parseInt(gridWidth));
    return (
        <div className="board" style={{ 
            position: 'absolute',
            aspectRatio: `${gridWidth}/${gridHeight}`,
            display: 'grid',
            gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
            gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
            border: '1px solid black',
        }}>

        </div>
    );
}

function RenderHexBoard({ hexRadius }) {
    const board = new HexBoard(parseInt(hexRadius));
    return (
        <>
            <div>{board.render()}</div>
        </>
    );
}

///// MAIN FUNCTION /////

// Renders the main board
export function RenderMainBoard() {
    const { puzzleType, setPuzzleType,
        gridWidth, setGridWidth,
        gridHeight, setGridHeight,
        hexRadius, setHexRadius,
        renderBoard, setRenderBoard } = useContext(PuzzleContext);


    if (puzzleType === '') {
        return null;
    }

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
