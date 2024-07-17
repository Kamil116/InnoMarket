import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";

interface HeaderProps {
    isLogged: string;
}

export default function Header({ isLogged }: HeaderProps) {
    let [hover, setHover] = React.useState(false);
    let [src, setSrc] = React.useState('/heart.png');

    const handleMouseOver = () => {
        setHover(true);
        setSrc('/heart-romantic.svg');
    };

    const handleMouseOut = () => {
        setHover(false);
        setSrc('/heart.png');
    };

    return (
        <div className="header">
            <Link to="/">
                <div className="logo">
                    <div className="logo_circle">IM</div>
                    <p>InnoMarket</p>
                </div>
            </Link>
            <form
                action="https://www.google.com/search"
                method="get"
                className="searchbar">
                <input type="text" placeholder="Search items..."/>
                <button id='search-button'>
                    <img src="/search.svg" alt="search"/>
                </button>
            </form>
            <div className="user_action">
                <a href="https://www.vk.com">
                    <img src={src} alt="wishlist" className="wishlist"
                         onMouseOver={handleMouseOver}
                         onMouseOut={handleMouseOut}/>
                </a>
                {isLogged === 'yes' ? (<Link to="/add" className='profile'>
                        <img src={"/login.png"} alt="profile"/>
                    </Link>)
                    :
                    (<Link to="/login" className='login'>
                        <img src={"/login.png"} alt="profile"/>
                        <p style={{paddingLeft: "5px"}}>Sign In</p>
                    </Link>)
                }

            </div>
        </div>
    )
}
