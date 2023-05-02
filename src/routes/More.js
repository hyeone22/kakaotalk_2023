import React from 'react'
import { FaSmile,FaPaintBrush,FaHandPeace,FaUserCircle,FaInfoCircle,FaUtensils,FaStore,FaTv,FaPencilAlt,FaGraduationCap,FaBuilding,FaWonSign,FaVideo,FaComment,FaDiaspora,FaSignOutAlt  } from "react-icons/fa";
import Header from '../components/Header';
import Tab from '../components/Tab';
import '../styles/More.scss';
import { authService } from 'fbase';
import { useNavigate } from 'react-router-dom';



function More({userObj}) {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  }

 

  return (
    <div>
    <Header 
     h1="More" i = <FaDiaspora/> />
    <main className='more_main'>
      <section className='user_info'>
        <h2 className='blind'>사용자 정보</h2>
        <span className='profile_img empty'><img src={userObj.photoURL} alt=''/></span>
        <span className='profile_info'>
          <span className='profile_name'>{userObj.displayName}</span>
          
        </span>
        <span onClick={onLogOutClick} className='chat_img'><i><FaSignOutAlt/></i></span>
      </section>
      <section className='user_menu'>
        <h2 className='blind'>사용자 메뉴</h2>
        <ul>
          <li><i><FaSmile/></i>Emoticons</li>
          <li><i><FaPaintBrush/></i>Themes</li>
          <li><i><FaHandPeace/></i>Plus Friend</li>
          <li><i><FaUserCircle/></i>Account</li>
        </ul>
      </section>
      <section className='plus_friends'>
        <header>
          <h2>Plus Friends</h2>
          <span><i><FaInfoCircle/></i>Learn More</span>
        </header>
        <ul className='plus_list'>
          <li><i><FaUtensils/></i>Order</li>
          <li><i><FaStore/></i>Store</li>
          <li><i><FaTv/></i>TV Channel/Radio</li>
          <li><i><FaPencilAlt/></i>Creation</li>
          <li><i><FaGraduationCap/></i>Education</li>
          <li><i><FaBuilding/></i>Politics/Society</li>
          <li><i><FaWonSign/></i>Finance</li>
          <li><i><FaVideo/></i>Movies/Music</li>
        </ul>
      </section>
      <section className='more_app'>
        <h2 className='blind'>앱 더보기</h2>
        <ul>
          <li><span className='app_icon'></span>KaKao Story</li>
          <li><span className='app_icon'></span>Path</li>
          <li><span className='app_icon'></span>KaKao Friends</li>
        </ul>
      </section>
    </main>
    <Tab/>
    </div>
  )
}

export default More