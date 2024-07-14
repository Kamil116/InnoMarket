import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";

export default function Header(props) {

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
                className="searchbar"
            >
                <input type="text" placeholder="Search items..."/>
                <button>
                    <img src="/search.svg" alt="search"/>
                </button>
            </form>
            <div className="user_action">
                <a href="https://www.vk.com">
                    <img src={"/heart.png"} alt="wishlist" className="wishlist"/>
                </a>
                {props.isLogged === 'yes' ? (<Link to="/add" className='profile'>
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
