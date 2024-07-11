import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './components/Authorization/SignIn';
import SignUp from './components/Authorization/SignUp';
import NotFound from "./components/NotFound";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="" element={<NotFound/>}/>
                <Route element={<NotFound/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;