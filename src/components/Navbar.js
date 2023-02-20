import React from 'react'

const NavBar = ()=>{
    return(
        <>
        <nav>
        <div className="nav-wrapper white" >
          <a href="/" className="brand-logo left">PostApp</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/signin">Login</a></li>
            <li><a href="/signup">Signup</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
      </nav>
      </>
    )
}

export default NavBar