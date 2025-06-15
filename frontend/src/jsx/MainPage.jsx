import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RenderDropDownMenu } from './MainPageSelectPuzzlePopups.jsx';
import Tile from '../model/Tile.js';
import MainPageSelectPuzzlePopups from './MainPageSelectPuzzlePopups.jsx';
import { RenderMainBoard } from './MainPageBoard.jsx';
import PuzzleContext, { PuzzleProvider } from '../context/PuzzleContext.jsx';
import DisplayContext, { DisplayProvider } from '../context/DisplayContext.jsx';
import { sortDaysOfWeek } from '../utility/SortOptions.js';
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
    const { setDayOfMonth, setMonth, setDayOfWeek } = useContext(PuzzleContext);
    const { dateFormat } = useContext(PuzzleContext);
    const { mode } = useContext(DisplayContext);

    const dayOfWeekOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfMonthOptions = Array.from({ length: 31 }, (_, i) => i + 1);
    const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        // Reset the date selections when the mode changes
        setDayOfMonth('');
        setMonth('');
        setDayOfWeek('');
    }, [mode]);

    return (
        <>
            {mode === 'solve' && <div style={{
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
                {dateFormat[2] && <RenderDropDownMenu
                    options={dayOfWeekOptions}
                    message="Day of Week"
                    setState={setDayOfWeek}
                />}
                {dateFormat[1] && <RenderDropDownMenu
                    options={monthOptions}
                    message="Month"
                    setState={setMonth}
                />}
                {dateFormat[0] && <RenderDropDownMenu
                    options={dayOfMonthOptions}
                    message="Day of Month"
                    setState={setDayOfMonth}
                />}
            </div>}
        </>
    )
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
function RenderTileWindow() {
    return (
        <div className="tile-window" onClick={() => {
            // Handle tile click event
            console.log('Tile clicked');
        }}>

        </div>
    );
}

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
    const { mode } = useContext(DisplayContext);

    const handleClick = () => {
        // Logic to handle solving the puzzle
        console.log('Solving puzzle...');
    }

    return (
        <>
            {mode === 'solve' && <button className="typical-button" style={{
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
            </button>}
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


// Renders the left side tile list 
function RenderMainPageLeftSideTileList({ noTiles, setNoTiles }) {
    const { tiles } = useContext(PuzzleContext);
    const { mode } = useContext(DisplayContext);

    const handleNewTileClick = () => {
        setNoTiles(noTiles + 1);
        tiles.current.push(new Tile(`Tile ${noTiles + 1}`, [[0, 0]], []));
    };

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
                    <div className="left-side-tile-list-scroll-pane">
                        {/* Render each tile window in the list */}
                        {tiles.current.map((tile, idx) => (
                            <RenderTileWindow key={idx} tile={tile} />
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
                {noTiles < 12 && mode === "edit" && <button className="typical-button" style={{
                    position: 'absolute',
                    left: '45%',
                    transform: 'translate(-50%)',
                    bottom: '1%',
                    width: '50%',
                    height: '8%',
                    marginBottom: '2%',
                }} onClick={handleNewTileClick}>New Tile</button>}
            </div>
        </>
    )
}

// Renders the count of the number of coords that need to be covered, and the number of coords that are covered
function RenderCoordsCount() {
    const { totalCoordCount, tileCoordsCoverageCount } = useContext(PuzzleContext);

    return (
        <>
            <h1 style={{
                position: 'absolute',
                left: '50%',
                bottom: '5%',
                width: '100%',
                transform: 'translate(-50%)',
                textAlign: 'center',
                margin: '0',
                fontSize: '2vw',
                color: 'var(--header-color)',
            }}>
                {`Coords tiles cover: ${tileCoordsCoverageCount}`}
            </h1>
            <h1 style={{
                position: 'absolute',
                left: '50%',
                bottom: '1%',
                width: '100%',
                transform: 'translate(-50%)',
                textAlign: 'center',
                margin: '0',
                fontSize: '2vw',
                color: 'var(--header-color)',
            }}>
                {`Total coords to cover: ${totalCoordCount}`}
            </h1>
        </>

    )
}

///// RENDER FUNCTIONS /////

// Render main page
function RenderMainPage() {
    const { noTiles, setNoTiles } = useContext(PuzzleContext);

    return (
        <>
            <RenderMainPageLeftSideTileList noTiles={noTiles} setNoTiles={setNoTiles} />
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