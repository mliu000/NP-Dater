import { useState, useEffect } from 'react';
import Tile from '../model/Tile.js';
import MainPagePopups from './MainPagePopups.jsx';
import '../css/MainPage.css';

/* 
Mu Ye Liu - June 2025

Represents the instructions page for displaying instructions
*/

///// HELPER FUNCTIONS /////

function RenderMainPageLeftSideTileList({ noTiles, setNoTiles }) {

    const handleNewTileClick = () => {
        // Logic to create a new tile
        const newTile = new Tile(`tile_${noTiles}`, [], [], 'blue'); // Example tile creation
        setNoTiles(noTiles + 1);
    }

    return (
        <>
            <div className="left-side-tile-list">
                <h1 style={{
                    position: 'absolute',
                    margin: '0',
                    fontSize: '5vw',
                    textDecoration: 'underline',
                    color: 'var(--header-color)',
                    left: '50%',
                    transform: 'translate(-50%)'
                }}>Tiles:</h1>
                {noTiles > 0 ? (
                    <div className="left-side-tile-list-scroll-pane">

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
                    }}>No tiles available</h1>
                )
                }
                <button className="typical-button" style={{
                    position: 'absolute',
                    left: '45%',
                    transform: 'translate(-50%)',
                    bottom: '0%',
                    width: '50%',
                    height: '5vh',
                }} onClick={handleNewTileClick}>New Tile</button>
            </div>
        </>
    )
}



///// RENDER FUNCTIONS /////

// Render main page
function RenderMainPage({ noTiles, setNoTiles }) {
    return (
        <RenderMainPageLeftSideTileList noTiles={noTiles} setNoTiles={setNoTiles} />
    );
}

///// MAIN FUNCTION /////

export default function MainPage() {
    const [displayedPopup, setDisplayedPopup] = useState('');
    const [puzzleUsernameDisplayed, setPuzzleUsernameDisplayed] = useState('');
    const [noTiles, setNoTiles] = useState(0);

    useEffect(() => {
        // Set the page title
        document.title = 'NP-Dater - Main Page';
    }, []);

    return (
        <>
            <MainPagePopups displayedPopup={displayedPopup}
                setDisplayedPopup={setDisplayedPopup} />
            <RenderMainPage noTiles={noTiles} setNoTiles={setNoTiles} />
        </>
    );
}