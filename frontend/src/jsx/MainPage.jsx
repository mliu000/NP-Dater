import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RenderDropDownMenu } from './MainPageSelectPuzzlePopups.jsx';
import Tile from '../model/Tile.js';
import MainPageSelectPuzzlePopups from './MainPageSelectPuzzlePopups.jsx';
import { RenderMainBoard } from './MainPageBoard.jsx';
import PuzzleContext, { PuzzleProvider } from '../context/PuzzleContext.jsx';
import DisplayContext, { DisplayProvider } from '../context/DisplayContext.jsx';
import { sortDaysOfWeek } from '../utility/Utility.js';
import { RenderTileWindow, RenderTilePopup } from './MainPageTiles.jsx';
import { solvePuzzle, isDateOnPuzzle } from '../api/Solve.js';
import { RenderLargeInstancePopup, RenderUnableToSolvePopup, RenderDateNotInPuzzlePopup } from './MainPagePopups.jsx';
import { RenderSolution, RenderSolnBackButton, RenderMainPageSolveTime } from './MainPageSoln.jsx';
import '../css/MainPage.css';

/* 
Mu Ye Liu - June 2025

Represents the instructions page for displaying instructions
*/

///// HELPER FUNCTIONS /////

// Renders the popup for the grid and hex coordinates
function RenderSetCoordPopup() {
    const { board, currX, currY, setCurrX, setCurrY, coordSpecialAttributes, setCoordSpecialAttributes,
        attributeOptionsRemaining, setTotalCoordCount } = useContext(PuzzleContext);
    const { mode, displaySetCoordPopup, setDisplaySetCoordPopup } = useContext(DisplayContext);
    const [selection, setSelection] = useState('');

    const currSpecialAttribute = coordSpecialAttributes.find(attr => attr.Coord[0] === currX && attr.Coord[1] === currY)?.specialAttribute;


    const handleClick = () => {
        const prevSelection = board.current.getSpecialAttribute(currX, currY);

        if (prevSelection !== "") {
            attributeOptionsRemaining.current.push(prevSelection);
            sortDaysOfWeek(attributeOptionsRemaining.current);
        }

        board.current.setSpecialAttribute(currX, currY, selection === "<No Attribute>" ? "" : selection);
        setDisplaySetCoordPopup(false);
        setCoordSpecialAttributes(prev =>
            prev.map(tile =>
                tile.Coord[0] === currX && tile.Coord[1] === currY
                    ? { ...tile, specialAttribute: selection === "<No Attribute>" ? "" : selection }
                    : tile
            )
        );

        // Now, remove the selected attribute from the available choices
        const updatedOptions = attributeOptionsRemaining.current.filter(attr => attr !== selection);
        attributeOptionsRemaining.current = updatedOptions;
        setCurrX(null); setCurrY(null); setSelection('');
    }

    const handleBlockedClick = () => {
        // Handle the case where the user clicks on a blocked coordinate
        board.current.setSpecialAttribute(currX, currY, "blocked");
        setDisplaySetCoordPopup(false);
        setCoordSpecialAttributes(prev =>
            prev.map(tile =>
                tile.Coord[0] === currX && tile.Coord[1] === currY
                    ? { ...tile, specialAttribute: "blocked" }
                    : tile
            )
        );
        setTotalCoordCount(prev => prev - 1);
        setCurrX(null); setCurrY(null); setSelection('');
    }

    const handleUnblockClick = () => {
        board.current.setSpecialAttribute(currX, currY, "");
        setDisplaySetCoordPopup(false);
        setCoordSpecialAttributes(prev =>
            prev.map(tile =>
                tile.Coord[0] === currX && tile.Coord[1] === currY
                    ? { ...tile, specialAttribute: "" }
                    : tile
            )
        );
        setTotalCoordCount(prev => prev + 1);
        setCurrX(null); setCurrY(null); setSelection('');
    }


    if (!displaySetCoordPopup || mode !== 'edit') return null;

    return (
        <div className='small-popup' style={{
            position: 'absolute',
            right: '3%',
            width: '15%',
            top: '30%',
            textAlign: 'center',
            marginTop: '0',
            color: 'var(--text-color)'
        }}>
            <h2 style={{ marginTop: '0', color: 'var(--header-color)' }}>
                Set Special Attribute
            </h2>
            {currSpecialAttribute !== "blocked" ? (
                <>
                    {currSpecialAttribute === "" && <button className='typical-button' style={{
                        fontSize: '1.5vw',
                        textAlign: 'center',
                        width: '50%'
                    }} onClick={handleBlockedClick}>Block</button>}
                    <RenderDropDownMenu
                        options={attributeOptionsRemaining.current}
                        message="<No Attribute>"
                        setState={setSelection}
                    />
                    <button className='typical-button' style={{
                        fontSize: '1.5vw',
                        textAlign: 'center',
                        width: '50%'
                    }} onClick={handleClick}>Set</button>
                </>) : (
                <button className='typical-button' style={{
                    fontSize: '1.5vw',
                    textAlign: 'center',
                    width: '50%'
                }} onClick={handleUnblockClick}>Unblock</button>
            )}
        </div>
    );
}

