import {
    REMOVE_TOKEN,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_MYPROFILE
} from "../types"
import { setAlert } from './alertActions'
import { setNetworkError, setToken } from '../../utils/index'
import axios from '../../utils/axios'
import { getCurrentProfile } from "./profileActions"


export const loadUser = () => async dispatch => {
    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
    }
    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        dispatch(getCurrentProfile())

    } catch (err) {
        dispatch({ type: AUTH_ERROR });

        (err.message === "Network Error") && dispatch(setNetworkError());
        const errors = err.response.data.errors
        if (errors) {
            errors.map(err => dispatch(setAlert({ msg: err.msg, alertType: "danger" })))
        }
    }

}

export const setRegister = ({ name, email, password }, navigate) => async dispatch => {
    try {
        const res = await axios.post('/api/users', { name, email, password })
        if (res.status === 200) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.token
            })
            dispatch(loadUser())
            dispatch(
                setAlert({ msg: "Successfully Registered", alertType: "success" })
            )
            navigate("/dashboard")
        }

    } catch (err) {
        err.message === "Network Error" && dispatch(setNetworkError());

        const errors = err.response.data.errors
        if (errors) {
            errors.map(err => dispatch(setAlert({ msg: err.msg, alertType: "danger" })))
        }
        dispatch({ type: REGISTER_FAIL })
    }
}

export const setLogin = ({ email, password }, navigate) => async dispatch => {
    try {
        const res = await axios.post('/api/auth', { email, password })
        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.token
            })
            dispatch(
                setAlert({ msg: "Successfully Login", alertType: "primary" })
            )
            dispatch(loadUser())
            navigate("/dashboard")
        }

    } catch (err) {
        err.message === "Network Error" && dispatch(setNetworkError());

        const errors = err.response.data.errors
        if (errors) {
            errors.map(err => dispatch(setAlert({ msg: err.msg, alertType: "danger" })))
        }
        dispatch({ type: LOGIN_FAIL })
    }
}
export const logOut = (navigate) => async dispatch => {

    dispatch({ type: LOGOUT })
    dispatch({ type: CLEAR_MYPROFILE })
    navigate("/login")

}
