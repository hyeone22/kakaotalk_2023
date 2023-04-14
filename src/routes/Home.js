import Kakao from 'components/Kakao';
import { db } from 'fbase';
import { collection, addDoc, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

function Home({userObj}) {
  const [kakao, setKakao] = useState('');
  const [kakaos, setKakaos] = useState([]);


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
      const docRef = await addDoc(collection(db, "kakaos"), {
        text: kakao,
        createdAt: Date.now(),
        createrId: userObj.uid,  // 문서를 누가 작성했는지 알아내야함 userObj > 로그인한 사용자 정보
      });
      console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setKakao("");  
    }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder="what's on your mind" value={kakao} onChange={onChange}/>
        <input type='submit' value='kakao' onChange={onChange} /> 
      </form>
      <div>
        {kakaos.map(kakao => (
          <Kakao key={kakao.id} kakaoObj={kakao} isOwner={kakao.createrId === userObj.uid}/> 
        ))}
      </div>
    </>
  )
}

export default Home