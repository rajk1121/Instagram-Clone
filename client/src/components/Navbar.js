import React from 'react'
const Navbar = ()=>{
    return (
        <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo left">Instagram</a>
          <ul id="nav-mobile" className="right">
            <li><a href="/">Home</a></li>
            <li><a href="/login">LogIn</a></li>
            <li><a href="/signup">SignUp</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
      </nav>
            
    )
}
export default Navbar;