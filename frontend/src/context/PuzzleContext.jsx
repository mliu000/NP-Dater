import { createContext, useRef, useState } from 'react';
/*
Mu Ye Liu - June 2025

Represents the PuzzleContext for managing the puzzle state in the application
*/

const PuzzleContext = createContext(null);
export default PuzzleContext;

export function PuzzleProvider({ children }) {
    // UseRefs
    const board = useRef(null);
    const tiles = useRef([]);

    // useStates
    const [noTiles, setNoTiles] = useState(0);
    const [saved, setSaved] = useState(false);
    const [puzzleName, setPuzzleName] = useState('');
    const [gridWidth, setGridWidth] = useState("Select Width");
    const [gridHeight, setGridHeight] = useState("Select Height");
    const [hexRadius, setHexRadius] = useState("Select Radius");
    const [puzzleType, setPuzzleType] = useState('');
    const [hexagonOrientation, setHexagonOrientation] = useState(''); // 'flat' or 'pointy'
    const [dateFormat, setDateFormat] = useState(new Array(3).fill(false));
    const [renderBoard, setRenderBoard] = useState(false);

    // On the main page 
    const [dayOfMonth, setDayOfMonth] = useState('');
    const [month, setMonth] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');

    return (
        <PuzzleContext.Provider value={{
            board, tiles,
            saved, setSaved,
            noTiles, setNoTiles,
            puzzleName, setPuzzleName,
            gridWidth, setGridWidth,
            gridHeight, setGridHeight,
            hexRadius, setHexRadius,
            puzzleType, setPuzzleType,
            hexagonOrientation, setHexagonOrientation,
            dateFormat, setDateFormat,
            renderBoard, setRenderBoard,
            dayOfMonth, setDayOfMonth,
            month, setMonth,
            dayOfWeek, setDayOfWeek
        }}> 
            {children}
        </PuzzleContext.Provider>
    );
}