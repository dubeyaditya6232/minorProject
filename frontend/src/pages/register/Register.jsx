import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../../config"
import { AuthContext } from "../../context/AuthContext"
import "./register.css"

const initialState = {
    username: '',
    password: '',
    email: ''
}

const Login = () => {
    const [credentials, setCredentials] = useState(initialState)
    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axiosInstance.post("/auth/register", credentials)
            dispatch({ type: "LOGIN_START" });
            navigate("/login");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
        }
        setCredentials(initialState)
    }

    return (
        <div className="register">
            <div className="lContainer">
                <span className="lTitle">Register</span>
                <input className="lInput" type="text" placeholder="username" id="username" onChange={handleChange} />
                <input className="lInput" type="email" placeholder="email" id="email" onChange={handleChange} />
                <input className="lInput" type="password" placeholder="password" id="password" onChange={handleChange} />
                <button disabled={loading} onClick={handleRegister} className="lButton">Register</button>
                {error && <span>Use different username or email</span>}
            </div>
        </div>
    )
}

export default Login