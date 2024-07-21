import React from 'react';
import './ManagingPanel.css';
import { Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AddProduct from './AddProduct';

export default function ManagingPanel() {
  const navigate = useNavigate();

  function handleLogoutButton() {
    localStorage.setItem('isLogged', 'no');
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
            <hr className="hr" />
            <li>
              <a href="/my_products">My Items</a>
            </li>
            <hr className="hr" />
            <li>
              <Route
                path="/add"
                element={<AddProduct />}
              />
            </li>
            <hr className="hr" />
            <li>
              <button className="logout-button" onClick={handleLogoutButton}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
