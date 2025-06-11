import { createContext, useState } from 'react';
/*
Mu Ye Liu - June 2025

Represents the PuzzleContext for managing the puzzle state in the application
*/

const PuzzleContext = createContext(null);
export default PuzzleContext;

export function PuzzleProvider({ children }) {
    const [puzzleName, setPuzzleName] = useState('');
    const [gridWidth, setGridWidth] = useState("Select Width");
    const [gridHeight, setGridHeight] = useState("Select Height");
    const [hexRadius, setHexRadius] = useState("Select Radius");
    const [puzzleType, setPuzzleType] = useState('');
    const [dateFormat, setDateFormat] = useState(new Array(3).fill(false));
    const [renderBoard, setRenderBoard] = useState(false);

    return (
        <PuzzleContext.Provider value={{
            puzzleName, setPuzzleName,
            gridWidth, setGridWidth,
            gridHeight, setGridHeight,
            hexRadius, setHexRadius,
            puzzleType, setPuzzleType,
            dateFormat, setDateFormat,
            renderBoard, setRenderBoard
        }}>
            {children}
        </PuzzleContext.Provider>
    );
}