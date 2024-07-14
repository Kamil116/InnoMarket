import "./App.css";
import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignIn from "./components/Authorization/SignIn";
import SignUp from "./components/Authorization/SignUp";
import NotFound from "./components/NotFound";
import AddProduct from "./components/ManagingProducts/AddProduct";
import Home from "./components/Home/Home";
import MyProducts from "./components/MyProducts/MyProducts";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<SignIn/>}/>
                    <Route path="/register" element={<SignUp/>}></Route>
                    <Route path="/add" element={<AddProduct></AddProduct>}/>
                    <Route path="/my_products" element={<MyProducts/>}/>
                    <Route path="" element={<NotFound/>}/>
                    <Route element={<NotFound/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
