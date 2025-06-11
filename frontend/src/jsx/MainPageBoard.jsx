import { useState } from 'react';
import GridBoard from '../model/GridBoard';
import HexBoard from '../model/HexBoard';
import PuzzleContext from '../context/PuzzleContext';

/*
Mu Ye Liu - June 2025

Represents the main page board for displaying the grid and hexagonal tiles
*/

//// HELPER FUNCTIONS ////

function RenderGridCoords({ x, y }) {

}

function RenderHexCoords({ x, y }) {

}

function RenderGridBoard({ gridHeight, gridWidth }) {
    const board = new GridBoard(parseInt(gridHeight), parseInt(gridWidth));
    return (
        <>
            <div>{board.render()}</div>
        </>
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
        hexRadius, setHexRadius } = useContext(PuzzleContext);


    if (puzzleType === '') {
        return null;
    }

    return (<>
        {puzzleType === 'grid' && (
            <RenderGridBoard gridHeight={gridHeight} gridWidth={gridWidth} />
        )}
        {puzzleType === 'hex' && (
            <RenderHexBoard hexRadius={hexRadius} />
        )}
    </>);
}
