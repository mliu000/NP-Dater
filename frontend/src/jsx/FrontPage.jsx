import { useState } from 'react'
import { GridTile, HexTile } from '../model/Tile';
import '../css/FrontPage.css'

// Sets up the background tiles
function SetUpBackgroundTiles() {
    // List of coordinates represented by coordinates
    const gridTileCoords = [[[0, 0], [1, 0], [0, 1], [1, 1]],
                            [[0, 0], [1, 0], [1, 1], [1, 2]],
                            [[0, 0], [1, 0], [1, 1], [1, 2], [0, 2]]]; 
    const gridTileColours = ['green', 'red', 'yellow', 'orange'];
    const hexTilesCoords = [[[0, 0], [0, 1], [1, 0], [2, 0]],
                            [[0, 0], [0, -1], [-1, -1], [-1, -2]],
                            [[0, 0], [0, -2], [-1, -1], [-2, 0]]];
    const hexTileColours = ['blue', 'gray', 'turquuise', 'magenta'];
    

    const gridTiles = [];
    const hexTiles = [];
    const gridTilePlacement = [[18, 20], [18, 40], [18, 60]];
    const hexTilePlacement = [[82, 20], [82, 40], [82, 60]];
    let gridTileMaxX, gridTileMaxY, gridTileMinX, gridTileMinY;
    let hexTileMaxX, hexTileMaxY, hexTileMinX, hexTileMinY;
    

    gridTileCoords.forEach((coordList, idx) => {
        coordList.forEach((coord) => {
            gridTileMaxX = Math.max(gridTileMaxX, coord[0]);
            gridTileMaxY = Math.max(gridTileMaxY, coord[1]);
            gridTileMinX = Math.min(gridTileMinX, coord[0]);
            gridTileMinY = Math.min(gridTileMinY, coord[1]);
        });
        gridTiles.push(new GridTile(`Grid_${String(idx)}`, coordList, [], gridTileColours[idx]));
    });

    hexTilesCoords.forEach((coordList, idx) => {
        coordList.forEach((coord) => {
            hexTileMaxX = Math.max(hexTileMaxX, coord[0]);
            hexTileMaxY = Math.max(hexTileMaxY, coord[1]);
            hexTileMinX = Math.min(hexTileMinX, coord[0]);
            hexTileMinY = Math.min(hexTileMinY, coord[1]);
        });
        hexTiles.push(new HexTile(`Hex_${String(idx)}`, coordList, [], hexTileColours[idx]));
    });

    return (
        <div>
            {gridTiles.map((tile, idx) => (
                <div className='rotating-tile-infinite-clockwise' style={{
                    position: 'absolute',
                    left: `${gridTilePlacement[idx][0]}vw`,
                    top: `${gridTilePlacement[idx][1]}vh`,
                    width: `${(gridTileMaxX - gridTileMinX) * 10}%`,
                    height: `${(gridTileMaxY - gridTileMinY) * 10}%`,
                    transform: `translate(-50%, -50%)`,
                }}>
                    
                </div>
            ))}

            {hexTiles.map((tile) => (
                <div className='rotating-tile-infinite-counter-clockwise'>
                
                </div>
            ))}
        </div>
    );
    
}

// Sets up the title
function SetUpTitle() {
    return (
        <h1
            className="title"
            style={{
                position: 'absolute',
                left: '50%',
                top: '5%',
                transform: 'translate(-50%)',
                margin: '0',
                textAlign: 'center',
                textDecoration: 'dashed underline' 
        }}>
            NP-Dater
        </h1>
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
