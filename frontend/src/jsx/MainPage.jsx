import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Tile from '../model/Tile.js';
import MainPageSelectPuzzlePopups from './MainPageSelectPuzzlePopups.jsx';
import { RenderMainBoard } from './MainPageBoard.jsx';
import PuzzleContext, { PuzzleProvider } from '../context/PuzzleContext.jsx';
import DisplayContext, { DisplayProvider } from '../context/DisplayContext.jsx';
import '../css/MainPage.css';

/* 
Mu Ye Liu - June 2025

Represents the instructions page for displaying instructions
*/

///// HELPER FUNCTIONS /////

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

// Renders the save solution 
function RenderSaveButton() {
    const { setSaved } = useContext(PuzzleContext);
    const { mode, setMode } = useContext(DisplayContext);

    const handleSavePuzzleClick = () => {
        setSaved(true);
        setMode('solve');
    }

    const handleSaveSolutionClick = () => {
        // TODO: Implement save solution logic
    }

    return (
        <>
            {mode === 'solve' && <button className="typical-button" style={{
                position: 'absolute',
                right: '30%',
                bottom: '2%',
                width: '15%',
                height: '8%',
                margin: '0'
            }} onClick={() => { handleSavePuzzleClick(); }}>
                Save Puzzle
            </button> }
            {mode === 'edit' && <button className="typical-button" style={{
                position: 'absolute',
                right: '30%',
                bottom: '2%',
                width: '15%',
                height: '8%',
                margin: '0'
            }} onClick={handleSavePuzzleClick}>
                Save Solution
            </button> } 
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
                {noTiles < 12 && mode === "edit" &&<button className="typical-button" style={{
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
function RenderMainPage() {
    const { noTiles, setNoTiles } = useContext(PuzzleContext);
    return (
        <>
            <RenderMainPageLeftSideTileList noTiles={noTiles} setNoTiles={setNoTiles} />
            <RenderBackButton />
            <RenderSaveButton />
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