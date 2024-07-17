import "./App.css";
import {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignIn from "./components/Authorization/SignIn";
import SignUp from "./components/Authorization/SignUp";
import NotFound from "./components/404/NotFound";
import AddProduct from "./components/ManagingProducts/AddProduct";
import Home from "./components/Home/Home";
import MyProducts from "./components/MyProducts/MyProducts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import React from "react";
import AllProducts from "./components/AllProducts/AllProducts";

function App() {
    let [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isLogged') === 'yes');
    return (
        <>
            <Router>
                <Routes>
                    {/*Accessible for anyone*/}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<SignIn setAuth={setIsAuthenticated}/>}/>
                    <Route path="/register" element={<SignUp setAuth={setIsAuthenticated}/>}/>
                    <Route path="/products/:productId" element={<ProductDetails/>}/>
                    <Route path="/products" element={<AllProducts/>}/>

                    {/*Accessible only for logged-in users*/}
                    <Route path='/add'
                           element={<ProtectedRoute isAuthenticated={isAuthenticated}
                                                    children={<AddProduct/>}/>}/>

                    <Route path="/my_products" element={<ProtectedRoute isAuthenticated={isAuthenticated}
                                                                        children={<MyProducts/>}/>}/>

                    {/*Error pages (not found)*/}
                    <Route path="" element={<NotFound/>}/>
                    <Route element={<NotFound/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
