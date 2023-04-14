import { FaSearch,FaComment  } from "react-icons/fa";
import Chat from '../components/Chat';
import Header from '../components/Header';
import Tab from '../components/Tab';
import '../styles/Chats.scss';
import packs from '../data/packs.json'

import { Link } from 'react-router-dom';


function Chats() {

  

  return (
    <div>
    <Header
      h1="Chats" a="Edit"/>  
    <main className="chats_main">
      <form className='search_box'>
        <fieldset className='search_inner'>
          <legend className='blind'>검색창</legend>
          <i><FaSearch/></i>
          <input type="search" name='search' id='search'placeholder='Find friends, chats, Plus Friends'/>  
        </fieldset>
        </form>
        <section className='main_section'>
          <header className='blind'><h2>Friends</h2></header>
          {packs.map((pack, index) => (
            <div key={pack.id}>
    <Link to='/chatting' state={{ image: packs[index].images, name: packs[index].name, id: packs[index].id }}>
      <Chat
        propsid={pack.id}
        propsname={pack.name}
        propsimage={pack.images}
        propsall={pack}
      />
    </Link>
  </div>
))}
          </section>
          <div className='chat_fa_btn'>

            <i><FaComment/></i>  
          
            </div>  
    </main>
    <Tab/>   
    </div>
  )
}

export default Chats
