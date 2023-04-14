import React, { useEffect, useState } from 'react'
import { FaDiaspora,FaSearch  } from "react-icons/fa";
import '../styles/Index.scss';
import { Link } from 'react-router-dom'
import Header from '../components/Header';
import Tab from '../components/Tab';
import axios from 'axios';

import packs from '../data/packs.json'


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
      h1="Friends" span="1" a="Manege" i = {<FaDiaspora/>} /> 
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
          <span className='profile_img empty'><img src={userObj.photoURL} alt=''/></span>
          <span className='profile_name'>{userObj.displayName}</span>
          <span className='profile_messages'>안녕</span>
        </Link>
      </li> 

      </ul>  
    </section>
    <section className='main_section'>
      <header><h2>Friends</h2></header>
      <ul>
        {data.map((item,index) => (
          <li key={item.id}
            email={item.email}
            image={packs[index].images}
              >
          <Link to='/profile' state={{user: item, image: packs[index].images}}>
            <span className='profile_img empty'><img src={packs[index].images} alt='Profile'/></span>
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