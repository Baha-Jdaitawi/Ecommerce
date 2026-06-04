import { createContext,useState,useEffect } from "react";
import { getMeService,loginService,registerService,logoutService} from "../services/authService";


export const AuthContext=createContext(null)


export const AuthProvider=({children})=>{

const[user,setUser]=useState(null)
const[error,setError]=useState(null)
const[loading,setLoading]=useState(true)


const checkAuth=async()=>{

try{

const data=await getMeService()
setUser(data.user)


}catch{

setUser(null)


}finally{

setLoading(false)


}
}

const register=async(name,email,password)=>{

try{

const data=await registerService(name,email,password)
setUser(data.user)

}catch(error){

setError(error.response?.data?.message || "Register failed")



}finally{

setLoading(false)


}
}

const login=async(email,password)=>{

try{

const data=await loginService(email,password)
setUser(data.user)

}catch(error){

setError(error.response?.data?.message||"Login failed")



}finally{

setLoading(false)


}
}

const logout=async()=>{

try{

const data=await logoutService()
setUser(null)


}catch(error){

setError(error.response?.data?.message||"Failed to logout")

}finally{

setLoading(false)

}
}

useEffect(()=>{

checkAuth()



},[])

return (

<AuthContext.Provider value={{

user,
login,
logout,
loading,
error

}}>
</AuthContext.Provider>
)
}

export default AuthProvider