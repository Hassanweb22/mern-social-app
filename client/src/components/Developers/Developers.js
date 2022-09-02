import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfiles } from '../../redux/actions/profileActions'
import Loading from '../layout/Loading'
import "./Developer.css"

const Developers = () => {
    const dispatch = useDispatch()

    const { profileReducer: { profiles } } = useSelector(state => state)

    useEffect(() => {
        dispatch(getProfiles())
    }, [dispatch])

    return (
        <Fragment>
            {!!profiles.length ? (
                <div className="container">
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead" ><i className="fas fa-globe" />
                        <span style={{ textTransform: "capitalize" }}>Browse and connect with developers</span>
                    </p>
                    <div className="profiles">
                        {profiles.map(({ _id: profileId, company, location, skills, user: { name, avatar, _id } }) => {
                            return (
                                <div className="profile_card my-1" key={profileId}>
                                    {/* 1st div */}
                                    <div className="">
                                        <div className="img_container">
                                            <img src={avatar || require("../../assets/images/developer.png")} />
                                        </div>
                                        <div className="profile_details">
                                            <div>
                                                <p className="lead bold">{name}</p>
                                                <p>{company}</p>
                                                <p>{location}</p>
                                            </div>
                                            <Link
                                                className="btn btn-primary"
                                                to={"/developers/" + _id}
                                            >
                                                View Profile
                                            </Link>
                                        </div>
                                    </div>

                                    {/* 2nd div */}
                                    <div className="profile_skills ">
                                        {skills.map(skill =>
                                            <p className="skill" key={skill}>
                                                <i className="fas fa-check" />
                                                {skill}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            )
                : (
                    <Loading />
                )
            }
        </Fragment>
    )
}

export default Developers