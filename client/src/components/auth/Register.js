import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setRegister } from '../../redux/actions/authActions'
import { setAlert } from '../../redux/actions/alertActions'
import { useDispatch, useSelector } from 'react-redux'

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alerts = useSelector(state => state.alertReducer)

    const initialState = {
        name: "",
        email: "",
        password: "",
        password2: ""
    }
    const [state, setState] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (state.password !== state.password2) {
            return dispatch(setAlert({ msg: "Password does not match", alertType: "danger" }))
        }
        const newUser = {
            name: state.name,
            email: state.email,
            password: state.password
        }
        dispatch(setRegister(newUser, navigate))
    }

    return (
        <div className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        onChange={handleChange}
                    />
                    <small >This site uses Gravatar so if you want a profile image, use a Gravatar emailss</small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        onChange={handleChange}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    // disabled={alerts.length > 1}
                    value={alerts.length > 1 ? "Loading..." : "Register"}
                />
            </form>
            <p className="my-1">
                Alreadyt have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    )
}

export default Register