// Renders the saved message
function RenderSavedMessage() {
    const { saved } = useContext(PuzzleContext);

    return (
        <h2 style={{
            position: 'absolute',
            right: '5%',
            top: '15%',
            textAlign: 'center',
            fontSize: '2vw',
            color: `${saved ? 'lightgreen' : 'red'}`
        }}>
            {saved ? 'Puzzle saved!' : 'Puzzle not saved'}
        </h2>
    );
}

// Renders puzzle date 
function RenderPuzzleDate() {
    const { setDayOfMonth, setMonth, setDayOfWeek, totalCoordCount, tileCoordsCoverageCount } = useContext(PuzzleContext);
    const { dateFormat, noTiles } = useContext(PuzzleContext);
    const { mode } = useContext(DisplayContext);

    const dayOfWeekOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfMonthOptions = Array.from({ length: 31 }, (_, i) => i + 1);
    const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        // Reset the date selections when the mode changes
        setDayOfMonth('Day of Month');
        setMonth('Month');
        setDayOfWeek('Day of Week');
    }, [mode]);

    let toRender = 'date';

    if (tileCoordsCoverageCount !== totalCoordCount) {
        toRender = 'mismatch';
    }

    if (noTiles < 3) {
        toRender = 'noTiles';
    }

    return (
        <>
            {mode === 'solve' &&
                <>
                    {toRender === 'date' && <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'absolute',
                        right: '6%',
                        top: '25%',
                        gap: '1vh',
                    }}>
                        <h2 style={{ fontSize: '2vw', marginBottom: '1vh', color: 'var(--header-color)' }}>
                            Solve For:
                        </h2>
                        {dateFormat[0] && <RenderDropDownMenu
                            options={dayOfWeekOptions}
                            message='Day of Week'
                            setState={setDayOfWeek}
                        />}
                        {dateFormat[2] && <RenderDropDownMenu
                            options={monthOptions}
                            message='Month'
                            setState={setMonth}
                        />}
                        {dateFormat[1] && <RenderDropDownMenu
                            options={dayOfMonthOptions}
                            message='Day of Month'
                            setState={setDayOfMonth}
                        />}
                    </div>}
                    {toRender === 'mismatch' && <h2 style={{
                        position: 'absolute',
                        right: '4%',
                        top: '25%',
                        fontSize: '1.5vw',
                        marginBottom: '1vh',
                        width: '15%',
                        color: 'red',
                        textAlign: 'center'
                    }}>
                        Mismatch between tile coverage and total coords!
                    </h2>}
                    {toRender === 'noTiles' && <h2 style={{
                        position: 'absolute',
                        right: '4%',
                        top: '25%',
                        fontSize: '1.5vw',
                        marginBottom: '1vh',
                        width: '15%',
                        color: 'red',
                        textAlign: 'center'
                    }}>
                        At least 3 tiles are required.
                    </h2>}
                </>
            }
        </>
    );
}

// Renders the back button
function RenderBackButton() {
    const navigate = useNavigate();

    return (
        <button className="typical-button" style={{
            position: 'absolute',
            right: '2%',
            bottom: '2%',
            width: '25%',
            height: '8%',
            margin: '0'
        }}
            onClick={() => { navigate('/front-page'); }}>
            Back To Front Page
        </button>
    );
}

// Renders the choose puzzle button
function RenderChoosePuzzleButton() {
    const { setDisplayedPopup } = useContext(DisplayContext);

    return (
        <button className="typical-button" style={{
            position: 'absolute',
            right: '2%',
            bottom: '12%',
            width: '20%',
            height: '8%',
            margin: '0'
        }} onClick={() => { setDisplayedPopup('startup'); }}>
            Choose Puzzle
        </button>
    );
}

