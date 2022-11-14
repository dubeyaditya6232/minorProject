import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../../config"
import { AuthContext } from "../../context/AuthContext"
import "./login.css"

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })
    const {user, loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleLogin = async (e) =>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axiosInstance.post("/auth/login",credentials)
            dispatch({type:"LOGIN_SUCCESS", payload: res.data})
            navigate("/");
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
        }
    }

    return (
        <div className="login">
            <div className="lContainer">
                <span className="lTitle">Login</span>
                <input className="lInput" type="text" placeholder="username" id="username" onChange={handleChange} />
                <input className="lInput" type="password" placeholder="password" id="password" onChange={handleChange} />
                <button disabled={loading} onClick={handleLogin} className="lButton">Login</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login