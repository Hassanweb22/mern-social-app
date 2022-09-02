import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";

import { setLogin } from '../../redux/actions/authActions'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alerts = useSelector(state => state.alertReducer)

    const initialState = {
        email: "",
        password: "",
    }
    const [state, setState] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            email: state.email,
            password: state.password
        }
        dispatch(setLogin(user, navigate))
    }


    return (
        <div className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead" ><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    disabled={alerts.length > 0}
                    value={alerts.length > 0 ? "Loading..." : "Login"} />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    )
}

export default Login