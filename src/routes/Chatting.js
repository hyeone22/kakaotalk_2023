import React, { useEffect, useState } from 'react'
import { FaListUl,FaAngleLeft,FaSmile,FaPhone,FaRegArrowAltCircleLeft,FaPlusCircle } from "react-icons/fa";
import Header from '../components/Header';
import '../styles/Chatting.scss';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, storage } from 'fbase';
import Kakao from 'components/Kakao';
import { ref, uploadString, getDownloadURL  } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import {  useLocation } from 'react-router-dom';


function Chatting({userObj}) {
  const [kakao, setKakao] = useState('');
  const [kakaos, setKakaos] = useState([]);
  const [attachment, setAttachment] = useState("");
  const location = useLocation();
  const {image, name, id} = location.state
  

  useEffect(() => {
   
    const q = query(collection(db, "kakaos"),
                    orderBy("createdAt","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
      });
      setKakaos(newArray);
    });
  },[]);

  const onChange = (e) => {
    e.preventDefault();
    const {target:{value}} = (e);
    setKakao(value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let attachmentUrl = "";
      if(attachment !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`); // 사진을 스토리지에 저장
        const response = await uploadString(storageRef, attachment, 'data_url');
        console.log('response->',response)
        attachmentUrl = await getDownloadURL(ref(storage, response.ref))  
      }  


      const docRef = await addDoc(collection(db, "kakaos"), {
        text: kakao,
        createdAt: Date.now(),
        createrId: userObj.uid,  // 문서를 누가 작성했는지 알아내야함 userObj > 로그인한 사용자 정보
        attachmentUrl
      });
      console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setKakao("");
      setAttachment("");  
    }

    const onFileChange = (e) => {
    const {target: {files}} = e;
    
    const theFile = files[0];

    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {currentTarget:{result}} = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
    }

    const onclearAttachment = () =>{
      setAttachment("");
    }

  return (
    <div>
     <Header 
      h1="Friend Name" a={<i><FaAngleLeft/></i>} i={<i><FaListUl/></i>}
      
       /> 
    <main className='chatting_main'>
      <span className='date_info'>Thursday,March 2333, 2023</span>
     
      <div className='chat_box my'>
      {kakaos.map(kakao => (
          <Kakao key={kakao.id} kakaoObj={kakao} isOwner={kakao.createrId === userObj.uid}/> 
        ))}
  </div>
  <div className='chat_box other'>
    <div className='other_info'>

      <span className='profile_img empty'><img src={image} alt/></span>
      <span className='profile_name'>{name}</span>
    </div>
      <span className='chat'>{id}</span>
      <span className='chat_time'><span>12</span>:<span>08</span></span>
  </div>     
    </main>
    <footer className='chatting_footer'>
    <form action="/" method="post" onSubmit={onSubmit} className='chatting_form'>
    <fieldset className='text_box'>
      <legend className='blind'>채팅 입력창</legend>
      <label for="chatting" className='blind'>채팅 입력</label>
      <label htmlFor='attach-file' className='chatting_send_file'>
        <span><i><FaPlusCircle/></i></span>
      </label>

      <input type='file' accept='image/*' onChange={onFileChange} 
        id='attach-file' style={{opacity:0,width:10}} />

      <input type='text' id='chatting' className='text_field' value={kakao} onChange={onChange}></input>
      <span className='emoticon_btn'><i><FaSmile/></i></span>
      <span className='voice_btn'><i><FaPhone /></i></span>
      <button type='submit' value='전송' onChange={onChange} className='chatting_submit' >
      <i><FaRegArrowAltCircleLeft /></i>
      </button>
      
       
      {attachment && (
        <div className='chatting_attach'>
        <img src={attachment} width="70" height="60" alt="" />
        <button onClick={onclearAttachment} className='chatting_button'>Remove</button>  
        </div>
      )}
    </fieldset>
    </form>
    </footer>  
    </div>
  )
}


export default Chatting