import React from 'react'
import { FaUserAlt,FaTimes,FaPencilAlt,FaRegComment } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import "../styles/Profile.scss";


function Profile() {
 const location = useLocation();
 const {user, image} = location.state

  return (
    <div>
    <Header
     a={
      <Link to={'/'} style={{ color: 'white', textDecoration: 'none' }}>
        <i>
          <FaTimes style={{ color: 'white' }} />
        </i>
      </Link>
    }
    i={<FaUserAlt style={{ color: 'white' }} />}
  />

    <main className='profile_main'>
      <section className='background'><img src={image} alt=''/>
        <h2 className='blind'>My profile background image</h2>
      </section>
        <section className='profile_sub'>
          <h2 className='blind'>My profile info</h2>
          <div className='profile_img empty'><img src={image} alt=''/></div>
          <div className='profile_cont'>
            <span className='profile_name'>{user.username}</span>
            <input type='mail' className='profile_email' placeholder={user.email}/>
            <ul className='profile_menu'>
            <li><span className='icon'><i><FaRegComment/></i></span>My Chatroom</li>
            <li><span className='icon'><i><FaPencilAlt/></i></span>Edit Profile</li>
            </ul>
          </div>
        </section>
    </main>  
    </div>
  )
}

export default Profile