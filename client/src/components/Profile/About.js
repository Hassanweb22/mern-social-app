import React, { Fragment } from 'react'
import { splitName } from '../../utils'

const About = ({ user, skills, bio }) => {

    return (
        <div className="bio_skills my-1">
            {bio &&
                <Fragment>
                    <div className="bio_container">
                        <p className="lead bold">{splitName(user?.name).firstName} Bio</p>
                        <p className="desc">{bio}</p>
                    </div>
                    <div className="divider" />
                </Fragment>
            }

            <div className="skill_container">
                <p className="lead bold">Skill Set</p>
                <div className="skills">
                    {skills.map(skill =>
                        <span className="skill" key={skill}>
                            <i className="fas fa-check" />
                            {skill}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default About