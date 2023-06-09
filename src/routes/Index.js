import React, { useEffect, useState } from 'react'
import { FaDiaspora,FaSearch  } from "react-icons/fa";
import '../styles/Index.scss';
import { Link } from 'react-router-dom'
import Header from '../components/Header';
import Tab from '../components/Tab';
import axios from 'axios';
import packs from '../data/packs.json';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Index({userObj}) {
  
  console.log(packs);
  const [data, setData] = useState([]);

  useEffect(()=> {
    async function fetchData() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(response.data);  
      } catch (error) {
        
      }
    }
    fetchData();
  }, []);

  return (
    <div> 
    <Header 
      h1="Friends" span="10" a="Manege" i = {<FaDiaspora/>} /> 
    <main className='index_main'>
    <form className='search_box'>
        <fieldset className='search_inner'>
          <legend className='blind'>검색창</legend>
          <i><FaSearch/></i>
          <input type="search" name='search' id='search'placeholder='Find friends, chats, Plus Friends'/>  
        </fieldset>
    </form>
    <section className='main_section'>
      <header><h2>My Profile</h2></header>
      <ul>
      <li>
        <Link to='/profiles'>
        <div className='profile_img empty' style={userObj.photoURL ? {backgroundImage: `url(${userObj.photoURL})`} : {backgroundImage:''}}>
       
       </div>
          <span className='profile_name'>{userObj.displayName}</span>
          <span className='profile_messages'>안녕</span>
        </Link>
      </li>

      </ul>  
      <header><h2>Update Friends</h2></header>
      <Swiper
       modules={[Navigation, Pagination, Scrollbar, A11y]}
       
       loop={true}
       breakpoints={{
        1378:{
          slidesPerView: 6, 
          slidesPerGroup: 6, 
        },
        998:{
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
        480:{
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
        0: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        }
      }} 
      >
      <ul className='update_ul'>  
      {data.map((item,index) => (
          <SwiperSlide>
         <li className='update_friend'
            key={item.id} item={item}
            email={item.email}
            image={packs[index].images}
           > 
         <Link to='/profile' state={{user: item, image: packs[index].images}}>
           <span className='profile_img empty'><img src={packs[index].images} alt='Profile' className='swiper_img'/></span>
           <span className='update_profile_name'>{item.username}</span>
         </Link>
       </li> 
       </SwiperSlide>
      ))}
      </ul>
      </Swiper>
    </section>
    <section className='main_section'>
      <header><h2>Friends</h2></header>
      <ul>
        {data.map((item,index) => (
          <li key={item.id} item={item}
            email={item.email}
            image={packs[index].images}
              >
          <Link to='/profile' state={{user: item, image: packs[index].images}}>
            <span className='profile_img empty'><img src={packs[index].images} alt='Profile' /></span>
            <span className='profile_name'>{item.username}</span>
            <span className='profile_messages'>{item.name}</span>
          </Link>
        </li>
        ))}       
      </ul>
    </section>
    </main>
    <Tab/>
    </div>
  )
}

export default Index