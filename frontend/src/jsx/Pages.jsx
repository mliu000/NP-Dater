import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FrontPage from './FrontPage';
import MainPage from './MainPage';
import InstructionsPage from './InstructionsPage';

export default function Pages() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/front-page" replace/>}/>
                <Route path="/front-page" element={<FrontPage/>}/> 
                <Route path ="/main-page" element={<MainPage/>}/>
                <Route path ='/instructions-page' element={<InstructionsPage/>}/>   
            </Routes>
        </BrowserRouter>
    )
} 