import { useEffect } from 'react';
import Tile from '../model/Tile';
import { useNavigate } from 'react-router-dom';
import '../css/FrontPage.css'
import { use } from 'react';

/* 
Mu Ye Liu - June 2025

Represents the jsx file for the initialization of the front page
*/

///// HELPER FUNCTIONS /////

// Calculate bounds for grid tiles
function calculateGridTileBounds(coords) {
    const bounds = coords.reduce((acc, [x, y]) => {
        acc.minX = Math.min(acc.minX, x);
        acc.minY = Math.min(acc.minY, y);
        acc.maxX = Math.max(acc.maxX, x);
        acc.maxY = Math.max(acc.maxY, y);
        return acc;
    }, { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
    return bounds;
}

// Calculate bounds for hex tiles for each tile
function calculateHexTileBounds(coords) {
    const bounds = coords.reduce((acc, [x, y]) => {
        const z = -x - y;
        acc.minX = Math.min(acc.minX, x);
        acc.maxX = Math.max(acc.maxX, x);
        acc.minY = Math.min(acc.minY, y);
        acc.maxY = Math.max(acc.maxY, y);
        acc.minZ = Math.min(acc.minZ, z);
        acc.maxZ = Math.max(acc.maxZ, z);
        acc.minOffsetX = Math.min(acc.minOffsetX, x + z / 2);
        acc.maxOffsetX = Math.max(acc.maxOffsetX, x + z / 2);
        return acc;
    }, {
        minX: Infinity,
        maxX: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
        minZ: Infinity,
        maxZ: -Infinity,
        minOffsetX: Infinity,
        maxOffsetX: -Infinity,
    });

    return bounds;
}

// Helper function to create grid tiles
function createGridTiles(gridTileCoords, gridTileColours) {
    return gridTileCoords.map((coordList, idx) => {
        const bounds = calculateGridTileBounds(coordList);
        return {
            tile: new Tile(`front_page_grid_${idx}`, coordList, [], gridTileColours[idx]),
            bounds
        };
    });
}

// Helper function to create hex tiles
function createHexTiles(hexTilesCoords, hexTileColours) {
    return hexTilesCoords.map((coordList, idx) => {
        const bounds = calculateHexTileBounds(coordList);
        return {
            tile: new Tile(`front_page_hex_${idx}`, coordList, [], hexTileColours[idx], 1),
            bounds
        };
    });
}

///// RENDER FUNCTIONS /////

// Renders the rotating grid tiles
function renderGridTiles(tiles, placements) {
    return tiles.map(({ tile, bounds }, idx) => (
        <div key={tile.id} className='rotating-tile-infinite-clockwise' style={{
            position: 'absolute',
            left: `${placements[idx][0]}%`,
            top: `${placements[idx][1]}%`,
            width: `${(bounds.maxX - bounds.minX) * 8}%`,
            transform: 'translate(-50%, -50%)',
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
                            gridRow:    gridRow,
                            backgroundColor: tile.color,
                            boxSizing: 'border-box',
                            boxShadow: '0 0 0.2vw var(--box-shadow-color)',
                        }}
                    />
                );
            })}
        </div>
    ));
}

// Helper function to render hex tiles
function renderHexTiles(tiles, placements) {
    return tiles.map(({ tile, bounds }, idx) => {
        const width = (bounds.maxOffsetX - bounds.minOffsetX + 1) * 4;
        const height = (bounds.maxZ - bounds.minZ + 1) * 4 * (2 * Math.sqrt(3) / 3) -
                        (bounds.maxZ - bounds.minZ) * 4 * (Math.sqrt(3) / 6);
        const aspectRatio = width / height;
        return <div key={tile.id} className='rotating-tile-infinite-counter-clockwise' style={{
            position: 'absolute',
            left: `${placements[idx][0]}%`,
            top: `${placements[idx][1]}%`,
            width: `${width}%`,
            aspectRatio: `${aspectRatio}`,
            transform: 'translate(-50%, -50%)',
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
                const top  = relativeY * (width * aspectRatio * (Math.sqrt(3) / 2));

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
    });
}

// Refactored SetUpBackgroundTiles function
function SetUpBackgroundTiles() {
    const gridTileCoords = [[[0, 0], [1, 0], [0, 1], [1, 1]],
                            [[0, 0], [1, 0], [1, 1], [1, 2]],
                            [[0, 0], [1, 0], [1, 1], [1, 2], [0, 2]]]; 
    const gridTileColours = ['green', 'red', 'yellow', 'orange'];
    const hexTilesCoords = [[[0, 0], [0, 1], [1, 0], [2, 0]],
                            [[0, 0], [0, -1], [-1, -1], [-1, -2]],
                            [[0, 0], [0, -1], [-1, -1], [-2, 0]]];
    const hexTileColours = ['blue', 'gray', 'turquoise', 'magenta'];

    const gridTilePlacement = [[12, 10], [12, 37], [12, 70]];
    const hexTilePlacement = [[80, 5], [83, 35], [80, 70]];

    const gridTiles = createGridTiles(gridTileCoords, gridTileColours);
    const hexTiles = createHexTiles(hexTilesCoords, hexTileColours);

    return (
        <div>
            {renderGridTiles(gridTiles, gridTilePlacement)}
            {renderHexTiles(hexTiles, hexTilePlacement)}
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

// Sets up the main buttons
function SetUpMainButtons() {
    const navigate = useNavigate();

    return (
        <div style={{
            position: 'absolute',
            left: '50%',
            top: '80%',
            width: '30%',
            height: '30%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <button className="typical-button" onClick={() => navigate('/main-page')} style={{
                width: '100%',
                height: '30%'
            }}>
                Start Program
            </button>
            <button className="typical-button" onClick={() => navigate('/instructions-page')} style={{
                width: '100%',
                height: '30%'
            }}>
                Instructions
            </button>
        </div>
    );
}

// Sets up the slogan below the title
function SetUpSlogan() {
    return (
        <h1
            className="slogan"
            style={{
                position: 'absolute',
                left: '50%',
                top: '30%',
                width: '30%',
                transform: 'translate(-50%)',
                margin: '0',
                textAlign: 'center',
                color: 'var(--header-color)',
        }}>
            Tired of spending hours on a date puzzle? NP-Dater to the rescue!
        </h1>
    );
}

// Create a function that toggles dark mode

///// MAIN FUNCTION /////

// Sets up the front page
export default function FrontPage() {
    useEffect(() => {
        // Set the page title
        document.title = 'NP-Dater - Front Page';
    }
    , []);

    return (
        <>
            <SetUpTitle/>
            <SetUpBackgroundTiles/>
            <SetUpMainButtons/>
            <SetUpSlogan/>
        </>
    );
}
