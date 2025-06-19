import React, { useState, useContext, useEffect } from 'react';
import PuzzleContext from '../context/PuzzleContext';
import DisplayContext from '../context/DisplayContext';
import GridBoard from '../model/GridBoard';
import HexBoard from '../model/HexBoard';
import { getAllPuzzleInfo } from '../api/Persistence';
import { loadExistingPuzzle, resetContextToDefault } from '../load/LoadExistingPuzzle';
import { getSpecificPuzzle } from '../api/Persistence';

/*
Mu Ye Liu - June 2025

Represents the popups used in the main page
*/

///// HELPER FUNCTIONS /////

// Renders the input for the puzzle name
function RenderInputs({ setInputValue, invalidInput }) {
    return (<input
        type="text"
        placeholder="Puzzle Name"
        style={{
            width: '100%',
            height: '3vh',
            fontSize: '1.5vw'
        }}
        onChange={(e) => setInputValue(e.target.value)}
        maxLength={15}
        className={invalidInput ? 'invalid-input' : ''}
    />);
}

/* Renders the dropdown menu for selecting puzzle size
REQUIRES: options - an array of objects with 'label' and 'value' properties, default is empty array
*/
export function RenderDropDownMenu({ options = [], message, setState, invalidInput }) {
    return (
        <select onChange={(e) => setState(e.target.value)} style={{ fontSize: '1.5vw' }} className={invalidInput ? 'invalid-input' : ''}>
            <option value={`${message}`}>{message}</option>
            {options.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
            ))}
        </select>
    );
}


function RenderCreateNewPuzzleMiddleComponent({ localConfig, setLocalConfig }) {
    // Resets all the context useStates when the component mounts

    return (
        <div style={{
            width: '80%',
            textAlign: 'center'
        }}>
            <h2>
                Puzzle Name:
            </h2>
            <RenderInputs
                setInputValue={(value) => setLocalConfig(prev => ({ ...prev, name: value }))}
                invalidInput={localConfig.invalidInput}
            />
            <h2>
                Puzzle type:
            </h2>
            <label style={{ display: 'block', fontSize: '1.5vw', marginBottom: '1vh' }}>
                <input type="radio" name="puzzleType" value="grid"
                    onChange={(e) => setLocalConfig(prev => ({ ...prev, type: e.target.value, invalidInput: false }))}
                    style={{ marginRight: '1vw' }}
                />
                Grid Puzzle
            </label>
            <label style={{ display: 'block', fontSize: '1.5vw', marginBottom: '1vh' }}>
                <input type="radio" name="puzzleType" value="hex"
                    onChange={(e) => setLocalConfig(prev => ({ ...prev, type: e.target.value, invalidInput: false }))}
                    style={{ marginRight: '1vw' }}
                />
                Hex Puzzle
            </label>
            <h2 style={{ fontSize: '1.5vw' }}>
                Date Format:
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '1.5vw' }}>
                <label>
                    <input type="checkbox" value="Option1"
                        onChange={() => setLocalConfig(prev => ({
                            ...prev,
                            dateFormat: prev.dateFormat.map((val, idx) => idx === 0 ? !val : val)
                        }))}
                    />
                    Day of the Week
                </label>
                <label>
                    <input type="checkbox" value="Option2"
                        onChange={() => setLocalConfig(prev => ({
                            ...prev,
                            dateFormat: prev.dateFormat.map((val, idx) => idx === 1 ? !val : val)
                        }))}
                    />
                    Day of the Month
                </label>
                <label>
                    <input type="checkbox" value="Option3"
                        onChange={() => setLocalConfig(prev => ({
                            ...prev,
                            dateFormat: prev.dateFormat.map((val, idx) => idx === 2 ? !val : val)
                        }))}
                    />
                    Month
                </label>
            </div>
            {localConfig.type === 'grid' && (
                <>
                    <h2 style={{ fontSize: '1.5vw' }}>
                        Width and Height:
                    </h2>
                    <RenderDropDownMenu
                        options={['5', '6', '7', '8']}
                        message="Select Width"
                        setState={(value) => setLocalConfig(prev => ({ ...prev, gridWidth: value }))}
                        invalidInput={localConfig.invalidInput}
                    />
                    <RenderDropDownMenu
                        options={['5', '6', '7', '8']}
                        message="Select Height"
                        setState={(value) => setLocalConfig(prev => ({ ...prev, gridHeight: value }))}
                        invalidInput={localConfig.invalidInput}
                    />
                </>
            )}
            {localConfig.type === 'hex' && (
                <>
                    <h2 style={{ fontSize: '1.5vw' }}>
                        Radius:
                    </h2>
                    <RenderDropDownMenu
                        options={['2', '3', '4', '5']}
                        message="Select Radius"
                        setState={(value) => setLocalConfig(prev => ({ ...prev, hexRadius: value }))}
                        invalidInput={localConfig.invalidInput}
                    />
                    <h2>
                        Hexagon Orientation
                    </h2>
                    <label style={{ display: 'block', fontSize: '1.5vw', marginBottom: '1vh' }}>
                        <input type="radio" name="hex-orientation" value="flat-top"
                            onChange={(e) => setLocalConfig(prev => ({ ...prev, hexagonOrientation: e.target.value }))}
                            style={{ marginRight: '1vw' }}
                        />
                        Flat Top
                    </label>
                    <label style={{ display: 'block', fontSize: '1.5vw', marginBottom: '1vh' }}>
                        <input type="radio" name="hex-orientation" value="pointy-top"
                            onChange={(e) => setLocalConfig(prev => ({ ...prev, hexagonOrientation: e.target.value }))}
                            style={{ marginRight: '1vw' }}
                        />
                        Pointy Top
                    </label>
                </>
            )}
            {localConfig.invalidInput && (
                <p style={{ color: 'red', fontSize: '1.5vw' }}>
                    Please fill in all fields before proceeding.
                </p>
            )}
            {localConfig.userNameTaken && (
                <p style={{ color: 'red', fontSize: '1.5vw' }}>
                    This puzzle name is already taken. Please choose a different name.
                </p>
            )}
        </div>
    );
}

