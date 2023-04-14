import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserAlt,FaRegComment,FaSearch,FaEllipsisH } from "react-icons/fa";
import '../styles/Tab.scss';

function Tab() {
  return (
    <div>
    <nav className='tab_bar'>
      <ul>
       <li><Link to={'/'}><a><i><FaUserAlt/></i>Friends</a></Link></li>
        <li><Link to={'/chats'}><a><i><FaRegComment/></i>Chats</a></Link></li>
       <li><Link to={'/find'}><a><i><FaSearch/></i>Find</a></Link></li>
        <li><Link to={'/more'}><a><i><FaEllipsisH/></i>More</a></Link></li>
      </ul>  
    </nav>      
    </div>
  )
}



export default Tab