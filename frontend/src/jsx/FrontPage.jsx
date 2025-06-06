import { useState } from 'react'
import { GridTile, HexTile } from '../model/Tile';
import '../css/FrontPage.css'

/* Renders the grid tiles
REQUIRES: - gridTiles: Must be a list of grid tiles
          - hexTiles: Must be a list of hex tiles
*/
function RenderBackgroundTiles(gridTiles, hexTiles) {
    return (
        // render your stuff here.
        <>
        </>
    );
}

// Sets up the background tiles
function SetUpBackgroundTiles() {
    // List of coordinates represented by coordinates
    const gridTileCoords = [[[0, 0], [1, 0], [0, 1], [1, 1]],
                            [[0, 0], [1, 0], [1, 1], [1, 2]],
                            [[0, 0], [1, 0], [1, 1], [1, 2], [0, 2]]]; 
    const gridTileColours = ['green', 'red', 'yellow', 'orange'];
    const hexTilesCoords = [[[0, 0], [0, 1], [1, 0], [2, 0]],
                            [[0, 0], [0, -1], [-1, -1], [-1, -2]],+
                            [[0, 0], [0, -2], [-1, -1], [-2, 0]]];
    const hexTileColours = ['blue', 'gray', 'turquuise', 'magenta'];

    const gridTiles = [];
    const hexTiles = [];

    gridTileCoords.forEach((coordList, idx) => {
        gridTiles.push(new GridTile(`Grid_${String(idx)}`, coordList, [], gridTileColours[idx]));
    });

    hexTilesCoords.forEach((coordList, idx) => {
        hexTiles.push(new HexTile(`Hex_${String(idx)}`, coordList, [], hexTileColours[idx]));
    });

    return (
        <div className="background-tiles">
            {RenderBackgroundTiles(gridTiles, hexTiles)}
        </div>
    );
    
}

// Sets up the title
function SetUpTitle() {
    return (
        <>
            <h1
                className="title"
                style={{
                    position: 'absolute',
                    left: '50vw',
                    top: '8vh',
                    transform: 'translate(-50%, -50%)',
                    margin: '0',
                }}
            >
                NP-Dater
            </h1>

            <div
                style={{
                    position: 'absolute',
                    left: '50vw',
                    top: '12vh',
                    transform: 'translate(-50%, -50%)',
                    width: '55vw',
                    height: '13vh',
                    border: '0.7vw solid var(--header-color)',
                    borderTop: 'none',
                    borderRadius: '0 0 50vw 50vw',
                    filter: 'drop-shadow(0 0 2vh var(--text-color))',
                }}
            />
        </>
    );
}

// Create a function that toggles dark mode

///// MAIN FUNCTION /////

// Sets up the front page
export default function FrontPage() {
    return (
        <>
            <SetUpTitle/>
            <SetUpBackgroundTiles/>
        </>
    );
}
