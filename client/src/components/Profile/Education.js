import moment from 'moment'
import React from 'react'

const Education = ({ education }) => {
    return (
        <div className="edu_container">
            <p className="lead bold">Education</p>
            {!!education.length ? education.map(({ school, degree, fieldofstudy, from, to, current, description, _id }) =>
                <div className="experience" key={_id}>
                    <p className="company">{school}</p>
                    <p className="">{
                        moment(from).format("ll") + " - " + (
                            current ? "Present" : moment(to).format("ll")
                        )}</p>
                    <p className="">
                        <span>Degree:</span>
                        {degree}
                    </p>
                    <p className="">
                        <span>Field Of Study:</span>
                        {fieldofstudy}
                    </p>
                    <p className="desc"><span>Description:</span>
                        {description}
                    </p>
                </div>
            ) :
                <h4>No Education Credentials</h4>
            }
        </div>

    )
}

export default Education