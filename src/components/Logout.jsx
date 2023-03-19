import React from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Logout = () => {
  return (
    <div>
      <button onClick={()=>signOut(auth)}>Logout</button>
    </div>
  )
}

export default Logout
