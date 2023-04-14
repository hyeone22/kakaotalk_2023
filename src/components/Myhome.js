import { db, storage } from 'fbase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { FaRegComment, FaPencilAlt  } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "styles/Myprofile.scss";
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';



function MyHome({userObj}) {
  const [tweets, setTweets] = useState("");
  const [tweet, setTweet] = useState([]);
  const [attachment, setAttachment] = useState("");


  useEffect(() =>{
    const q = query(collection(db, "send"),
                  orderBy("createdAt","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
      });
      setTweets(newArray);
    })
  },[]);


  const onFileChange = (e) => {
    const{target: {files}} = e;

    const theFile = files[0];

    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {currentTarget:{result}} = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      let attachmentUrl = "";
      if(attachment !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, attachment, 'data_url');
        attachmentUrl =  await getDownloadURL(ref(storage, response.ref))
      }

      const docRef = await addDoc(collection(db, "send"), {
        text: tweet,
        createdAt: Date.now(),
        createrId: userObj.uid,
        attachmentUrl
      }); 
      
    } catch (e) {
      
    }
    setTweet("");
    setAttachment("");
  }

  const onChange = (e) => {
    e.preventDefault();
    const {target:{value}} = (e);
    setTweet(value);
  }
  
  return (
    <div>
      <main>
      <section className='background'>
        <h2 className='blind'>My profile background image</h2>
      </section>
        <section className='profile'>
          <h2 className='blind'>My profile info</h2>
          <div className='profile_img empty'></div>
          <div className='profile_cont'>
            <form onSubmit={onSubmit}>
            <input type='text' placeholder="what's on your mind" value={tweet} onChange={onChange} />
            <input type='file' accept='image/*' onChange={onFileChange}/>
            <input type='submit' value='kakao' onChange={onChange} />
            </form>
            <span className='profile_name'></span>
            <input type='mail' className='profile_email' placeholder='Username@gmail.com'/>
            <ul className='profile_menu'>
            <li><a href='#'><span className='icon'><i><FaRegComment/></i></span>My Chatroom</a></li>
            <li><Link to={'/Profiles'}><span className='icon'><i><FaPencilAlt/></i></span>Edit Profile</Link></li>
            </ul>
           
          </div>
        </section>
    </main>  
    </div>
  )
}

export default MyHome