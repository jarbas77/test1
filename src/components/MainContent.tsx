import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Updated import
import Posts from './Posts';
import Comments from './Comments';
import Home from './Home';

const MainContent: React.FC = () => {
    return (
        <main className="p-4">
            <Routes> 
                {/* Deveria estar a usar o Switch? sim, mas estava a dar erros
                https://v5.reactrouter.com/web/api/Switch */}
                
                <Route path="/posts" element={<Posts postId={1} />} /> 
                <Route path="/comments/:postId" element={<Comments postId={10} />} /> 
                <Route path='/' element={<Home />} /> 
            </Routes>
        </main>
    );
}

export default MainContent;