import { useState, useEffect, use } from 'react';
import Tile from '../model/Tile.js';
import '../css/MainPage.css';

/* 
Mu Ye Liu - June 2025

Represents the instructions page for displaying instructions
*/

///// HELPER FUNCTIONS /////

///// RENDER FUNCTIONS /////

// Renders the startup options popup
function renderStartupOptionsPopup() {
    const [show, setShow] = useState(true);

    return (
        <>
            {show && (<div className="popup-background">
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
                    }}>Startup Options:</h1>
                    <p style={{
                        left: '50%',
                        width: '50%',
                        textAlign: 'center',
                        color: 'var(--text-color)',
                        margin: '1vh', 
                        fontSize: '1.5vw',   
                    }}>Would you like to create a new puzzle, or continue from an existing one?</p>
                    <button className="typical-button" style={{
                        width: '80%',
                        height: '7vw',
                        marginBottom: '1vh',
                        fontSize: '2vw'
                    }} onClick={() => setShow(false)}>
                        Continue from Existing Puzzle
                    </button>
                    <button className="typical-button" style={{
                        width: '80%',
                        height: '7vw',
                        fontSize: '2vw'
                    }} onClick={() => setShow(false)}>
                        Create New Puzzle
                    </button>
                </div>
            </div>)}
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
        <>
            {renderStartupOptionsPopup()}
        </>
    );
}