// Renders the save solution 
function RenderSaveButton() {
    const { setSaved, setCurrX, setCurrY } = useContext(PuzzleContext);
    const { mode, setMode, setDisplaySetCoordPopup } = useContext(DisplayContext);

    const handleSavePuzzleClick = () => {
        setSaved(true);
        setDisplaySetCoordPopup(false);
        setMode('solve');
        setCurrX(null); setCurrY(null);
    }

    const handleEditPuzzleClick = () => {
        setMode('edit');
    }

    return (
        <>
            {mode === 'solve' && <button className="typical-button" style={{
                position: 'absolute',
                right: '2%',
                bottom: '22%',
                width: '20%',
                height: '8%',
                margin: '0'
            }} onClick={handleEditPuzzleClick}>
                Edit Puzzle
            </button>}
            {mode === 'edit' && <button className="typical-button" style={{
                position: 'absolute',
                right: '2%',
                bottom: '22%',
                width: '20%',
                height: '8%',
                margin: '0'
            }} onClick={handleSavePuzzleClick}>
                Save Puzzle
            </button>}
        </>

    );
}

// Function to render each of the tile Windows in the tile list

// Renders the puzzle name
function RenderPuzzleName() {
    const { puzzleName } = useContext(PuzzleContext);

    return (
        <h1 style={{
            position: 'absolute',
            left: '65%',
            width: '70%',
            top: '0%',
            transform: 'translate(-50%)',
            textAlign: 'center',
            margin: '0',
            fontSize: '5vw',
            color: 'var(--header-color)',
        }}>{puzzleName}</h1>
    );
}

// Render solve puzzle button
function RenderSolvePuzzleButton() {
    const { setMode, mode, setDisplayLargeInstancePopup, setDisplayUnableToSolvePopup,
        setDisplayDateNotInPuzzlePopup } = useContext(DisplayContext);
    const { board, tiles, dayOfMonth, month, dayOfWeek, totalCoordCount, dateFormat,
        tileCoordsCoverageCount, puzzleType, noTiles, solveTime } = useContext(PuzzleContext);


    // condition where if dateFormat is chosen, do not display the button if date is not chosen
    // Change to useState
    const [displayButtonDateCondition, setDisplayButtonDateCondition] = useState([false, false, false]);

    useEffect(() => {
        setDisplayButtonDateCondition([
            dateFormat[0] ? dayOfWeek !== 'Day of Week' : true,
            dateFormat[1] ? dayOfMonth !== 'Day of Month' : true,
            dateFormat[2] ? month !== 'Month' : true
        ]);
    }, [dayOfWeek, dayOfMonth, month, dateFormat]);

    const handleClick = async () => {
        const dateList = [];
        if (dateFormat[0]) dateList.push(dayOfWeek);
        if (dateFormat[2]) dateList.push(month);
        if (dateFormat[1]) dateList.push(dayOfMonth);
        if (!isDateOnPuzzle(dateList, board.current, puzzleType)) {
            setDisplayDateNotInPuzzlePopup(true);
        } else if ((puzzleType === 'grid' && totalCoordCount > 55 && noTiles > 8) ||
            (puzzleType === 'hex' && totalCoordCount > 45 && noTiles > 8)) {
            setDisplayLargeInstancePopup(true);
        } else {
            const response = await solvePuzzle(tiles.current, board.current, puzzleType, dateList, solveTime);
            if (response === 1) {
                setDisplayUnableToSolvePopup(true);
            } else {
                setMode('soln');
            }
        }

    }

    return (
        <>
            {mode === 'solve' && displayButtonDateCondition.every(condition => condition) &&
                tileCoordsCoverageCount === totalCoordCount && <button className="typical-button" style={{
                    position: 'absolute',
                    right: '2%',
                    bottom: '32%',
                    width: '20%',
                    height: '8%',
                    margin: '0',
                    color: 'gold',
                    border: '0.2vw solid gold'
                }} onClick={handleClick}>
                    Solve Puzzle
                </button >}
        </>
    )
}

// Renders the no puzzle selected message
function RenderNoPuzzleSelected() {
    const { puzzleName } = useContext(PuzzleContext);

    return (
        <>
            {puzzleName === '' && <h2 style={{
                position: 'absolute',
                left: '65%',
                width: '30%',
                top: '40%',
                transform: 'translate(-50%)',
                textAlign: 'center',
                margin: '0',
                fontSize: '3vw',
                color: 'red'
            }}>
                No Puzzle Selected! Click the "Choose Puzzle" button to select a puzzle.
            </h2>}
        </>
    );
}

