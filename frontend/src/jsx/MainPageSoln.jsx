import { useEffect, useState, useContext } from 'react';
import DisplayContext from '../context/DisplayContext';
import PuzzleContext from '../context/PuzzleContext';
/*
Mu Ye Liu - June 2025

Represents the MainPageSoln component for displaying the solution to a puzzle
*/

// Renders the solution for grid puzzles
function RenderSolutionGrid() {
    const { tiles } = useContext(PuzzleContext);

    return (
        <>
            {tiles.current.map((tile) =>
                tile.soln.map((coord) => (
                    <div
                        key={`Soln_${tile.id}_${coord[0]}_${coord[1]}`}
                        style={{
                            gridColumn: coord[0] + 1,
                            gridRow: coord[1] + 1,
                            backgroundColor: tile.color,
                            boxSizing: 'border-box',
                            boxShadow: '0 0 0.2vw var(--box-shadow-color)',
                        }}
                    />
                ))
            )}
        </>
    );
}

// Renders the solution for hex puzzles

function RenderSolutionHex() {
    const { board, tiles } = useContext(PuzzleContext);

    return (
        <></>
    );
}

// Renders the solution on the board
// REQUIRES: Must be called in the same component as the board
export function RenderSolution() {
    const { puzzleType } = useContext(PuzzleContext);
    const { mode } = useContext(DisplayContext);

    return (
        <>
            {mode === 'soln' &&
                <>
                    {puzzleType === 'grid' ? (<RenderSolutionGrid />) : (<RenderSolutionHex />)}
                </>}
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