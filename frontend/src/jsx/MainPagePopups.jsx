import { useState } from 'react';

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


function RenderCreateNewPuzzleMiddleComponent() {
    const [puzzleType, setPuzzleType] = useState(''); // Default is nothing 
    const [inputValue, setInputValue] = useState(''); // Default is empty string
    const [gridWidth, setGridWidth] = useState(0); // Default is 0
    const [gridHeight, setGridHeight] = useState(0); // Default is 0
    const [hexRadius, setHexRadius] = useState(0); // Default is 0

    return (
        <div style={{
            width: '80%',
            textAlign: 'center',
            marginTop: '-2vh',
        }}>
            <h2>
                Choose a name for your puzzle:
            </h2>
            <RenderInputs setInputValue={setInputValue} />
            <h2>
                Choose puzzle type:
            </h2>
            <label style={{ display: 'block', fontSize: '1.5vw', marginBottom: '1vh' }}>
                <input type="radio" name="puzzleType" value="grid"
                    onChange={(e) => setPuzzleType(e.target.value)} style={{ marginRight: '1vw' }} />
                Grid Puzzle
            </label>
            <label style={{ display: 'block', fontSize: '1.5vw', marginBottom: '1vh' }}>
                <input type="radio" name="puzzleType" value="hex"
                    onChange={(e) => setPuzzleType(e.target.value)} style={{ marginRight: '1vw' }} />
                Hex Puzzle
            </label>
            {puzzleType == 'grid' && (
                <>
                    <h2 style={{ fontSize: '1.5vw' }}>
                        Select the width and height of the grid puzzle (8x8 max):
                    </h2>
                    <RenderDropDownMenu options={['2', '3', '4', '5', '6', '7', '8']}
                        message="Select Width" setState={setGridWidth} />
                    <RenderDropDownMenu options={['2', '3', '4', '5', '6', '7', '8']}
                        message="Select Height" setState={setGridHeight} />
                </>
            )}
            {puzzleType == 'hex' && (
                <>
                    <h2 style={{ fontSize: '1.5vw' }}>
                        Select the radius of the hex puzzle (1-5):
                    </h2>
                    <RenderDropDownMenu options={['1', '2', '3', '4', '5']}
                        message="Select Radius" setState={setHexRadius} />  
                </>
            )}

        </div>
    );
}

// Popup render template function 
function RenderPopupTemplate({ title, arbitrary, buttons }) {
    return (
        <div className="popup-background">
            <div className="popup-content" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40%',
                height: 'auto'
            }}>
                <h1 style={{
                    textDecoration: 'underline',
                    textAlign: 'center',
                    color: 'var(--header-color)',
                    fontSize: '4vw',
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
    );
}

///// RENDER FUNCTIONS /////

// Renders the create new puzzle popup
function RenderCreateNewPuzzlePopup({ setDisplayedPopup }) {
    return (
        <RenderPopupTemplate
            title="Create New Puzzle:"
            arbitrary={<RenderCreateNewPuzzleMiddleComponent />}
            buttons={[
                {
                    label: "Start",
                    onClick: () => setDisplayedPopup('')
                },
                {
                    label: "Back",
                    onClick: () => setDisplayedPopup('startup')
                }
            ]}
        />
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
                    label: "Create New Puzzle",
                    onClick: () => setDisplayedPopup('createNewPuzzle')
                }
            ]}
        />
    );
}

export default function MainPagePopups() {
    // REQUIRES: one of the following: 'startup', 'createNewPuzzle', 'pickExistingPuzzle', ''
    const [displayedPopup, setDisplayedPopup] = useState('startup');
    return (
        <>
            {displayedPopup === 'startup' && <RenderStartupOptionsPopup setDisplayedPopup={setDisplayedPopup} />}
            {displayedPopup === 'createNewPuzzle' && <RenderCreateNewPuzzlePopup setDisplayedPopup={setDisplayedPopup} />}
        </>
    );
}