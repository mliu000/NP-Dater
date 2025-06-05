import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FrontPage from './FrontPage';

export default function Pages() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/front-page" replace/>}/>
                <Route path="/front-page" element={<FrontPage/>}/> 
            </Routes>
        </BrowserRouter>
    )
} 