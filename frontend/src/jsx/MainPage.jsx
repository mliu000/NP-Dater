import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tile from '../model/Tile.js';
import MainPagePopups from './MainPagePopups.jsx';
import { RenderMainBoard } from './MainPageBoard.jsx';
import { PuzzleProvider } from '../context/PuzzleContext.jsx';
import '../css/MainPage.css';

// To store the tiles the name of the puzzle
const tiles = [];
let name = '';

/* 
Mu Ye Liu - June 2025

Represents the instructions page for displaying instructions
*/

///// HELPER FUNCTIONS /////

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

// Renders the left side tile list 
function RenderMainPageLeftSideTileList({ noTiles, setNoTiles }) {

    const handleNewTileClick = () => {
        setNoTiles(noTiles + 1);
        tiles.push(new Tile(`tile_${noTiles}`, [[0, 0]], [], ''));
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
                        {tiles.map((tile, idx) => (
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
                {noTiles < 12 && <button className="typical-button" style={{
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



///// RENDER FUNCTIONS /////

// Render main page
function RenderMainPage({ noTiles, setNoTiles }) {
    return (
        <>
            <RenderMainPageLeftSideTileList noTiles={noTiles} setNoTiles={setNoTiles} />
            <RenderBackButton />
        </>
    );
}

///// MAIN FUNCTION /////

export default function MainPage() {
    const [displayedPopup, setDisplayedPopup] = useState('startup');
    const [puzzleUsernameDisplayed, setPuzzleUsernameDisplayed] = useState('');
    const [noTiles, setNoTiles] = useState(0);

    useEffect(() => {
        // Set the page title
        document.title = 'NP-Dater - Main Page';
    }, []);

    return (
        <PuzzleProvider>
            <MainPagePopups displayedPopup={displayedPopup}
                setDisplayedPopup={setDisplayedPopup} />
            <RenderMainPage noTiles={noTiles} setNoTiles={setNoTiles} />
            <RenderMainBoard />
        </PuzzleProvider>

    );
}