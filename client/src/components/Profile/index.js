import React, { useEffect, Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../layout/Loading'
import { getProfileById, getRepos } from '../../redux/actions/profileActions'
import "./Profile.css"
import Top from './Top'
import About from './About'
import Experience from './Experience'
import Education from './Education'

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { devId } = useParams()

    const { profileReducer: { loading, profile, repos }, authReducer: { isAuthenticated, user } } = useSelector(state => state)

    useEffect(() => {
        dispatch(getProfileById(devId))
    }, [devId, dispatch])

    useEffect(() => {
        dispatch(getRepos(profile?.githubusername))
    }, [devId, dispatch])


    return (
        <div className="container">
            {profile ?
                <Fragment>
                    <div className="buttons">
                        <a className="btn btn-light" onClick={_ => navigate("/developers")}>Back To Profiles</a>
                        {isAuthenticated && (profile?.user.name === user?.name) &&
                            <a className="btn btn-dark" onClick={_ => navigate("/create-profile")}>Edit Profile</a>
                        }
                    </div>
                    <Top profile={profile} />
                    <About skills={profile.skills} user={profile?.user || {}} />
                    <div className="history">
                        <Experience experience={profile?.experience} />
                        <Education education={profile?.education} />
                    </div>

                    <div className="repos">
                        <p className="lead bold"> <i className="fa-brands fa-github" ></i>Github Repos</p>
                        {repos.length > 0 && repos.map(repo =>
                            <div className="repo">
                                <div>
                                    <a className="title" href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                                    <p className="description">{repo.description}</p>
                                </div>
                                <ul className="info">
                                    <li className="badge-primary">  Stars: {repo.stargazers_count}</li>
                                    <li className="badge-dark">Watchers: {repo.watchers_count}</li>
                                    <li className="badge-light">Forks: {repo.forks_count}</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </Fragment>
                :
                (loading ? <Loading /> :
                    <div>
                        <p className="lead my-1">No Profile With this Id Exists</p>
                    </div>
                )
            }
        </div>
    )
}

export default Profile