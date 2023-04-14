import React from 'react'
import { FaUserAlt,FaTimes,FaPencilAlt,FaRegComment } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import "../styles/Profile.scss";


function Profile() {
 const location = useLocation();
 const {user, image} = location.state

  return (
    <div>
    <Header
      a=<i><FaTimes/></i> i=<FaUserAlt/> />    
    <main>
      <section className='background'><img src={image}/>
        <h2 className='blind'>My profile background image</h2>
      </section>
        <section className='profile'>
          <h2 className='blind'>My profile info</h2>
          <div className='profile_img empty'><img src={image}/></div>
          <div className='profile_cont'>
            <span className='profile_name'>{user.username}</span>
            <input type='mail' className='profile_email' placeholder={user.email}/>
            <ul className='profile_menu'>
            <li>
              <a href='#'><span className='icon'><i><FaRegComment/></i></span>My Chatroom</a></li>
            <li><a href='#'><span className='icon'><i><FaPencilAlt/></i></span>Edit Profile</a></li>
            </ul>
          </div>
        </section>
    </main>  
    </div>
  )
}

export default Profile