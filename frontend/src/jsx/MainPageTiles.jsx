import PuzzleContext from '../context/PuzzleContext';
import DisplayContext from '../context/DisplayContext.jsx';
import { useContext, useState, useEffect } from 'react';
import { calculateGridBounds } from '../model/GridBoard.js';
import { calculateHexBounds } from '../model/HexBoard.js';

/*
Mu Ye Liu - June 2025

Represents the Tiles for the main page of the application
*/

// Renders the tile grid board
function RenderTileGridBoard({ coords, color }) {
    const { board } = useContext(PuzzleContext);

    const isTallBoard = board.current.height > board.current.width;
    const boundingDimension = isTallBoard ? "height" : "width";
    const boundingSize = isTallBoard ? '65%' : '55%';

    const medianX = Math.floor(board.current.width / 2);
    const medianY = Math.floor(board.current.height / 2);

    return (
        <div className="grid-board" style={{
            position: 'absolute',
            left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            [boundingDimension]: boundingSize,
            aspectRatio: `${board.current.width}/${board.current.height}`,
            display: 'grid',
            gridTemplateColumns: `repeat(${board.current.width}, 1fr)`,
            gridTemplateRows: `repeat(${board.current.height}, 1fr)`,
        }}>
            {board.current.gridCoords.map((coord, idx) => (
                <div key={idx} data-x={String(coord.Coord[0] - medianX)}
                    data-y={String(coord.Coord[1] - medianY)} className="grid-coord-borderless">
                    <div className="grid-coord-template" style={{
                        backgroundColor: coords.some(c => c[0] === coord.Coord[0] - medianX && c[1] === coord.Coord[1] - medianY) ? color : 'transparent',
                    }} />
                </div>
            ))}
        </div>
    );
}

