import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export const RegisterForm=()=>{

const {register,loading,error}=useAuth()    
const navigate=useNavigate()


const[formData,setFormData]=useState({name:"",email:"",password:""})


const handleSubmit=async(e)=>{



e.preventDefault()



const data=await register(formData.name,formData.email,formData.password) 

if(data) navigate("/")

}





const handleChange=(e)=>{

setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))


}


return (

<form onSubmit={handleSubmit}>

<div>

<input type="text" name="name" value={formData.name} onChange={handleChange}/>

</div>




<div>

<input type="email" name="email" placeholder="Enter your email" value={formData.email}  onChange={handleChange}/>

</div>

<div>

<input type="password" name="password" placeholder="Enter your password" value={formData.password}  onChange={handleChange}/>

</div>

{error&&<p>{error}</p>}

<button disabled={loading}type="submit">

{loading?"Registering...":"Register"}


</button>



</form>
)
}
