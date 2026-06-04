import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const LoginPage=()=>{

const {user,loading}=useAuth()
const navigate=useNavigate()


useEffect(()=>{

if(!loading&&user){

navigate("/")


} 




},[user,loading])

return (

<div>

<h1>Login form</h1>

<LoginForm/>

<p>Don't have an acount? <Link to="/reigister">Reegister</Link></p>




</div>

)
}

export default LoginPage