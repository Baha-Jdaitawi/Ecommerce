import { useState} from "react";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom"


export const LoginForm=()=>{

const {login,error,loading}=useAuth()
const navigate=useNavigate()

const[email,setEmail]=useState("")
const[password,setPassword]=useState("")


const handleSubmit=async(e)=>{

e.preventDefault()

const data=await login(email,password)

if(data) {

navigate("/")


}

}





return (

<form onSubmit={handleSubmit}>

<div>
<input value={email} onChange={(e)=>setEmail(e.target.value)}>Email</input>
</div>


<div>
<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}> Password </input>
</div>


<button type="submit" disabled={loading}>{
    
loading?"loggin in....":"login"    
    
    
}</button>



</form>


)

}

export default LoginForm