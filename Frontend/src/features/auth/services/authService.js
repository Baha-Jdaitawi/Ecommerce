import { loginApi, registerApi, logoutApi, getMeApi } from "../api/authApi";

export const loginService = async (email, password) => {

    const response = await loginApi(email, password)

    return response.data

}

export const registerService = async (name, email, password) => {

    const response = await registerApi(name, email, password)

    return response.data

}

export const logoutService = async () => {

    const response = await logoutApi()

    return response.data


}

export const getMeService = async () => {

    const response = await getMeApi()

    return response.data

}

