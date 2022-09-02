import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProfile } from '../../redux/actions/profileActions'

const CreateProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { profileReducer: { loading, myprofile } } = useSelector(state => state)


    const [social, setSocial] = useState(false)

    const initialState = {
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        bio: "",
        githubusername: "",
        youtube: "",
        facebook: "",
        linkedin: "",
        instagram: "",
        twitter: "",
    }
    const [state, setState] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("state", state)
        dispatch(createProfile(state, navigate, !!myprofile))
    }

    useEffect(() => {
        let userProfile = {}
        if (!loading && myprofile) {
            Object.keys(myprofile).map(key => {
                if (state.hasOwnProperty(key)) {
                    userProfile[key] = myprofile[key]
                }
            })
            setState({ ...state, ...userProfile, ...myprofile?.social })
        }

        // console.log({ loading, myprofile, userProfile })
    }, [myprofile])


    return (
        <section className="container">
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <select name="status" onChange={handleChange} value={state.status}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                    >
                </div>
                <div className="form-group">
                    <input onChange={handleChange} type="text" placeholder="Company" name="company" value={state.company} />
                    <small className="form-text"
                    >Could be your own company or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input onChange={handleChange} type="text" placeholder="Website" name="website" value={state.website} />
                    <small className="form-text"
                    >Could be your own or a company website</small
                    >
                </div>
                <div className="form-group">
                    <input onChange={handleChange} type="text" placeholder="Location" name="location" value={state.location} />
                    <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                    >
                </div>
                <div className="form-group">
                    <input onChange={handleChange} type="text" placeholder="* Skills" name="skills" value={state.skills} />
                    <small className="form-text"
                    >Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)</small
                    >
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={state.githubusername}
                    />
                    <small className="form-text"
                    >If you want your latest repos and a Github link, include your
                        username</small
                    >
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={state.bio} onChange={handleChange} rows={5}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <a className="btn btn-light" onClick={_ => setSocial(!social)}>
                        Add Social Network Links
                    </a>
                    <span>Optional</span>
                </div>
                {social && (
                    <Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={state.twitter} onChange={handleChange} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={state.facebook} onChange={handleChange} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={state.youtube} onChange={handleChange} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={state.linkedin} onChange={handleChange} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={state.instagram} onChange={handleChange} />
                        </div>
                    </Fragment>
                )}
                <div className="buttons my-2">
                    <a className="btn btn-primary" onClick={handleSubmit}>Submit</a>
                    <a className="btn btn-light" onClick={_ => navigate(-1)}>Go Back</a>
                </div>
            </form>
        </section>
    )
}

export default CreateProfile