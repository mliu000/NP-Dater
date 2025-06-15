import { useState, useContext, useEffect } from 'react';
import GridBoard from '../model/GridBoard.js';
import HexBoard from '../model/HexBoard.js';
import PuzzleContext from '../context/PuzzleContext.jsx';
import { calculateHexBounds } from './MainPageHexagons.jsx';
import DisplayContext from '../context/DisplayContext.jsx';

/*
Mu Ye Liu - June 2025

Represents the main page board for displaying the grid and hexagonal tiles
*/

//// HELPER FUNCTIONS ////

// Renders the grid coordinates
function RenderGridCoord({ x, y, fontSize }) {
    const {currX, currY, setCurrX, setCurrY, coordSpecialAttributes } = useContext(PuzzleContext);
    const { mode, setDisplaySetCoordPopup } = useContext(DisplayContext);

    const handleClick = () => {
        if (mode !== 'edit') return; // Only allow clicks in edit mode

        if (currX === x && currY === y) {
            setDisplaySetCoordPopup(false);
            setCurrX(null);
            setCurrY(null);
        } else {
            setDisplaySetCoordPopup(true);
            setCurrX(x);
            setCurrY(y);
        }
    }

    const isCurrentCoord = currX === x && currY === y;
    const message = coordSpecialAttributes.find(attr => attr.Coord[0] === x && attr.Coord[1] === y)?.specialAttribute;
    const messageSliced = message && message.length > 3 ? message.slice(0, 3) : message;

    return (
        <>
            <div className={isCurrentCoord ? "grid-coord-selected" : (message === "blocked" ? "grid-coord-blocked" : "grid-coord")} data-x={x} data-y={y} style={{
                gridColumn: x + 1, gridRow: y + 1,
            }} onClick={handleClick}>
                <h3 style={{
                    position: 'absolute',
                    textAlign: 'center',
                    color: 'var(--text-color)',
                    fontSize: `${fontSize}vw`
                }}>{message === "blocked" ? "" : messageSliced}</h3>
            </div>
        </>

    );
}

/// Renders the hex coordinates
function RenderHexCoord({ x, y, angle, tileWidth, bounds, aspectRatio, fontSize }) {
    const { currX, currY, setCurrX, setCurrY, coordSpecialAttributes } = useContext(PuzzleContext);
    const { mode, setDisplaySetCoordPopup } = useContext(DisplayContext);

    // Add the hover feature like above in gridCoord
    const handleClick = () => {
        if (mode !== 'edit') return; // Only allow clicks in edit mode

        if (currX === x && currY === y) {
            setDisplaySetCoordPopup(false);
            setCurrX(null);
            setCurrY(null);
        } else {
            setDisplaySetCoordPopup(true);
            setCurrX(x);
            setCurrY(y);
        }
    }

    const isCurrentCoord = currX === x && currY === y;
    const message = coordSpecialAttributes.find(attr => attr.Coord[0] === x && attr.Coord[1] === y)?.specialAttribute;
    const messageSliced = message && message.length > 3 ? message.slice(0, 3) : message;

    // Calculate the positions 
    const z = -x - y;
    const offsetX = x + z / 2;

    const relativeX = offsetX - bounds.minOffsetX;
    const relativeY = z - bounds.minZ;

    const left = (relativeX / (bounds.maxOffsetX - bounds.minOffsetX + 1)) * 100;
    const top = relativeY * (tileWidth * aspectRatio * (Math.sqrt(3) / 2));

    return (
        <>
            <div className="hex-coord" data-x={x} data-y={y} style={{
                left: `${left}%`, top: `${top}%`, width: `${tileWidth}%`
            }} onClick={handleClick}>
                <div className={isCurrentCoord ? "hex-coord-inner-selected" : (message === "blocked" ? "hex-coord-inner-blocked" : "hex-coord-inner")}>
                    <h3 style={{
                        position: 'absolute',
                        transform: `rotate(${-angle}deg)`,
                        textAlign: 'center',
                        color: 'var(--text-color)',
                        fontSize: `${fontSize}vw`
                    }}>{message === "blocked" ? "" : messageSliced}</h3>
                </div>
            </div>
        </>
    );
}

// Renders the grid board
function RenderGridBoard() {
    const { board } = useContext(PuzzleContext);

    const gridHeight = board.current.height;
    const gridWidth = board.current.width;

    // Boolean to determine if the board is tall or wide
    const isTallBoard = gridHeight > gridWidth;
    const boundingDimension = isTallBoard ? "height" : "width";
    const boundingSize = isTallBoard ? '65%' : '40%';

    // Calculate the font size of the coords
    const fontSize = 6 - Math.max(gridWidth, gridHeight) * 0.6;

    return (

        <div className="grid-board" style={{
            position: 'absolute',
            [boundingDimension]: boundingSize,
            aspectRatio: `${gridWidth}/${gridHeight}`,
            gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
            gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
        }}>
            {board.current.gridCoords.map((coord, idx) => (
                <RenderGridCoord key={idx} x={coord.Coord[0]} y={coord.Coord[1]} fontSize={fontSize} />
            ))}
        </div>

    );
}

// Renders the hex board
function RenderHexBoard() {
    const { board, hexagonOrientation } = useContext(PuzzleContext);

    const hexRadius = board.current.radius;

    // Stuff to calculate the aspect ratio of the hex board
    const angle = hexagonOrientation === 'flat-top' ? 30 : 0;
    const coordArray = board.current.hexCoords.map(obj => obj.Coord);
    const bounds = calculateHexBounds(coordArray);

    const widthRef = (bounds.maxOffsetX - bounds.minOffsetX + 1);
    const heightRef = (bounds.maxZ - bounds.minZ + 1) * (2 * Math.sqrt(3) / 3) -
        (bounds.maxZ - bounds.minZ) * (Math.sqrt(3) / 6);
    const aspectRatio = widthRef / heightRef;

    const tileWidth = 100 / (bounds.maxOffsetX - bounds.minOffsetX + 1);

    // Calculate an appropriate font size based on the hex radius
    const fontSize = 2.5 - hexRadius * 0.25;

    return (
        <div className="hex-board" style={{
            aspectRatio: `${aspectRatio}`,
            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        }}>
            {board.current.hexCoords.map((coord, idx) => (
                <RenderHexCoord key={idx} x={coord.Coord[0]} y={coord.Coord[1]}
                    angle={angle} tileWidth={tileWidth} bounds={bounds} aspectRatio={aspectRatio} fontSize={fontSize} />
            ))}
        </div>

    );
}

///// MAIN FUNCTION /////

// Renders the main board
export function RenderMainBoard() {
    const { puzzleType, renderBoard } = useContext(PuzzleContext);


    if (puzzleType === '') return null;

    return (<>
        {renderBoard && <div>
            {puzzleType === 'grid' && (
                <RenderGridBoard />
            )}
            {puzzleType === 'hex' && (
                <RenderHexBoard />
            )}
        </div>}
    </>);
}
