import React from 'react'
import { FaPlane,FaWifi,FaMoon,FaBluetoothB,FaBatteryFull,FaBluetooth } from "react-icons/fa";
import '../styles/Header.scss';


function Header(props) {
  return (
    <div>
     <header className='header1'  style={{backgroundColor:"transparent"}}>
      <div className='status_bar'>
          <div className='left_item'>
          <i><FaPlane/></i>
          <i><FaWifi/></i>
          </div>
        <div className='center_item'>
          <span>12</span>:<span>08</span>
        </div>
        <div className='right_item'>
          <i><FaMoon/></i>
          <i><FaBluetoothB/></i>
          <i><FaBluetooth/></i>
          <i><FaBatteryFull/></i>
        </div>
      </div>
      <div className='title_bar'>
        <h1>{props.h1} <span>{props.span}</span></h1>
        <div className='left_item'>{props.a}</div>
        <div className='right_item'>{props.i}</div>
        
      </div>  
    </header>  
    </div>
  )
}

export default Header