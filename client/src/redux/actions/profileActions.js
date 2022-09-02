import axios from "../../utils/axios"
import { CLEAR_MYPROFILE, CLEAR_PROFILE, DELETE_ACCOUNT, GET_MYPROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, PROFILE_LOADING, UPDATE_PROFILE } from "../types";
import { setNetworkError } from "../../utils";
import { setAlert } from "./alertActions";

export const getCurrentProfile = () => async dispatch => {

    try {
        const res = await axios.get('/api/profile/me')
        if (res.status === 200) {
            dispatch({
                type: GET_MYPROFILE,
                payload: res.data
            })
        }
    } catch (err) {
        (err.message === "Network Error") && dispatch(setNetworkError());
        // dispatch(setAlert({ msg: err.response.data.msg, alertType: "danger" }))
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                statusText: err.response.statusText,
                status: err.response.status
            }
        })
    }

}
export const createProfile = (profile, navigate, edit) => async dispatch => {
    try {
        const res = await axios.post('/api/profile', profile)
        dispatch({
            type: GET_MYPROFILE,
            payload: res.data
        })
        dispatch(setAlert({ msg: edit ? "Pofile Updated" : "Profile Created", alertType: "success" }))
        !edit && navigate("/dashboard")

    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.map(err => dispatch(setAlert({ msg: err.msg, alertType: "danger" })))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                statusText: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

// Educations Actions
export const createEducation = (education, navigate) => async dispatch => {
    try {
        const res = await axios.post('/api/profile/education', education)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert({ msg: "Education Added", alertType: "success" }))
        navigate("/dashboard")

    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.map(err => dispatch(setAlert({ msg: err.msg, alertType: "danger" })))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                statusText: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
export const deleteEducation = (eduId) => async dispatch => {
    try {
        const res = await axios.delete('/api/profile/education/' + eduId)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert({ msg: "Education Deleted", alertType: "primary" }))

    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.map(err => dispatch(setAlert({ msg: err.msg, alertType: "danger" })))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                statusText: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
// Experience Actions
export const createExperience = (experience, navigate) => async dispatch => {
    try {
        const res = await axios.post('/api/profile/experience', experience)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert({ msg: "Experience Added", alertType: "success" }))
        navigate("/dashboard")

    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.map(err => dispatch(setAlert({ msg: err.msg, alertType: "danger" })))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                statusText: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const deleteExperience = (expId) => async dispatch => {
    try {
        const res = await axios.delete('/api/profile/experience/' + expId)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert({ msg: "Experience Deleted", alertType: "primary" }))

    } catch (err) {

        const errors = err.response.data.errors
        if (errors) {
            errors.map(err => dispatch(setAlert({ msg: err.msg, alertType: "danger" })))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                statusText: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const deleteAccount = () => async dispatch => {
    try {
        await axios.delete('/api/profile')
        dispatch({
            type: DELETE_ACCOUNT,
        })
        dispatch({
            type: CLEAR_MYPROFILE,
        })
        dispatch(setAlert({ msg: "Your Account has been permently deleted", alertType: "danger" }))

    } catch (err) {

        const errors = err.response.data.errors
        if (errors) {
            errors.map(err => dispatch(setAlert({ msg: err.msg, alertType: "danger" })))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                statusText: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const getProfiles = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE,
    })

    try {
        const res = await axios.get('/api/profile')
        if (res.status == 200) {
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        }

    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.map(err => dispatch(setAlert({ msg: err.msg, alertType: "danger" })))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                statusText: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
export const getProfileById = (id) => async dispatch => {
    dispatch({
        type: PROFILE_LOADING,
        payload: true
    })
    try {
        const res = await axios.get('/api/profile/user/' + id)
        if (res.status == 200) {
            return dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }

    } catch (err) {
        console.log(err.response)
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data,
                statusText: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
export const getRepos = (username) => async dispatch => {
    try {
        const { data, status } = await axios.get('/api/profile/github/' + username)
        if (status == 200) {
            console.log("repos", data)
            dispatch({
                type: GET_REPOS,
                payload: data.data.length > 0 ? data.data : []
            })
        }

    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.map(err => dispatch(setAlert({ msg: err.msg, alertType: "danger" })))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data,
                statusText: err.response.statusText,
                status: err.response.status
            }
        })
    }
}