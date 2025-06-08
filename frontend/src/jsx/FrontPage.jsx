import { useState } from 'react'
import { GridTile, HexTile } from '../model/Tile';
import '../css/FrontPage.css'

// Helper function to calculate tile bounds
function calculateTileBounds(coords) {
    const bounds = coords.reduce((acc, [x, y]) => {
        acc.minX = Math.min(acc.minX, x);
        acc.minY = Math.min(acc.minY, y);
        acc.maxX = Math.max(acc.maxX, x);
        acc.maxY = Math.max(acc.maxY, y);
        return acc;
    }, { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
    return bounds;
}

// Helper function to create grid tiles
function createGridTiles(gridTileCoords, gridTileColours) {
    return gridTileCoords.map((coordList, idx) => {
        const bounds = calculateTileBounds(coordList);
        return {
            tile: new GridTile(`front_page_grid_${idx}`, coordList, [], gridTileColours[idx]),
            bounds,
        };
    });
}

// Helper function to create hex tiles
function createHexTiles(hexTilesCoords, hexTileColours) {
    return hexTilesCoords.map((coordList, idx) => {
        const bounds = calculateTileBounds(coordList);
        return {
            tile: new HexTile(`front_page_hex_${idx}`, coordList, [], hexTileColours[idx]),
            bounds,
        };
    });
}

// Helper function to render tiles
function renderGridTiles(tiles, placements, isHex = false) {
    return tiles.map(({ tile, bounds }, idx) => (
        <div key={tile.id} className='rotating-tile-infinite-clockwise' style={{
            position: 'absolute',
            left: `${placements[idx][0]}%`,
            top: `${placements[idx][1]}%`,
            width: `${(bounds.maxX - bounds.minX) * 8}%`,
            transform: 'translate(-50%, -50%)',
            aspectRatio: `${(bounds.maxX - bounds.minX + 1) / (bounds.maxY - bounds.minY + 1)}`,
        }}>
            {tile.coords.map(([x, y]) => {
                const key = `${tile.id}_${x}_${y}`;
                const isTopOpen = !tile.coords.some(([cx, cy]) => cx === x && cy === y - 1);
                const isBottomOpen = !tile.coords.some(([cx, cy]) => cx === x && cy === y + 1);
                const isLeftOpen = !tile.coords.some(([cx, cy]) => cx === x - 1 && cy === y);
                const isRightOpen = !tile.coords.some(([cx, cy]) => cx === x + 1 && cy === y);

                const tileWidth = bounds.maxX - bounds.minX + 1;
                const tileHeight = bounds.maxY - bounds.minY + 1;

                const normX = x - bounds.minX;
                const normY = y - bounds.minY;

                return (
                    <div
                        key={key}
                        style={{
                            position: 'absolute',
                            left: `${(normX * 100) / tileWidth}%`,
                            top: `${(normY * 100) / tileHeight}%`,
                            width: `${100 / tileWidth}%`,
                            aspectRatio: '1 / 1',
                            backgroundColor: tile.color,
                            boxSizing: 'border-box',
                            borderTop: isTopOpen ? '0.3vw solid black' : 'none',
                            borderBottom: isBottomOpen ? '0.3vw solid black' : 'none',
                            borderLeft: isLeftOpen ? '0.3vw solid black' : 'none',
                            borderRight: isRightOpen ? '0.3vw solid black' : 'none',
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
    // how many columns & rows our shape spans
    const cols = bounds.maxX - bounds.minX + 1;
    const rows = bounds.maxY - bounds.minY + 1;

    // size of the whole tile in % of parent
    // you were using `8%` per square—feel free to adjust that
    const tileWidthPct = cols * 8;

    return (
      <div
        key={tile.id}
        className="rotating-tile-infinite-clockwise"
        style={{
          position: 'absolute',
          left:   `${placements[idx][0]}%`,
          top:    `${placements[idx][1]}%`,
          transform: 'translate(-50%, -50%)',
          width:  `${tileWidthPct}%`,
          /* height will be derived from aspect-ratio */
          aspectRatio: `${cols} / ${rows}`,
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows:    `repeat(${rows}, 1fr)`,
          gap: 0,
        }}
      >
        {tile.coords.map(([x, y]) => {
          const gridCol = x - bounds.minX + 1;
          const gridRow = y - bounds.minY + 1;

          return (
            <div
              key={`${tile.id}_${x}_${y}`}
              className="hexagon"
              style={{
                gridColumn: gridCol,
                gridRow:    gridRow,
                backgroundColor: tile.color,
                aspectRatio: '0.866 / 1'
              }}
            />
          );
        })}
      </div>
    );
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
                            [[0, 0], [0, -2], [-1, -1], [-2, 0]]];
    const hexTileColours = ['blue', 'gray', 'turquoise', 'magenta'];

    const gridTilePlacement = [[12, 10], [12, 37], [12, 70]];
    const hexTilePlacement = [[80, 10], [80, 35], [80, 60]];

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
