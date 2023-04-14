import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Profiles from './routes/Profiles'
import Auth from './routes/Auth'
import Navigation from './components/Navigation'
import Index from 'routes/Index'
import Chats from 'routes/Chats'
import Find from 'routes/Find'
import More from 'routes/More'
import Profile from 'routes/Profile'
import Chatting from 'routes/Chatting'


function AppRouter({isLoggedIn, userObj}) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    {isLoggedIn && <Navigation userObj={userObj} />}
    <Routes>
      {isLoggedIn ? (
        <>
        <Route path='/' element={<Index userObj={userObj} />} />
        <Route path='/profiles' element={<Profiles userObj={userObj} />} />
        <Route path='/chats' element={<Chats/>}/>
        <Route path='/find' element={<Find/>}/>
        <Route path='/more' element={<More  userObj={userObj}/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/chatting' element={<Chatting userObj={userObj}/>}/>

        
        </>
        ) : (
        <Route path='/' element={<Auth />}/>
      )}
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter