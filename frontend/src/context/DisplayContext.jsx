import { createContext, useState } from 'react';
/*
Mu Ye Liu - June 2025

Represents the PuzzleContext for managing the puzzle state in the application
*/

const DisplayContext = createContext(null);
export default DisplayContext;

export function DisplayProvider({ children }) {
    const [displayedPopup, setDisplayedPopup] = useState('startup');
    const [mode, setMode] = useState(''); // 'edit' or 'solve', or '' as default
    const [displaySetCoordPopup, setDisplaySetCoordPopup] = useState(false);

    return (
        <DisplayContext.Provider value={{
            displayedPopup, setDisplayedPopup,
            mode, setMode,
            displaySetCoordPopup, setDisplaySetCoordPopup
        }}>
            {children}
        </DisplayContext.Provider>
    );
}