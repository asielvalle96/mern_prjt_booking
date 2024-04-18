import React from 'react'
import './Navbar.css'

export default function Navbar () {
  return (
    <div className='navbar'>
      <div className='navContainer'>
        <span className='logo'>asiel_booking</span>
        <div className='navItems'>
          <button className='navButton'>Register</button>
          <button className='navButton'>Login</button>
        </div>
      </div>
    </div>
  )
}
