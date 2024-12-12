import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import MyHotmails from './MyHotmails'; // Import the MyHotmails component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-hotmails" element={<MyHotmails />} /> {/* Add this route */}
            </Routes>
        </Router>
    );
}

export default App;