import React, { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './Router';
import { authService } from './fbase';
import { onAuthStateChanged } from 'firebase/auth';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) =>{
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);

  return (
    <>
    {init ? (  <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
    ) : (
      "Loading..."
    )}
    </>
  );
}

export default App;
