import React, { useState } from 'react';
import {authService} from 'fbase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider,
  signInWithPopup  } from "firebase/auth"; //신규회원가입을위해필요한함수
import { async } from '@firebase/util';
import '../styles/Auth.scss'


function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); //이메일과 패스워드에 입력된 값을 가져와
  const [newAccount, setNewAccount] = useState(true); // true회원가입, false로그인
  const [error, setError] = useState('');

  const onChange = (e) => {
    console.log('e.target.name->',e.target.name);
    console.log(e);
    const {target:{name, value}} = e; //구조분해할당으로 타겟이라는 속성 중에서 name과 value를 가져온다
    if(name === 'email'){
      setEmail(value);
    }else if(name === 'password'){
      setPassword(value);
    }
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    try {  // try catch 문 
      let data;
      if(newAccount){
        //회원가입
      data = await createUserWithEmailAndPassword(authService, email, password)
      }else{
        //로그인
      data = await signInWithEmailAndPassword(authService, email, password)
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    
  }

  const toggleAccount = () => setNewAccount(prev => !prev);

  const onSocialClick = async (e) => {  //구글,깃허브 회원가입
    console.log('e.target.name->',e.target.name);
    const {target:{name}} = (e);
    let provider;
    if(name === "google"){
       provider = new GoogleAuthProvider(); // 변수 이름이 겹치니까 let provider 로 만듬
    }else if(name === "github"){
       provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log('data->',data);
  }

  return (
    <div className='auth'>
      <section className='auth_background'>
      <h2 className='blind'>Chatting Api</h2>
      <h3>Chatting App</h3>
      </section>
      <form onSubmit={onSubmit}>
        <input name='email' type='email' placeholder='Email' required 
        value={email} onChange={onChange} />
        <input name='password' type='password' placeholder='Password' required 
        value={password} onChange={onChange} />
        <input type='submit' value={newAccount ? "Create Account" : "Log In"}
          className='auth_input_account' />

        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <p>Or Login with</p>
      <div>
        <button onClick={onSocialClick} name="google" className='auth_google' >Continue with Google</button>
        <button onClick={onSocialClick} name="github" className='auth_github' >Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth