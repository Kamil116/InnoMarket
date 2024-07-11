import React from 'react';
import {Link} from "react-router-dom";
import './Header.css';

const Header = () => (
    <div className="header">
        <Link to='/'>
            <div className="logo">
                <div className='logo_circle'>IM</div>
                <p>InnoMarket</p>
            </div>
        </Link>
        <form action="https://www.google.com/search" method="get" className="searchbar">
            <input type="text" placeholder="Search items..."/>
            <button><img src='/search.svg' alt='search'/></button>
        </form>
        <div className='user_action'>
            <a href="https://www.vk.com"><img src={"/heart.png"} alt="wishlist" className="wishlist"/></a>
            <Link to='/login'>
                <a className='login'>
                    <img src={"/login.png"} alt="profile"/>
                    <p style={{paddingLeft: '5px'}}>Sign In</p>
                </a>
            </Link>
        </div>
    </div>
);

export default Header;