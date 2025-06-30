
import { useEffect } from 'react'
import './App.css'
import { useState } from 'react';

import Form from './Form';
import Update from './Update';

function App() {
  const [userData,setUserData]=useState({});
 useEffect(()=>{

  async function fetchData(){
let data=await fetch("http://localhost:3000/");

setUserData(await data.json())

  }
  fetchData()


 },[]);

  return (
    <>
    <h1>{userData.name}</h1>
    <p>Email:- {userData.email}</p>
    <p>PhoneNo:- {userData.number}</p>
    <p>Bio:- {userData.bio}</p>
    <p>Image:- {userData.image}</p>
    <img src={userData.profilePicture} style={{width:"300px"}}/>
   <Form></Form>
   <Update></Update>
    </>
  )
}

export default App
