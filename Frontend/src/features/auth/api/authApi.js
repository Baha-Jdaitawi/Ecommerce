import { api } from "../../../api.js/axios";

export const loginApi=(email,password)=>{

return api.post("auth/login",{email,password})


}

export const logoutApi=()=>{

return api.post("auth/logout")

}

export const registerApi=(name,email,password)=>{

return api.post("auth/register",{name,email,password})



}

export const getMeApi=()=>{

return api.get("auth/me")

}
