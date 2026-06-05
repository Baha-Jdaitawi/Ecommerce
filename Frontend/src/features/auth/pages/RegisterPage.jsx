import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { RegisterForm } from "../components/RegisterForm";
import { useNavigate, Link } from "react-router-dom";

export const RegisterPage = () => {

    const { user, loading } = useAuth()
    const navigate = useNavigate()


    useEffect(() => {

        if (!loading && user) navigate("/")

    }, [loading, user])

    return (

        <div>

            <h1>Register form</h1>

            <RegisterForm />

            <p>Already have an acount? <Link to="/login">Login</Link></p>

        </div>


    )

}