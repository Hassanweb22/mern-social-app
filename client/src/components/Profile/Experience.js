import moment from 'moment'
import React from 'react'

const Experience = ({ experience }) => {

    return (
        <div className="exp_container">
            <p className="lead bold">Experience</p>
            {!!experience.length ? experience.map(({ company, title, from, to, current, description, _id }) =>
                <div className="experience" key={_id}>
                    <p className="company">{company}</p>
                    <p className="">{
                        moment(from).format("ll") + " - " + (
                            current ? "Present" : moment(to).format("ll")
                        )}</p>
                    <p className="">
                        <span>Position:</span>
                        {title}
                    </p>
                    <p className="desc"><span>Description:</span>
                        {description}
                    </p>
                </div>
            ) :
                <h4>No Experience Credentials</h4>
            }
        </div>
    )
}

export default Experience