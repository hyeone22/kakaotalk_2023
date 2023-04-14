import React from 'react'
import { FaPlane,FaWifi,FaMoon,FaBluetoothB,FaBatteryFull,FaSmile,FaPaintBrush,FaHandPeace,FaUserCircle,FaInfoCircle,FaUtensils,FaStore,FaTv,FaPencilAlt,FaGraduationCap,FaBuilding,FaWonSign,FaVideo,FaRegComment,FaDiaspora  } from "react-icons/fa";
import Header from '../components/Header';
import Tab from '../components/Tab';
import '../styles/More.scss';
import { Link } from 'react-router-dom';

function More({userObj}) {
  return (
    <div>
    <Header 
     h1="More" i = <FaDiaspora/> />
    <main className='more_main'>
      <section className='user_info'>
        <h2 className='blind'>사용자 정보</h2>
        <span className='profile_img empty'></span>
        <span className='profile_info'>
          <span className='profile_name'>{userObj.displayName}</span>
          <span className='profile_email'>Userid@gmail.com</span>
        </span>
        <span className='chat_img'><a href='#'><i><FaRegComment/></i></a></span>
      </section>
      <section className='user_menu'>
        <h2 className='blind'>사용자 메뉴</h2>
        <ul>
          <li><a href='#'><i><FaSmile/></i>Emoticons</a></li>
          <li><a href='#'><i><FaPaintBrush/></i>Themes</a></li>
          <li><a href='#'><i><FaHandPeace/></i>Plus Friend</a></li>
          <li><a href='#'><i><FaUserCircle/></i>Account</a></li>
        </ul>
      </section>
      <section className='plus_friends'>
        <header>
          <h2>Plus Friends</h2>
          <span><i><FaInfoCircle/></i>Learn More</span>
        </header>
        <ul className='plus_list'>
          <li><a href='#'><i><FaUtensils/></i>Order</a></li>
          <li><a href='#'><i><FaStore/></i>Store</a></li>
          <li><a href='#'><i><FaTv/></i>TV Channel/Radio</a></li>
          <li><a href='#'><i><FaPencilAlt/></i>Creation</a></li>
          <li><a href='#'><i><FaGraduationCap/></i>Education</a></li>
          <li><a href='#'><i><FaBuilding/></i>Politics/Society</a></li>
          <li><a href='#'><i><FaWonSign/></i>Finance</a></li>
          <li><a href='#'><i><FaVideo/></i>Movies/Music</a></li>
        </ul>
      </section>
      <section className='more_app'>
        <h2 className='blind'>앱 더보기</h2>
        <ul>
          <li><a href='#'><span className='app_icon'></span>KaKao Story</a></li>
          <li><a href='#'><span className='app_icon'></span>Path</a></li>
          <li><a href='#'><span className='app_icon'></span>KaKao Friends</a></li>
        </ul>
      </section>
    </main>
    <Tab/>
    </div>
  )
}

export default More