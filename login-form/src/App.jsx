import { useState } from 'react'
import './App.css'

function App(){
        const [pass, setPass] = useState(true)
        function showPass(){
          if(pass){
          setPass(false)
        }
        else{
          setPass(true)
        }}
        return(
          <>
          <h2>Hello, Welcome to my website</h2>
          <br />
          <input type="email" placeholder="Email"/>
          <br />

          <input type={pass ? "password":"text" } placeholder="Password"/> <button className="btn" onClick ={showPass}>{pass ? "Show" : "Hide"}</button>
          <br />

          <button className="btn">Login</button>
        

          <button className="btn">Sign Up</button>
        </>
      )
      }

export default App
