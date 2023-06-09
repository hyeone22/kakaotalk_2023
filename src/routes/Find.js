import React from 'react'
import { FaAddressBook,FaQrcode,FaMobileAlt,FaEnvelope  } from "react-icons/fa";
import Header from '../components/Header';
import Tab from '../components/Tab';
import '../styles/Find.scss';

function Find() {
  return (
    <div>
    <Header 
     h1="Find" a="Search" />  
    <main className='find_main'>
      <ul className='find_method'>
        <li><i><FaAddressBook/></i>Find</li>
        <li><i><FaQrcode/></i>QR Code</li>
        <li><i><FaMobileAlt/></i>Shake</li>
        <li><i><FaEnvelope/></i>Invite via SMS</li>  
      </ul>
      <section className='recommend_section'>
        <header><h2>Recommended Friends</h2></header>
        <ul>
          <li>You Have no recommended friends.</li>
        </ul>
      </section>  
    </main>
    <Tab/>
    </div>
  )
}

export default Find