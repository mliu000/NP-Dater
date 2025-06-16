import PuzzleContext from '../context/PuzzleContext';
import DisplayContext from '../context/DisplayContext.jsx';
import { useCallback, useContext, useState } from 'react';

/*
Mu Ye Liu - June 2025

Represents the Tiles for the main page of the application
*/

// Renders the tile grid board
function RenderTileGridBoard() {
    const { tileCoordList, setTileCoordList } = useContext(PuzzleContext);


}

// Renders the tile hex board
function RenderTileHexBoard() {

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
                    <p style={{position: 'absolute', left: '15%', top: '7%', transform: 'translateX(-50%)'}}>Selected Colour: {colour}</p>
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