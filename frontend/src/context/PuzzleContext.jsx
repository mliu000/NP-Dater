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
    const totalNoTileCreatedHistory = useRef(0);
    const attributeOptionsRemaining = useRef([]);
    const solveTime = useRef(0);
    const abortController = useRef(new AbortController());
    const aborted = useRef(false);

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
    const [totalCoordCount, setTotalCoordCount] = useState(0);
    const [tileCoordsCoverageCount, setTileCoordsCoverageCount] = useState(0);

    const [currX, setCurrX] = useState(null);
    const [currY, setCurrY] = useState(null);
    const [currTileSelected, setCurrTileSelected] = useState(null); // id, coords, and colour

    // List based useStates
    const [coordSpecialAttributes, setCoordSpecialAttributes] = useState([]);
    const [tileCoordList, setTileCoordList] = useState([]);


    // On the main page 
    const [dayOfMonth, setDayOfMonth] = useState('Day of Month');
    const [month, setMonth] = useState('Month');
    const [dayOfWeek, setDayOfWeek] = useState('Day of Week');

    return (
        <PuzzleContext.Provider value={{
            board, tiles,
            attributeOptionsRemaining, totalNoTileCreatedHistory, solveTime, abortController, aborted,
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
            dayOfWeek, setDayOfWeek,
            coordSpecialAttributes, setCoordSpecialAttributes,
            tileCoordList, setTileCoordList,
            totalCoordCount, setTotalCoordCount,
            tileCoordsCoverageCount, setTileCoordsCoverageCount,
            currX, setCurrX,
            currY, setCurrY,
            currTileSelected, setCurrTileSelected
        }}>
            {children}
        </PuzzleContext.Provider>
    );
}