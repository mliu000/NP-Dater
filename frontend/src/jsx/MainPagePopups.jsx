import { useState } from 'react';
import PuzzleContext from '../context/PuzzleContext';

/*
Mu Ye Liu - June 2025

Represents the popups used in the main page
*/

///// HELPER FUNCTIONS /////

// Renders the input for the puzzle name
function RenderInputs({ setInputValue }) {
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
    />);
}

/* Renders the dropdown menu for selecting puzzle size
REQUIRES: options - an array of objects with 'label' and 'value' properties, default is empty array
*/
function RenderDropDownMenu({ options = [], message, setState }) {
    return (
        <select onChange={(e) => setState(e.target.value)} style={{ fontSize: '1.5vw' }}>
            <option value="">{message}</option>
            {options.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
            ))}
        </select>
    );
}


function RenderCreateNewPuzzleMiddleComponent({ setInputValue, setPuzzleType, setGridWidth,
    puzzleType, setGridHeight, setHexRadius, setInvalidSelection, invalidSelection, setDateFormat }) {
    return (
        <div style={{
            width: '80%',
            textAlign: 'center'
        }}>
            <h2>
                Puzzle Name:
            </h2>
            <RenderInputs setInputValue={setInputValue} />
            <h2>
                Puzzle type:
            </h2>
            <label style={{ display: 'block', fontSize: '1.5vw', marginBottom: '1vh' }}>
                <input type="radio" name="puzzleType" value="grid"
                    onChange={(e) => {
                        setPuzzleType(e.target.value);
                        setInvalidSelection(false); // Reset invalid selection when changing puzzle type
                    }} style={{ marginRight: '1vw' }} />
                Grid Puzzle
            </label>
            <label style={{ display: 'block', fontSize: '1.5vw', marginBottom: '1vh' }}>
                <input type="radio" name="puzzleType" value="hex"
                    onChange={(e) => {
                        setPuzzleType(e.target.value);
                        setInvalidSelection(false); // Reset invalid selection when changing puzzle type
                    }} style={{ marginRight: '1vw' }} />
                Hex Puzzle
            </label>
            <h2 style={{ fontSize: '1.5vw' }}>
                Date Format:
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '1.5vw' }}>
                <label>
                    <input type="checkbox" value="Option1"
                        onChange={() => setDateFormat(prev => prev.map((val, idx) => idx === 0 ? !val : val))} />
                    Day of the Week
                </label>
                <label>
                    <input type="checkbox" value="Option2"
                        onChange={() => setDateFormat(prev => prev.map((val, idx) => idx === 1 ? !val : val))} />
                    Day of the Month
                </label>
                <label>
                    <input type="checkbox" value="Option3"
                        onChange={() => setDateFormat(prev => prev.map((val, idx) => idx === 2 ? !val : val))} />
                    Month
                </label>
            </div>
            {puzzleType == 'grid' && (
                <>
                    <h2 style={{ fontSize: '1.5vw' }}>
                        Width and Height:
                    </h2>
                    <RenderDropDownMenu options={['4', '5', '6', '7', '8']}
                        message="Select Width" setState={setGridWidth} />
                    <RenderDropDownMenu options={['4','5', '6', '7', '8']}
                        message="Select Height" setState={setGridHeight} />
                </>
            )}
            {puzzleType == 'hex' && (
                <>
                    <h2 style={{ fontSize: '1.5vw' }}>
                        Radius:
                    </h2>
                    <RenderDropDownMenu options={['1', '2', '3', '4', '5']}
                        message="Select Radius" setState={setHexRadius} />
                </>
            )}
            {invalidSelection && (
                <p style={{ color: 'red', fontSize: '1.5vw' }}>
                    Please fill in all fields before proceeding.
                </p>
            )}

        </div>
    );
}

// Popup render template function 
function RenderPopupTemplate({ title, arbitrary, buttons }) {
    return (
        <div className="popup-background">
            <div className="popup-wrapper">
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
    return (
        <RenderPopupTemplate
            title="Existing Puzzles:"
            arbitrary={null}
            buttons={[
                {
                    label: "Select",
                    onClick: () => setDisplayedPopup('createNewPuzzle')
                }
            ]}
        />
    );
}

// Renders the create new puzzle popup (uses context to manage state)
function RenderCreateNewPuzzlePopup({ setDisplayedPopup }) {
    const [inputValue, setInputValue] = useState(''); // Default is empty string
    const [gridWidth, setGridWidth] = useState("Select Width"); // Default is "Select Width"
    const [gridHeight, setGridHeight] = useState("Select Height"); // Default is "Select Height"
    const [hexRadius, setHexRadius] = useState("Select Radius"); // Default is "Select Radius"
    const [puzzleType, setPuzzleType] = useState(''); // Default is nothing
    const [invalidSelection, setInvalidSelection] = useState(false); // Default is false
    const [dateFormat, setDateFormat] = useState(new Array(3).fill(false)); // Default is [false, false, false]

    return (
        <PuzzleContext.Provider value={{
            inputValue, setInputValue,
            gridWidth, setGridWidth,
            gridHeight, setGridHeight,
            hexRadius, setHexRadius,
            puzzleType, setPuzzleType,
            invalidSelection, setInvalidSelection,
            dateFormat, setDateFormat
        }}>
            <RenderPopupTemplate
                title="New Puzzle:"
                arbitrary={<RenderCreateNewPuzzleMiddleComponent
                    setInputValue={setInputValue}
                    puzzleType={puzzleType}
                    setPuzzleType={setPuzzleType}
                    setGridWidth={setGridWidth}
                    setGridHeight={setGridHeight}
                    setHexRadius={setHexRadius}
                    setInvalidSelection={setInvalidSelection}
                    invalidSelection={invalidSelection}
                    setDateFormat={setDateFormat}
                />}
                buttons={[
                    {
                        label: "Start",
                        onClick: () => {
                            if (inputValue === '' ||
                                puzzleType === '' ||
                                puzzleType === 'grid' && (gridWidth === 'Select Width' || gridHeight === 'Select Height') ||
                                puzzleType === 'hex' && hexRadius === 'Select Radius' ||
                                dateFormat.every(format => !format)) {
                                setInvalidSelection(true);
                            } else {
                                setDisplayedPopup(''); // Hide the display
                            }
                        }
                    },
                    {
                        label: "Back",
                        onClick: () => setDisplayedPopup('startup')
                    }
                ]}
            />
        </PuzzleContext.Provider>
    );
}

// Renders the startup options popup
function RenderStartupOptionsPopup({ setDisplayedPopup }) {
    return (
        <RenderPopupTemplate
            title="Startup Options:"
            arbitrary={<h2 style={{
                width: '50%'
            }}>
                Would you like to create a new puzzle, or continue from an existing one?
            </h2>}
            buttons={[
                {
                    label: "Continue from Existing Puzzle",
                    onClick: () => setDisplayedPopup('pickExistingPuzzle')
                },
                {
                    label: "Create new Puzzle",
                    onClick: () => setDisplayedPopup('createNewPuzzle')
                }
            ]}
        />
    );
}

export default function MainPagePopups({ displayedPopup, setDisplayedPopup }) {
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