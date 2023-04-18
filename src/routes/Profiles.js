import { authService, db, storage } from 'fbase';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCamera,FaTrashAlt,FaFileImage,FaEyeSlash,FaSignOutAlt,FaTimes  } from "react-icons/fa";
import { updateProfile } from 'firebase/auth';
import { addDoc, collection,deleteDoc,getDocs,onSnapshot, orderBy, query, where } from 'firebase/firestore';
import "styles/Profiles.scss";
import { v4 as uuidv4 } from 'uuid';
import { deleteObject, getDownloadURL,ref,uploadString } from 'firebase/storage';
import Header from 'components/Header';



function Profiles({userObj}) {
  const [send, setSend] = useState('');
  const [tweets, setTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const [attachment, setAttachment] = useState("");
  const [attach, setAttech] = useState("");
  const [newBg, setNewBg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showBack, setShowBack] = useState(false);



  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const backToggle = () => {
    setShowBack(!showBack);
  }
  
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
      if (newArray.length > 0 && newArray[0].attachmentUrl) {
        setNewBg(newArray[0].attachmentUrl);
      }
       
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
        attachmentUrl = await getDownloadURL(ref(storage, response.ref));  
      }  

      const docRef = await addDoc(collection(db,"send"), {
        createdAt: Date.now(),
        createrId: userObj.uid,  
        attachmentUrl
      });
      console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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

  const onDeletesClick = async (e) => {
    const yes = window.confirm("삭제하시겠습니까?");
    const querySnapshots = await getDocs(collection(db,"send"));
    let storageReff = "";
    if (yes) {
      querySnapshots.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        if (attach) {
          storageReff = ref(storage, attach);
          await deleteObject(storageReff);
        }
      });
      setAttech("");
    }
  };

  return (
    <>
      <Header h1={'My Profiles'} 
      a={<Link to={'/'} style={{ color: 'white', textDecoration: 'none' }}>
      <i>
        <FaTimes style={{ color: 'white' }} />
      </i>
    </Link>}
        
      />
      <main className='profile_main'>
      <section className='profiles_background'>
        {newBg && (
          <img src={newBg} alt='' />
        )}
        
        <h2 className='blind'>My profile background image</h2>
        
      </section>
        <section className='profile_sub'>
          
          <div className='profile_cont'>

          <div className='toggle_btn'>
          <button onClick={onDeletesClick} className='back_delete'><i><FaEyeSlash/></i></button>
          <button onClick={backToggle} className='toggle_back'><i><FaFileImage/></i></button>
          <button onClick={onLogOutClick} className='profile_logout'><i><FaSignOutAlt/></i></button>
          </div>  

          <span className='profile_delete' onClick={onDeleteClick}><i><FaTrashAlt/></i></span>         
          
          {showBack && (
            <form className='back_form' onSubmit={onBackSubmit}>
            <label htmlFor="atach-file" className='input__label'>
            <span>Add Background </span>  
            </label>
            <input type='submit' value='확인' onChange={onChange} className='back_input' />
            </form>
          )}

          <span className='profiles_name'>{newDisplayName}</span>
          <input type='mail' className='profile_email' placeholder='Username@gmail.com'/>

          <form onSubmit={onSubmit} className='text_form'>
          <h2 className='blind'>My profile info</h2>
            <input type='text' onChange={onChange} value={newDisplayName}
            placeholder='Profile Name'/>
            <input type='submit' value='상태메시지' onChange={onChange} />
            </form>

          <input type='file' accept='image/*' onChange={onBackChange}
          id='atach-file' style={{display:'none'}} />  

            <div className='profile_img empty' >
              {userObj.photoURL && (
                <img src={userObj.photoURL} alt=''/> 
              )}

            </div>
          
            <button onClick={toggleForm} className='toggle_profile'><i><FaCamera/></i></button>
              {showForm && (
              <form className='profiles_form' onSubmit={onImgSubmit} >
                <label htmlFor="attach-file" className='InsertInput__label'>
                <span>Add Profiles Img</span>
                </label>
                <input type='submit' value='update' className='profiles_input' />                
              </form>
               )}
               <input type='file' accept='image/*' onChange={onFileChange} id='attach-file' style={{display:'none'}}/>             
          </div>
        </section>
    </main>  

    </>
  )
}

export default Profiles