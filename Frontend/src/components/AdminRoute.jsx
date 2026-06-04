import useAuth from "../features/auth/hooks/useAuth";
import {Navigate} from "react-router-dom";


export const AdminRoute=({children})=>{
const{user,loading}=useAuth()

if(loading) return <p>is loading...</p>
if(!user) return <Navigate to="/login"/>
if(user.role!=="admin") return <Navigate to="/"/>
return children
}