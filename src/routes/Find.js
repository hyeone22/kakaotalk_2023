import React from 'react'
import { FaPlane,FaWifi,FaMoon,FaBluetoothB,FaBatteryFull,FaAddressBook,FaQrcode,FaMobileAlt,FaEnvelope  } from "react-icons/fa";
import Header from '../components/Header';
import Tab from '../components/Tab';
import '../styles/Find.scss';

function Find() {
  return (
    <div>
    <Header 
     h1="Find" a="Edit" />  
    <main className='find_main'>
      <ul className='find_method'>
        <li><a href='#'><i><FaAddressBook/></i>Find</a></li>
        <li><a href='#'><i><FaQrcode/></i>QR Code</a></li>
        <li><a href='#'><i><FaMobileAlt/></i>Shake</a></li>
        <li><a href='#'><i><FaEnvelope/></i>Invite via SMS</a></li>  
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