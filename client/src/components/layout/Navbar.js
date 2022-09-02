import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../../redux/actions/authActions'

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, loading } = useSelector(state => state.authReducer)

    const authLinks = (
        <ul>
            <li>
                <Link to="/developers">Developers</Link>
            </li>
            <li>
                <a onClick={_ => navigate("/dashboard")}>
                    <span className="">Dashboard</span>
                </a>
            </li>
            <li>
                <a onClick={_ => dispatch(logOut(navigate))}>
                    <i className="fas fa-right-from-bracket"></i>{" "}
                    <span className="">Logout</span>
                </a>
            </li>
        </ul>
    )
    const guestLinks = (
        <ul>
            <li><Link to="/developers">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {!loading && (isAuthenticated ? authLinks : guestLinks)}
        </nav>
    )
}

export default NavBar