// Popup render template function 
function RenderPopupTemplate({ title, arbitrary, buttons, setDisplayedPopup }) {
    return (
        <div className="popup-background" onClick={() => setDisplayedPopup('')}>
            <div className="popup-wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="popup-content">
                    <h1 style={{
                        textDecoration: 'underline',
                        textAlign: 'center',
                        color: 'var(--header-color)',
                        fontSize: '4vw',
                        marginBottom: '1vh',
                    }}>
                        {title}
                    </h1>
                    {arbitrary}
                    {buttons.map(({ label, onClick }, idx) => (
                        <button
                            key={idx}
                            className="typical-button"
                            style={{
                                width: '80%',
                                height: '7vw',
                                marginBottom: '1vh',
                                fontSize: '2vw'
                            }}
                            onClick={onClick}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

///// RENDER FUNCTIONS /////

function RenderChooseExistingPuzzlePopup({ setDisplayedPopup }) {
    const [listOfPuzzleInfo, setListOfPuzzleInfo] = useState(null);
    const [deleteModeSelected, setDeleteModeSelected] = useState(false);
    const puzzleCxt = useContext(PuzzleContext);
    const displayCxt = useContext(DisplayContext);

    useEffect(() => {
        const fetchData = async () => {
            const allPuzzleInfo = await getAllPuzzleInfo();
            setListOfPuzzleInfo(allPuzzleInfo);
        };
        fetchData();
    }, []);

    const handlePuzzleClick = async (puzzleName) => {
        await loadExistingPuzzle(puzzleName, displayCxt, puzzleCxt);
    };

    return (
        <RenderPopupTemplate
            title="Existing Puzzles:"
            arbitrary={
                <>
                    <div className='horizontal-flex'>
                        <p>Select Mode</p>
                        <label className="rocker-switch">
                            <input type="checkbox" checked={deleteModeSelected} onChange={() => setDeleteModeSelected(!deleteModeSelected)} />
                            <span className="slider" />
                        </label>
                        <p>Delete Mode</p>
                    </div>
                    <div className='three-col-list' style={{ width: '100%' }}>
                        <h2>Name</h2>
                        <h2>Type</h2>
                        <h2>Date Created</h2>
                        {listOfPuzzleInfo ? listOfPuzzleInfo.map((puzzle, idx) => (
                            <React.Fragment key={idx}>
                                <h3 onClick={() => handlePuzzleClick(puzzle.puzzleName)} style={{
                                    marginTop: '0.2vh',
                                    marginBottom: '0.2vh',
                                    padding: '0',
                                    textAlign: 'center',
                                    color: `${deleteModeSelected ? 'red' : 'blue'}`,
                                    cursor: 'pointer',
                                    fontSize: '1.5vw',
                                }}>{puzzle.puzzleName}</h3>
                                <h3 style={{
                                    marginTop: '0.2vh',
                                    marginBottom: '0.2vh',
                                    textAlign: 'center',
                                    color: 'var(--text-color)',
                                    fontSize: '1.5vw',
                                }}>{puzzle.puzzleType === 0 ? 'Grid' : 'Hex'}</h3>
                                <h3 style={{
                                    marginTop: '0.2vh',
                                    marginBottom: '0.2vh',
                                    textAlign: 'center',
                                    color: 'var(--text-color)',
                                    fontSize: '1.5vw',
                                }}>{puzzle.dateCreated}</h3>
                            </React.Fragment>
                        )) : (
                            <p style={{
                                textAlign: 'center',
                                color: 'var(--text-color)',
                            }}>No puzzles found.</p>
                        )}
                    </div>
                </>
            }
            buttons={[
                {
                    label: "Back",
                    onClick: () => setDisplayedPopup('startup')
                }
            ]}
            setDisplayedPopup={setDisplayedPopup}
        />
    );
}

// Renders the create new puzzle popup (uses context to manage state)
function RenderCreateNewPuzzlePopup({ setDisplayedPopup }) {
    const [invalidSelection, setInvalidSelection] = useState(false);

    const puzzleCxt = useContext(PuzzleContext);
    const displayCxt = useContext(DisplayContext);

    const [localConfig, setLocalConfig] = useState({
        type: '',
        name: '',
        gridWidth: 'Select Width',
        gridHeight: 'Select Height',
        hexRadius: 'Select Radius',
        hexagonOrientation: '',
        dateFormat: [false, false, false],
        invalidInput: false,
        userNameTaken: false
    });

    useEffect(() => {
        if (localConfig.type === 'grid') {
            setLocalConfig(prev => ({
                ...prev,
                hexRadius: 'Select Radius',
                hexagonOrientation: ''
            }));
        } else if (localConfig.type === 'hex') {
            setLocalConfig(prev => ({
                ...prev,
                gridWidth: 'Select Width',
                gridHeight: 'Select Height'
            }));
        }
    }, [localConfig.type]);

    const handleClick = async () => {
        // Check if the puzzle name is already taken
        try {
            const existing = await getSpecificPuzzle(localConfig.name);
            if (existing) {
                // 🚫 Name is taken — show error
                setLocalConfig(prev => ({
                    ...prev,
                    userNameTaken: true,
                    invalidInput: false
                }));
                return;
            }
        } catch (err) {
            if (err.message.includes("not found")) {
                // Proceed if not exists. 
            } else {
                console.error("Unexpected error while checking name:", err);
                return;
            }
        }

        resetContextToDefault(displayCxt, puzzleCxt);
        // Initialize the board
        if (localConfig.type === 'grid') {
            puzzleCxt.board.current = new GridBoard(parseInt(localConfig.gridWidth), parseInt(localConfig.gridHeight));
            const specialAttributes = puzzleCxt.board.current.gridCoords.map(coord => ({
                Coord: coord.Coord,
                specialAttribute: coord.specialAttribute
            }));
            puzzleCxt.setCoordSpecialAttributes(specialAttributes);
        } else if (localConfig.type === 'hex') {
            puzzleCxt.board.current = new HexBoard(parseInt(localConfig.hexRadius));
            const specialAttributes = puzzleCxt.board.current.hexCoords.map(coord => ({
                Coord: coord.Coord,
                specialAttribute: coord.specialAttribute
            }));
            puzzleCxt.setCoordSpecialAttributes(specialAttributes);
        }

        // Initialize attribute options
        if (localConfig.dateFormat[0]) {
            const dayOfWeekOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            puzzleCxt.attributeOptionsRemaining.current.push(...dayOfWeekOptions);
        }
        if (localConfig.dateFormat[2]) {
            const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            puzzleCxt.attributeOptionsRemaining.current.push(...monthOptions);
        }
        if (localConfig.dateFormat[1]) {
            const dayOfMonthOptions = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
            puzzleCxt.attributeOptionsRemaining.current.push(...dayOfMonthOptions);
        }

        // Initialize the useStates
        // Update the syntax to use displayCxt and puzzleCxt
        // Remove redundant ones
        displayCxt.setMode('edit');
        displayCxt.setDisplayedPopup('');
        puzzleCxt.setRenderBoard(true);
        puzzleCxt.setPuzzleName(localConfig.name);
        puzzleCxt.setPuzzleType(localConfig.type);
        puzzleCxt.setGridWidth(localConfig.gridWidth);
        puzzleCxt.setGridHeight(localConfig.gridHeight);
        puzzleCxt.setHexRadius(localConfig.hexRadius);
        puzzleCxt.setHexagonOrientation(localConfig.hexagonOrientation);
        puzzleCxt.setDateFormat(localConfig.dateFormat);
        puzzleCxt.setTotalCoordCount((puzzleCxt.board.current.gridCoords ? puzzleCxt.board.current.gridCoords.length : puzzleCxt.board.current.hexCoords.length)
            - localConfig.dateFormat.filter(format => format).length);
    };

    return (
        <RenderPopupTemplate
            title="New Puzzle:"
            arbitrary={
                <RenderCreateNewPuzzleMiddleComponent
                    localConfig={localConfig}
                    setLocalConfig={setLocalConfig}
                    invalidSelection={invalidSelection}
                    setInvalidSelection={setInvalidSelection}
                />
            }
            buttons={[
                {
                    label: "Start",
                    onClick: () => {
                        const isGridInvalid = localConfig.type === 'grid' &&
                            (localConfig.gridWidth === 'Select Width' || localConfig.gridHeight === 'Select Height');
                        const isHexInvalid = localConfig.type === 'hex' &&
                            (localConfig.hexRadius === 'Select Radius' || localConfig.hexagonOrientation === '');
                        const isDateInvalid = localConfig.dateFormat.every(format => !format);

                        if (localConfig.name === '' || localConfig.type === '' || isGridInvalid || isHexInvalid || isDateInvalid) {
                            setLocalConfig(prev => ({ ...prev, invalidInput: true, userNameTaken: false }));
                        } else {
                            handleClick();
                        }
                    }
                },
                {
                    label: "Back",
                    onClick: () => setDisplayedPopup('startup')
                }
            ]}
            setDisplayedPopup={setDisplayedPopup}
        />
    );
}

// Renders the startup options popup
function RenderStartupOptionsPopup({ setDisplayedPopup }) {
    return (
        <RenderPopupTemplate
            title="Options:"
            arbitrary={<h2 style={{
                width: '50%'
            }}>
                Would you like to create a new puzzle, or choose an existing one?
            </h2>}
            buttons={[
                {
                    label: "Choose existing Puzzle",
                    onClick: () => setDisplayedPopup('pickExistingPuzzle')
                },
                {
                    label: "Create new Puzzle",
                    onClick: () => setDisplayedPopup('createNewPuzzle')
                }
            ]}
            setDisplayedPopup={setDisplayedPopup}
        />
    );
}

export default function MainPageSelectPuzzlePopups() {
    const { displayedPopup, setDisplayedPopup } = useContext(DisplayContext);


    // REQUIRES: one of the following: 'startup', 'createNewPuzzle', 'pickExistingPuzzle', ''
    return (
        <>
            {displayedPopup === 'startup' && <RenderStartupOptionsPopup
                setDisplayedPopup={setDisplayedPopup} />}
            {displayedPopup === 'createNewPuzzle' && <RenderCreateNewPuzzlePopup
                setDisplayedPopup={setDisplayedPopup} />}
            {displayedPopup === 'pickExistingPuzzle' && <RenderChooseExistingPuzzlePopup
                setDisplayedPopup={setDisplayedPopup} />}
        </>
    );
}