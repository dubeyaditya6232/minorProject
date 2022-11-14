import React, { useContext } from 'react'
import "./navbar.css"
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const {user, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
      e.preventDefault();
      dispatch({type: "LOGOUT"})
  }

  const handleLogin = (e) => {
    navigate("/login")
  }

  const handleRegister = (e) => {
    navigate("/register")
  }

  return (
    <div className='navbar'>
        <div className='navContainer'>
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
        <span className="logo">sandeepbooking</span>
        </Link>
        {
          user ? (
            <div className='navUser'>
            <span className='userName'>{user.username}</span>
            <div className='navButton'>
              <button onClick={handleLogout}>Logout</button>
            </div>
            </div>
          ) : (
            <div className='navItems'>
                <button onClick={handleRegister} className='navButton'>Register</button>
                <button onClick={handleLogin} className='navButton'>Login</button>
            </div>
          )
        }
        </div>
    </div>
  )
}

export default Navbar