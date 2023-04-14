import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaUserAlt,FaComment,FaSearch,FaEllipsisH } from "react-icons/fa";
import '../styles/Tab.scss';

function Tab() {
  const location = useLocation();
  return (
    <div>
    <nav className='tab_bar'>
      <ul>
      <li><Link to={'/'} className={location.pathname === '/' ? 'active' : ''}><i><FaUserAlt/></i>Friends</Link></li>
      <li><Link to={'/chats'} className={location.pathname === '/chats' ? 'active' : ''}><i><FaComment/></i>Chats</Link></li>
      <li><Link to={'/find'} className={location.pathname === '/find' ? 'active' : ''}><i><FaSearch/></i>Find</Link></li>
      <li><Link to={'/more'} className={location.pathname === '/more' ? 'active' : ''}><i><FaEllipsisH/></i>More</Link></li>
      </ul>  
    </nav>      
    </div>
  )
}



export default Tab