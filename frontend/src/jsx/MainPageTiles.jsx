import PuzzleContext from '../context/PuzzleContext';
import DisplayContext from '../context/DisplayContext.jsx';
import { useContext, useState } from 'react';
import { calculateHexBounds } from './MainPageHexagons.jsx';

/*
Mu Ye Liu - June 2025

Represents the Tiles for the main page of the application
*/

// Renders the tile grid board
function RenderTileGridBoard() {
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
                <div key={idx} data-x={String(coord[0] - medianX)}
                    data-y={String(coord[1] - medianY)} className="grid-coord"></div>
            ))}
        </div>
    );
}

// Renders the tile hex board
function RenderTileHexBoard() {
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
                        <div className={"hex-coord-inner-tile"}>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// Renders the tile Popup, attached to main file
export function RenderTilePopup() {
    // TODO: Implement this function.
    const { puzzleType } = useContext(PuzzleContext);
    const { displayTilePopup, setDisplayTilePopup } = useContext(DisplayContext);
    const [colour, setColour] = useState('#000000'); // Default color

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
                        <RenderTileGridBoard />
                    ) : (
                        <RenderTileHexBoard />
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
export function RenderTileWindow() {
    const { mode, setDisplayTilePopup } = useContext(DisplayContext);

    const handleWindowClick = () => {
        // Only display when in edit mode
        if (mode === "edit") {
            setDisplayTilePopup(true);
        }
    }

    return (
        <div className="tile-window" onClick={handleWindowClick}>

        </div>
    );
}