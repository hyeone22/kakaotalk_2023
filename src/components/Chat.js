import React from 'react'
import '../styles/Chats.scss'
import { Link } from 'react-router-dom';
import packs from '../data/packs.json'

function Chat({propsid,propsname,propsimage}) {
  return (
    <div>
      <section className='main_section'>
        <header className='blind'><h2>Friends</h2></header>
        <ul>
       <li>
          <a>
            <span className='chats_img empty'><img src={propsimage}/></span>
            <span className='chats_cont'>
              <span className='chats_name'>{propsname}</span>
              <span className='chats_latest'>{propsid}</span>
              </span>
              <span className='chats_time'><span>15</span>:<span>33</span></span>  
          </a>
          </li>
        </ul>
        </section>
    </div>
  )
}

export default Chat