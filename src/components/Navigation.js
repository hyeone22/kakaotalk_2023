import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/profiles'}>My Profiles</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation