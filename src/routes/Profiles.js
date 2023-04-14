import Header from 'components/Header';
import { authService, db, storage } from 'fbase';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserAlt,FaTimes  } from "react-icons/fa";
import { updateProfile } from 'firebase/auth';

import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import "styles/Profiles.scss";
import { v4 as uuidv4 } from 'uuid';
import { deleteObject, getDownloadURL, ref,  uploadString } from 'firebase/storage';


function Profiles({userObj}) {
  const [send, setSend] = useState('');
  const [tweets, setTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const [attachment, setAttachment] = useState("");
  const [attach, setAttech] = useState("");
  const [newBg, setNewBg] = useState("");


  console.log(userObj);
  


  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  }

  useEffect(() => {
    const q = query(collection(db, "send"),
                    where("createrId", "==", userObj.uid),
                    orderBy("createdAt","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
      });
      setTweets(newArray);
      setNewBg(newArray[0].attachmentUrl)
    });
  },[]);


  const onSubmit = async(e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      });
    }

  }

  const onChange = (e) => {
    const {target:{value}} = e;
    setNewDisplayName(value);
  
  }


  const onFileChange = (e) => {
    const {target:{files}} = e;

    const theFile = files[0];

    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const{currentTarget:{result}} = finishedEvent
      setAttachment(result);
  
    }
    reader.readAsDataURL(theFile)
    
  }


  const onImgSubmit = async (e) => {
    e.preventDefault();
    if (attachment !== "") {
      const attachmentRef = ref(storage, `${userObj.uid}/profileImage`);
      const response = await uploadString(attachmentRef, attachment, "data_url");
      const newPhotoUrl = await getDownloadURL(response.ref);
      await updateProfile(userObj, {
        photoURL: newPhotoUrl,
      });
      setAttachment("");
      
    }
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("사라져 제발");
    if (ok) {
      if (userObj.photoURL) {
        const desertRef = ref(storage, `${userObj.uid}/profileImage`);
        await deleteObject(desertRef);
        await updateProfile(userObj, { photoURL: null });
        setAttachment("");
      }
    }
  };
  const onBackSubmit = async(e) => {
    e.preventDefault();
    try {
      let attachmentUrl = "";
      if(attach !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`); // 사진을 스토리지에 저장
        const response = await uploadString(storageRef, attach, 'data_url');
        console.log('response->',response)
        attachmentUrl = await getDownloadURL(ref(storage, response.ref))  
      }  

      const docRef = await addDoc(collection(db, "send"), {
        text: send,
        createdAt: Date.now(),
        createrId: userObj.uid,  
        attachmentUrl
      });
      console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setSend("");
      setAttech("");
  } 

  const onBackChange = (e) => {
    const {target:{files}} = e;

    const theFile = files[0];

    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const{currentTarget:{result}} = finishedEvent
      setAttech(result);
  
    }
    reader.readAsDataURL(theFile)
  } 


  return (
    <>
      <Header a={<i><FaTimes/></i>} i={<FaUserAlt/>} /> 
      <main className='profile_main'>
      <section className='background'>
        <img src={newBg} alt='' />
        <h2 className='blind'>My profile background image</h2>
      </section>
        <section className='profile'>
          <div className='profile_cont'>
          <span onClick={onDeleteClick}><i>
            <FaUserAlt/>
          </i></span> 

          <form onSubmit={onBackSubmit}>
          <label htmlFor="atach-file" className='input__label'>
          <span>배경이미지 추가하세요</span>  
          </label>
          <input type='submit' value='배경업데이트' onChange={onChange} />
          </form>
          <input type='file' accept='image/*' onChange={onBackChange}
          id='atach-file' style={{opacity:0}} />  

          <form onSubmit={onSubmit}>
          <h2 className='blind'>My profile info</h2>
          <div className='profile_img empty'>
          </div>
            <input type='text' onChange={onChange} value={newDisplayName}
            placeholder='Display Name'/>
            <input type='submit' value='상태메시지' onChange={onChange} />
            </form>

            <form onSubmit={onImgSubmit}>
            <div className='profile_img' >
            <img src={userObj.photoURL} alt=''/> 
            </div>          
            <label htmlFor="attach-file" className='InsertInput__label'>
            <span>+++ </span>
            </label>
            <input type='submit' value='업데이트'  />
            </form>
            <input type='file' accept='image/*' onChange={onFileChange} 
             id='attach-file' style={{opacity:0}}/>
            <button onClick={onLogOutClick}>Log Out</button>
            <span className='profile_name'>{newDisplayName}</span>
            <input type='mail' className='profile_email' placeholder='Username@gmail.com'/>
            <ul className='profile_menu'>
            <li><a><span className='icon'></span>My Chatroom</a></li>
            </ul>
          </div>
        </section>
    </main>  

    </>
  )
}

export default Profiles