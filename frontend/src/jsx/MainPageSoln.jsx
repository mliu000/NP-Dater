import { useContext } from 'react';
import DisplayContext from '../context/DisplayContext';
import PuzzleContext from '../context/PuzzleContext';
/*
Mu Ye Liu - June 2025

Represents the MainPageSoln component for displaying the solution to a puzzle
*/

// Renders the solution for hex puzzles
export function RenderHexSolution({ tileWidth, bounds, aspectRatio }) {
    const { tiles } = useContext(PuzzleContext);
    const { mode } = useContext(DisplayContext);

    return (
        <>
            {mode === 'soln' &&
                <>
                    {tiles.current.map((tile) =>
                        tile.soln.map((coord) => {
                            const x = coord[0];
                            const y = coord[1];

                            const z = -x - y;
                            const offsetX = x + z / 2;

                            const relativeX = offsetX - bounds.minOffsetX;
                            const relativeY = z - bounds.minZ;

                            const left = (relativeX / (bounds.maxOffsetX - bounds.minOffsetX + 1)) * 100;
                            const top = relativeY * (tileWidth * aspectRatio * (Math.sqrt(3) / 2));

                            return (
                                <div
                                    key={`Soln_${tile.id}_${x}_${y}`}
                                    className="hexagon"
                                    style={{
                                        position: 'absolute',
                                        left: `${left}%`,
                                        top: `${top}%`,
                                        width: `${tileWidth}%`,
                                        backgroundColor: tile.color,
                                        filter: 'drop-shadow(0 0 0.2vw var(--box-shadow-color))',
                                        zIndex: '100',
                                    }}
                                />
                            );
                        })

                    )}
                </>}
        </>
    );
}

// Renders the solution on the board
// REQUIRES: Must be called in the same component as the board
export function RenderGridSolution() {
    const { tiles } = useContext(PuzzleContext);
    const { mode } = useContext(DisplayContext);

    return (
        <>
            {mode === 'soln' && (
                tiles.current.map((tile) =>
                    tile.soln.map((coord) => (
                        <div
                            key={`Soln_${tile.id}_${coord[0]}_${coord[1]}`}
                            style={{
                                gridColumn: coord[0] + 1,
                                gridRow: coord[1] + 1,
                                backgroundColor: tile.color,
                                boxSizing: 'border-box',
                                boxShadow: '0 0 0.2vw var(--box-shadow-color)',
                                zIndex: '100',
                            }}
                        />
                    ))
                )
            )}
        </>
    );
}

// Renders the back button in the same place as the back button
export function RenderSolnBackButton() {
    const { mode, setMode } = useContext(DisplayContext);

    return (
        <>
            {mode === 'soln' && (
                <button className="typical-button" style={{
                    position: 'absolute',
                    right: '2%',
                    bottom: '22%',
                    width: '20%',
                    height: '8%',
                    margin: '0',
                }} onClick={() => setMode('solve')}>
                    Back to Solve
                </button>
            )}
        </>
    );
}

// Renders the main page solve time
export function RenderMainPageSolveTime() {
    const { solveTime } = useContext(PuzzleContext);
    const { mode } = useContext(DisplayContext);

    return (
        <>
            {mode === 'soln' && (
                <h2 style={{
                    position: 'absolute',
                    left: '43%',
                    bottom: '0%',
                    color: 'gold',
                    fontSize: '2vw',
                    textAlign: 'center',
                }}>
                    Solve Time: {(solveTime.current / 1000).toFixed(3)} sec
                </h2>
            )}
        </>
    );
}