// Renders the tile hex board
function RenderTileHexBoard({coords, color}) {
    const { board, hexagonOrientation } = useContext(PuzzleContext);

    const angle = hexagonOrientation === 'flat-top' ? 30 : 0;
    const coordArray = board.current.hexCoords.map(obj => obj.Coord);
    const bounds = calculateHexBounds(coordArray);

    const widthRef = (bounds.maxOffsetX - bounds.minOffsetX + 1);
    const heightRef = (bounds.maxZ - bounds.minZ + 1) * (2 * Math.sqrt(3) / 3) -
        (bounds.maxZ - bounds.minZ) * (Math.sqrt(3) / 6);
    const aspectRatio = widthRef / heightRef;

    const tileWidth = 100 / (bounds.maxOffsetX - bounds.minOffsetX + 1);

    const handleClick = (e) => {
        // Placeholder
        const hexCoord = e.currentTarget.dataset;
        console.log(`Hex clicked: x=${hexCoord.x}, y=${hexCoord.y}`);
    }

    return (
        <div className="hex-board" style={{
            aspectRatio: `${aspectRatio}`,
            left: '50%', top: '50%',
            transform: `translate(-50%, -50%) rotate(${angle}deg)`
        }}>
            {board.current.hexCoords.map((coord, idx) => {
                const x = coord.Coord[0];
                const y = coord.Coord[1];
                const z = -x - y;
                const offsetX = x + z / 2;

                const relativeX = offsetX - bounds.minOffsetX;
                const relativeY = z - bounds.minZ;

                const left = (relativeX / (bounds.maxOffsetX - bounds.minOffsetX + 1)) * 100;
                const top = relativeY * (tileWidth * aspectRatio * (Math.sqrt(3) / 2));
                return (
                    <div key={idx} className="hex-coord" data-x={String(x)} data-y={String(y)} style={{
                        left: `${left}%`, top: `${top}%`, width: `${tileWidth}%`
                    }} onClick={handleClick}>
                        <div className="hex-coord-inner-tile">
                            <div className="hex-coord-inner-template" style={{
                                backgroundColor: coords.some(c => c[0] === x && c[1] === y) ? color : 'transparent',
                            }}/>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// Renders the tile image for grid tile
// REQUIRES: tile: must be in the format { id: string, coords: [[x, y], ...], color: string }
function RenderTileImageGrid({ tile }) {
    const bounds = calculateGridBounds(tile.coords);
    const rotate = bounds.maxY - bounds.minY > bounds.maxX - bounds.minX ? 90 : 0;
    const boundingSize = rotate === 90 ? '50%' : '80%';
    const boundingDimension = rotate === 90 ? 'width' : 'height';

    return (
        <div key={tile.id} style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            [boundingDimension]: boundingSize,
            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
            aspectRatio: `${(bounds.maxX - bounds.minX + 1) / (bounds.maxY - bounds.minY + 1)}`,
            display: 'grid',
            gridTemplateColumns: `repeat(${bounds.maxX - bounds.minX + 1}, 1fr)`,
            gridTemplateRows: `repeat(${bounds.maxY - bounds.minY + 1}, 1fr)`,
        }}>
            {tile.coords.map(([x, y]) => {
                const gridCol = x - bounds.minX + 1;
                const gridRow = y - bounds.minY + 1;

                return (
                    <div
                        key={`${tile.id}_${x}_${y}`}
                        style={{
                            gridColumn: gridCol,
                            gridRow: gridRow,
                            backgroundColor: tile.color,
                            boxSizing: 'border-box',
                            boxShadow: '0 0 0.2vw var(--box-shadow-color)',
                        }}
                    />
                );
            })}
        </div>
    );
}

// Renders the tile image for hex tile
// REQUIRES: tile: must be in the format { id: string, coords: [[x, y], ...], color: string }
function RenderTileImageHex({ tile }) {
    const bounds = calculateHexBounds(tile.coords);
    const width = (bounds.maxOffsetX - bounds.minOffsetX + 1) * 4;
    const height = (bounds.maxZ - bounds.minZ + 1) * 4 * (2 * Math.sqrt(3) / 3) -
        (bounds.maxZ - bounds.minZ) * 4 * (Math.sqrt(3) / 6);
    const aspectRatio = width / height;

    const rotate = aspectRatio < 1 ? 0 : 90;
    const boundingDimension = rotate === 90 ? 'width' : 'height';
    const boundingSize = rotate === 90 ? '50%' : '80%';

    return (

        <div key={tile.id} style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            [boundingDimension]: `${boundingSize}`,
            aspectRatio: `${aspectRatio}`,
            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
            filter: 'drop-shadow(0 0 0.2vw var(--box-shadow-color))'
        }}>
            {tile.coords.map(([x, y], hexIdx) => {
                const z = -x - y;
                const offsetX = x + z / 2;

                const relativeX = offsetX - bounds.minOffsetX;
                const relativeY = z - bounds.minZ;

                const left = (relativeX / (bounds.maxOffsetX - bounds.minOffsetX + 1)) * 100;
                const width = 100 / (bounds.maxOffsetX - bounds.minOffsetX + 1);
                // Height relative to height: width * aspectRatio * (2 * Math.sqrt(3) / 3)
                const top = relativeY * (width * aspectRatio * (Math.sqrt(3) / 2));

                return (
                    <div
                        key={`${tile.id}_${hexIdx}`}
                        className="hexagon"
                        style={{
                            position: 'absolute',
                            left: `${left}%`,
                            top: `${top}%`,
                            width: `${width}%`,
                            backgroundColor: tile.color
                        }}
                    />
                );
            })}
        </div>
    );
}

// Renders the tile image on the window
function RenderTileImage({ tileId }) {
    const { puzzleType, tileCoordList } = useContext(PuzzleContext);
    const tile = tileCoordList.find(t => t.id === tileId);

    if (!tile) return null; // If tile not found, return nothing

    return (
        <>
            {puzzleType === 'grid' ? (
                <RenderTileImageGrid tile={tile} />
            ) : (
                <RenderTileImageHex tile={tile} />
            )}
        </>
    );

}

// Renders the tile Popup, attached to main file
export function RenderTilePopup() {
    // TODO: Implement this function.
    const { puzzleType, currTileSelected, setTileCoordList } = useContext(PuzzleContext);
    const { displayTilePopup, setDisplayTilePopup } = useContext(DisplayContext);

    const [colour, setColour] = useState("#ffffff"); // Default color

    useEffect(() => {
        if (currTileSelected) {
            setColour(currTileSelected.color);
        }
    }, [currTileSelected]);

    const handleChooseColourClick = (e) => {
        setColour(e.target.value);
    }

    const handleSetTileClick = () => {
        // TODO: Implement the set tile functionality
    }

    const handleDeleteTileClick = () => {
        // TODO: Implement the delete tile functionality
    }

    return (
        <>
            {displayTilePopup && (<div className="popup-background" onClick={() => setDisplayTilePopup(false)}>
                <div className="popup-wrapper-tile" onClick={(e) => e.stopPropagation()}>
                    <h1 style={{
                        textAlign: 'center',
                        color: 'var(--header-color)',
                        fontSize: '3vw',
                        marginTop: '0'
                    }}>Edit Tile:</h1>
                    <input
                        type="color"
                        value={colour}
                        onChange={handleChooseColourClick}
                        style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            left: '15%',
                            top: '4%',
                            transform: 'translateX(-50%)',
                            width: '5%',
                            borderRadius: '2vw'
                        }}
                    />
                    <p style={{ position: 'absolute', left: '15%', top: '7%', transform: 'translateX(-50%)' }}>Selected Colour: {colour}</p>
                    {puzzleType === 'grid' ? (
                        <RenderTileGridBoard coords={currTileSelected.coords} color={colour} />
                    ) : (
                        <RenderTileHexBoard coords={currTileSelected.coords} color={colour} />
                    )}
                    <button className="typical-button" style={{
                        position: 'absolute',
                        margin: '0',
                        left: '33%',
                        bottom: '3%',
                        transform: 'translateX(-50%)',
                        width: '30%',
                        height: '7%'
                    }} onClick={handleSetTileClick}>Set Tile</button>
                    <button className="typical-button" style={{
                        position: 'absolute',
                        margin: '0',
                        left: '67%',
                        bottom: '3%',
                        transform: 'translateX(-50%)',
                        width: '30%',
                        height: '7%'
                    }} onClick={handleDeleteTileClick}>Delete Tile</button>
                </div>
            </div>)}
        </>

    )
}

// Renders the tile window. 
export function RenderTileWindow({ tileId }) {
    const { setCurrTileSelected, tileCoordList } = useContext(PuzzleContext);
    const { mode, setDisplayTilePopup } = useContext(DisplayContext);
    const currTile = tileCoordList.find(tile => tile.id === tileId);

    const handleWindowClick = () => {
        // Only display when in edit mode
        if (mode === "edit") {
            setCurrTileSelected({id: currTile.id, coords: currTile.coords, color: currTile.color}); // Set the current tile selected
            setDisplayTilePopup(true);
        }
    }

    return (
        <div className="tile-window" onClick={handleWindowClick}>
            <RenderTileImage tileId={tileId} />
        </div>
    );
}