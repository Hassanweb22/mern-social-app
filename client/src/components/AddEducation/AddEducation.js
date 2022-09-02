import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createEducation } from '../../redux/actions/profileActions'

const AddEducation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { profileReducer: { loading, profile } } = useSelector(state => state)

    const initialState = {
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: ""
    }
    const [state, setState] = useState(initialState)

    const handleChange = (e) => {
        const { name, value, checked } = e.target
        setState({ ...state, [name]: name === "current" ? checked : value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newEdu = { ...state, to: !state.current ? state.to : "" }
        dispatch(createEducation(newEdu, navigate))
    }


    return (
        <section className="container">
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-mortar-board"></i> Add any school, bootcamp, etc that you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input onChange={handleChange} type="text" placeholder="* School or Bootcamp" name="school" value={state.school} />
                </div>
                <div className="form-group">
                    <input onChange={handleChange} type="text" placeholder="* Degree or Certificate" name="degree" value={state.degree} />
                </div>
                <div className="form-group">
                    <input onChange={handleChange} type="text" placeholder="Field of study" name="fieldofstudy" value={state.fieldofstudy} />
                </div>
                <div className="form-group">
                    <p className="date-text">From Date</p>
                    <input onChange={handleChange} type="date" name="from" value={state.from} />
                </div>

                <div className="form-group checkbox">
                    <input onChange={handleChange} type="checkbox" placeholder="Current School or Bootcamp" name="current" value={state.current} />
                    <p className="form-text">Current School or Bootcamp</p>
                </div>

                {!state.current && (
                    <div className="form-group">
                        <p className="date-text">To Date</p>
                        <input onChange={handleChange} type="date" name="to" value={state.to} />
                    </div>
                )}

                <div className="form-group">
                    <textarea placeholder="A short Program Description" name="description" value={state.description} onChange={handleChange} rows={5}></textarea>
                </div>

                <div className="buttons my-2">
                    <a className="btn btn-primary" onClick={handleSubmit}>Submit</a>
                    <a className="btn btn-light" onClick={_ => navigate("/dashboard")}>Go Back</a>
                </div>
            </form>
        </section>
    )
}

export default AddEducation