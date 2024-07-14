import React from "react";
import "./ManagingPanel.css";
import {useNavigate} from "react-router-dom";

export default function ManagingPanel() {
    const navigate = useNavigate();

    function handleClick() {
        localStorage.setItem('isLogged', 'no')
        navigate('/');
    }

    return (
        <>
            <div id="panel">
                <nav>
                    <ul>
                        <li>
                            <a href="/wishlist">Wishlist</a>
                        </li>
                        <hr className="hr"/>
                        <li>
                            <a href="/my_products">My Items</a>
                        </li>
                        <hr className="hr"/>
                        <li>
                            <a href="/add">Add Item</a>
                        </li>
                        <hr className="hr"/>
                        <li>
                            <button className='logout-button' onClick={handleClick}>Logout</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