// Renders the button to create a new tile
function RenderCreateNewTileButton() {
    const { tiles, setTileCoordList, noTiles, setNoTiles, totalNoTileCreatedHistory } = useContext(PuzzleContext);

    const handleClick = () => {
        const newTileId = `Tile_${totalNoTileCreatedHistory.current}`;
        tiles.current.push(new Tile(newTileId, [[0, 0]], [], '#ffffff'));
        setTileCoordList(prev => [...prev, { id: newTileId, coords: [[0, 0]], color: '#ffffff' }]);
        setNoTiles(noTiles + 1);
        totalNoTileCreatedHistory.current += 1;
    };

    return (
        <button className="typical-button" style={{
            position: 'absolute',
            left: '45%',
            transform: 'translate(-50%)',
            bottom: '1%',
            width: '50%',
            height: '8%',
            marginBottom: '2%',
        }} onClick={handleClick}>
            New Tile
        </button>
    );
}


// Renders the left side tile list 
function RenderMainPageLeftSideTileList() {
    const { tiles, noTiles } = useContext(PuzzleContext);
    const { mode } = useContext(DisplayContext);

    const buttonAppear = noTiles < 12 && mode === "edit";

    return (
        <>
            <div className="left-side-tile-list">
                <h1 style={{
                    position: 'absolute',
                    left: '50%',
                    width: '100%',
                    transform: 'translate(-50%)',
                    textAlign: 'center',
                    margin: '0',
                    fontSize: '5vw',
                    color: 'var(--header-color)',
                }}>Tiles: {noTiles}</h1>
                {noTiles > 0 ? (
                    <div className="left-side-tile-list-scroll-pane" style={{ height: buttonAppear ? '75%' : '85%' }}>
                        {/* Render each tile window in the list */}
                        {tiles.current.map((tile) => (
                            <RenderTileWindow key={tile.id} tileId={tile.id} />
                        ))}
                    </div>
                ) : (
                    <h1 style={{
                        position: 'absolute',
                        margin: '0',
                        fontSize: '3vw',
                        color: 'Red',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%)',
                        textAlign: 'center',
                    }}>No Tiles Yet!</h1>
                )
                }
                {buttonAppear && <RenderCreateNewTileButton />}
            </div>
        </>
    )
}

// Renders the count of the number of coords that need to be covered, and the number of coords that are covered
function RenderCoordsCount() {
    const { totalCoordCount, tileCoordsCoverageCount, setTileCoordsCoverageCount,
        tileCoordList } = useContext(PuzzleContext);
    const { mode } = useContext(DisplayContext);

    useEffect(() => {
        setTileCoordsCoverageCount(tileCoordList.reduce((acc, tile) => acc + tile.coords.length, 0));
    }, [tileCoordList]);

    return (
        <>
            {mode !== 'soln' &&
                <>
                    <h1 style={{
                        position: 'absolute',
                        left: '50%',
                        bottom: '5%',
                        width: '35%',
                        transform: 'translate(-50%)',
                        textAlign: 'center',
                        margin: '0',
                        fontSize: '2vw',
                        color: 'var(--header-color)',
                    }}>
                        {`Coords tiles cover: ${tileCoordsCoverageCount} cells`}
                    </h1>
                    <h1 style={{
                        position: 'absolute',
                        left: '50%',
                        bottom: '1%',
                        width: '35%',
                        transform: 'translate(-50%)',
                        textAlign: 'center',
                        margin: '0',
                        fontSize: '2vw',
                        color: 'var(--header-color)',
                    }}>
                        {`Total coords to cover: ${totalCoordCount} cells`}
                    </h1>
                </>
            }
        </>
    )
}

///// RENDER FUNCTIONS /////

// Render main page
function RenderMainPage() {
    const { tiles, tileCoordList, solveTime } = useContext(PuzzleContext);

    return (
        <>
            <RenderMainPageLeftSideTileList />
            <RenderBackButton />
            <RenderSaveButton />
            <RenderChoosePuzzleButton />
            <RenderPuzzleName />
            <RenderNoPuzzleSelected />
            <RenderSolvePuzzleButton />
            <RenderSavedMessage />
            <RenderPuzzleDate />
            <RenderSetCoordPopup />
            <RenderCoordsCount />
            <RenderTilePopup />
            <RenderLargeInstancePopup />
            <RenderUnableToSolvePopup />
            <RenderDateNotInPuzzlePopup />
            <RenderMainPageSolveTime />
            <RenderSolnBackButton />
        </>
    );
}

///// MAIN FUNCTION /////

export default function MainPage() {

    useEffect(() => {
        // Set the page title
        document.title = 'NP-Dater - Main Page';
    }, []);

    return (
        <PuzzleProvider>
            <DisplayProvider>
                <MainPageSelectPuzzlePopups />
                <RenderMainPage />
                <RenderMainBoard />
            </DisplayProvider>
        </PuzzleProvider>

    );
}