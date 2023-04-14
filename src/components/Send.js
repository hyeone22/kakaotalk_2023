import { db, storage } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaRegComment } from 'react-icons/fa';
import "styles/Send.scss";

function Send(props) {

  const{sendObj:{createrId,createdAt,text,id,attachmentUrl},isOwner} = props;
  const[editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(text);
  const [nowDate, setNowDate] = useState(createdAt);


  const onDeleteClick = async() => {
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok){
      const data = await deleteDoc(doc(db, "send", `/${id}`));
      if(attachmentUrl !== ""){
        const desertRef = ref(storage, attachmentUrl);
        await deleteObject(desertRef);  
      }
    }
  }


  const toggleEditing = () => setEditing((prev) => !prev); //토글기능  

  const onChange = (e) => {
    const {target:{value}} = e;
    setNewTweet(value);
  }

  const onSubmit = async (e) =>{ // 문서 업데이트
    e.preventDefault();
    const newTweetRef = doc(db, "send", `/${id}`);
  
    await updateDoc(newTweetRef, {
    text: newTweet,
    createdAt: Date.now(),
    });
    setEditing(false);
  }

  useEffect(() => {
    let timeStamp = createdAt;
    const now = new Date(timeStamp);
    setNowDate(now.toDateString()); //.toUTCString() .toDateString()
  },[])
  
  return (
    <div className='send'>
     {editing ? (
      <>
        <form onSubmit={onSubmit} className='container tweetEdit'>
          <input type='text' onChange={onChange} value={newTweet} required className='formInput' />
          <input type='submit' value='Update Tweet' className='formBtn' />
        </form>
        <button onClick={toggleEditing} className='formBtn cancelBtn'>Cancel</button>
      </>
     ) : (
      <>
        <h2 className='blind'>My profile info</h2>
        <div className='profile_img '>
        {attachmentUrl && (
          <img src={attachmentUrl} width='40' height='40'  alt="" />
        )}
        </div>
        <span className='profile_name'>{text}</span>
          {isOwner && (
          <div className="tweet__actions">
          <span onClick={onDeleteClick}>
          <i><FaRegComment/></i>
          </span>
          <span onClick={toggleEditing}>
          <i><FaPencilAlt/></i>
          </span> 
          </div>
         )}      
      </>
     )}
  </div>
  )
}

export default Send