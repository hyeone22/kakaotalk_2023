import { db, storage } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react'
import "styles/Kakao.scss";
import { FaTrashAlt,FaRegEdit } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

function Kakao(props) {
  const{kakaoObj:{text,id,attachmentUrl},isOwner} = props;
  const[editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(text);
  const location = useLocation();
  const { name } = location.state;
  console.log(name)


  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok){
      const data = await deleteDoc(doc(db, `kakaos${name}/${id}`));
      if(attachmentUrl !== ""){
        const desertRef = ref(storage, attachmentUrl);
        await deleteObject(desertRef);
      }
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (e) => {
    const {target:{value}} = e;
    setNewTweet(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTweetRef = doc(db, `kakaos${name}/${id}`);
    
    await updateDoc(newTweetRef, {
      text: newTweet,
      createdAt: Date.now(),
    });
    setEditing(false);
  }

  return (
    <div className='chatting_set'>
     {editing ? (
      <>
        <form onSubmit={onSubmit} className='kakao_form'>
          <input type='text'  onChange={onChange} value={newTweet} required className='kakao_form_text' />
          <input type='submit' value='Update Message' className='kakao_form_submit' />
          <button onClick={toggleEditing} className='chatting_cancel'>Cancel</button>
        </form> 
      </>
     ) : (
      <>
        {text && (
          <span className='chat_my'>{text}</span>
        )}
        {attachmentUrl && (
          <img src={attachmentUrl} width='100' height='100' alt="" className='chat_img' />
        )}
        <span className='chat_time'><span>12</span>:<span>08</span></span>
          {isOwner && (
          <>
          <button onClick={onDeleteClick} className='chatting_close'><i><FaTrashAlt /></i></button>
          <button onClick={toggleEditing} className='chatting_edit'><i><FaRegEdit /></i></button> 
          </>
         )}      
      </>
     )}
  </div>
  )
}
export default Kakao