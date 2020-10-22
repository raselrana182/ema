import React, { useContext, useState } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, initializeLoginFramework, handleSignedOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';




function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const signedOut = () => {
    handleSignedOut()
    .then(res => {
      handleResponse(res, false);
    })
  }

  const handleResponse = (res, redirect) => {
      setUser(res);
      setLoggedInUser(res);
      if(redirect){
        history.replace(from);
      }
  }

  

  
  const handleBlur = (e) =>{
    //console.log(e.target.name, e.target.value);
    let isFieldValid = true ;
    if (e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/ .test(e.target.value);
      
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo [e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  // function success(){
    
  // }
  // function error() {
    
  // }
  const handleSubmit = (e) => {
    //console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick ={signedOut}>Sign out</button> : 
        <button onClick ={googleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && 
        <div>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User? Sign Up</label>
      <form onSubmit = {handleSubmit}>
        {newUser && <input type="text" name="name" onBlur = {handleBlur} placeholder = "Your Name" />}
        <br/>
        <input type="text" name = "email" placeholder = "Email Address" onBlur = {handleBlur} required/>
        <br/>
        <input type="password" name="password" placeholder = "Password" onBlur = {handleBlur} required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
      </form>
      <p style = {{color: 'red'}}>{user.error}</p>
      {user.success && <p style = {{color: 'green'}}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}
    </div>
  );
}

export default Login;
