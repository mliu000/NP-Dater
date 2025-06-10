import { useState, useEffect } from 'react';
import Tile from '../model/Tile.js';
import MainPagePopups from './MainPagePopups.jsx';
import '../css/MainPage.css';

/* 
Mu Ye Liu - June 2025

Represents the instructions page for displaying instructions
*/

///// HELPER FUNCTIONS /////

///// RENDER FUNCTIONS /////

///// MAIN FUNCTION /////

export default function MainPage() {
    useEffect(() => {
        // Set the page title
        document.title = 'NP-Dater - Main Page';
    }, []);

    return (
        <>
            <MainPagePopups />
        </>
    );
}