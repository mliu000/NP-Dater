import { createContext, useState } from 'react';
/*
Mu Ye Liu - June 2025

Represents the PuzzleContext for managing the puzzle state in the application
*/

const DisplayContext = createContext(null);
export default DisplayContext;

export function DisplayProvider({ children }) {
    const [displayedPopup, setDisplayedPopup] = useState('startup');

    return (
        <DisplayContext.Provider value={{
            displayedPopup, setDisplayedPopup
        }}>
            {children}
        </DisplayContext.Provider>
    );
}