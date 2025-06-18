import { useContext } from 'react';
import PuzzleContext from '../context/PuzzleContext.jsx';
import DisplayContext from '../context/DisplayContext.jsx';

/*
Mu Ye Liu - June 2025

Represents the main page popups for displaying various messages and warnings
*/

// Renders the unable to solve popup
export function RenderUnableToSolvePopup() {
    const { displayUnableToSolvePopup, setDisplayUnableToSolvePopup } = useContext(DisplayContext);

    return (
        <>
            {displayUnableToSolvePopup &&
                <div className='popup-background' onClick={() => setDisplayUnableToSolvePopup(false)}>
                    <div className='popup-wrapper' onClick={e => e.stopPropagation()}>
                        <div className='popup-content'>
                            <h1 style={{ color: 'var(--header-color)', fontSize: '3vw' }}>Unable to Solve</h1>
                            <h2 style={{ color: 'red' }}>
                                The puzzle could not be solved with the current configuration.
                            </h2>
                            <button className="typical-button" style={{
                                width: '50%'
                            }} onClick={() => setDisplayUnableToSolvePopup(false)}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>}
        </>
    )
}

// Renders the date not in puzzle popoup
export function RenderDateNotInPuzzlePopup() {
    const { displayDateNotInPuzzlePopup, setDisplayDateNotInPuzzlePopup } = useContext(DisplayContext);

    return (
        <>
            {displayDateNotInPuzzlePopup &&
                <div className='popup-background' onClick={() => setDisplayDateNotInPuzzlePopup(false)}>
                    <div className='popup-wrapper' onClick={e => e.stopPropagation()}>
                        <div className='popup-content'>
                            <h1 style={{ color: 'var(--header-color)', fontSize: '3vw' }}>Date Not in Puzzle</h1>
                            <h2 style={{ color: 'red' }}>
                                The date you entered is not in the puzzle. Please try again.
                            </h2>
                            <button className="typical-button" style={{
                                width: '50%'
                            }} onClick={() => setDisplayDateNotInPuzzlePopup(false)}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>}
        </>
    )
}

// Renders the not saved popup
export function RenderNotSavedPopup() {
    const { notSavedPopup, setNotSavedPopup } = useContext(DisplayContext);

    return (
        <>
            {notSavedPopup &&
                <div className='popup-background' onClick={() => setNotSavedPopup(false)}>
                    <div className='popup-wrapper' onClick={e => e.stopPropagation()}>
                        <div className='popup-content'>
                            <h1 style={{ color: 'var(--header-color)', fontSize: '3vw' }}>Unable to Save</h1>
                            <h2 style={{ color: 'red' }}>
                                Unable to save puzzle. Please try again later.
                            </h2>
                            <button className="typical-button" style={{
                                width: '50%'
                            }} onClick={() => setNotSavedPopup(false)}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>}
        </>
    )
}


// Renders the unusually large instance popup
export function RenderLargeInstancePopup() {
    const { setMode, displayLargeInstancePopup, setDisplayLargeInstancePopup } = useContext(DisplayContext);
    const { board, tiles, dayOfMonth, month, dayOfWeek, dateFormat, solveTime } = useContext(PuzzleContext);

    const handleSolveClick = async () => {
        const dateList = [];
        if (dateFormat[0]) dateList.push(dayOfWeek);
        if (dateFormat[2]) dateList.push(month);
        if (dateFormat[1]) dateList.push(dayOfMonth);
        const response = await solvePuzzle(tiles.current, board.current, puzzleType, dateList, solveTime);
        if (response === 1) {
            setDisplayUnableToSolvePopup(true);
        } else {
            setMode('soln');
        }
        setDisplayLargeInstancePopup(false);
    }

    return (
        <>
            {displayLargeInstancePopup &&
                <div className='popup-background' onClick={() => setDisplayLargeInstancePopup(false)}>
                    <div className='popup-wrapper' onClick={e => e.stopPropagation()}>
                        <div className='popup-content'>
                            <h1 style={{ color: 'var(--header-color)', fontSize: '3vw' }}>Warning:</h1>
                            <h2 style={{ color: 'red' }}>
                                This is an unusually large instance! This could take a long time to solve.</h2>
                            <button className="typical-button" style={{
                                marginBottom: '0',
                                width: '50%',
                                color: 'gold',
                                border: '0.2vw solid gold'
                            }} onClick={handleSolveClick}>
                                Solve
                            </button>
                            <button className="typical-button" style={{
                                width: '50%'
                            }} onClick={() => setDisplayLargeInstancePopup(false)}>
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>}
        </>
    )
}
