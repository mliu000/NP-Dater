import { useState, useContext } from 'react';
import GridBoard from '../model/GridBoard.js';
import HexBoard from '../model/HexBoard.js';
import PuzzleContext from '../context/PuzzleContext.jsx';
import { calculateHexBounds } from './MainPageHexagons.jsx';

/*
Mu Ye Liu - June 2025

Represents the main page board for displaying the grid and hexagonal tiles
*/

//// HELPER FUNCTIONS ////

function RenderGridCoord({ x, y }) {
    return (
        <div className="grid-coord" data-x={x} data-y={y} style={{
            left: `${x}%`, top: `${y}%`
        }}>
            <h2>
            </h2>
        </div>
    );
}

function RenderHexCoord({ x, y, angle }) {
    return (
        <div className="hex-coord" data-x={x} data-y={y} style={{
            left: `${x}%`, top: `${y}%`, width: '10%'
        }}>
            <div className="hex-coord-inner">
                <h3 style={{
                    position: 'absolute',
                    transform: `rotate(${-angle}deg)`,
                    textAlign: 'center',
                    color: 'var(--text-color)'
                }}>Tue</h3>
            </div>
        </div>
    );
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
            gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
            gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
        }}>
            {board.current.gridCoords.map((coord, idx) => (
                <RenderGridCoord key={idx} x={coord.Coord[0]} y={coord.Coord[1]} />
            ))}
        </div>
    );
}

function RenderHexBoard({ hexRadius }) {
    const { board, hexagonOrientation } = useContext(PuzzleContext);
    board.current = new HexBoard(parseInt(hexRadius));

    const angle = hexagonOrientation === 'flat-top' ? 30 : 0;
    const coordArray = board.current.hexCoords.map(obj => obj.Coord);
    const bounds = calculateHexBounds(coordArray);

    const width = (bounds.maxOffsetX - bounds.minOffsetX + 1) * 4;
    const height = (bounds.maxZ - bounds.minZ + 1) * 4 * (2 * Math.sqrt(3) / 3) -
        (bounds.maxZ - bounds.minZ) * 4 * (Math.sqrt(3) / 6);
    const aspectRatio = width / height;

    return (
        <div className="hex-board" style={{
            aspectRatio: `${aspectRatio}`,
        }}>
            <div style={{
                translate: `rotate(${angle}deg)`,
                position: 'absolute',
                width: '100%',
                height: '100%',
            }}>
                {board.current.hexCoords.map((coord, idx) => (
                    <RenderHexCoord key={idx} x={coord.Coord[0]} y={coord.Coord[1]} angle={angle} />
                ))}
            </div>
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
