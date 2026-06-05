import useAuth from "../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";


export const ProtectedRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const navigate = useNavigate()

    if (loading) return <p>is loading...</p>

    if (!user) navigate("/")

    return children

}