import React from 'react'

const Top = ({ profile: { user, company, status, location, social, website } }) => {
    return (
        <div className="profile_container">
            <div className="img_container">
                <img
                    src={user?.avatar || require("../../assets/images/developer.png")}
                    onClick={_ => console.log("profile", user)}
                />
            </div>
            <p className="large">{user?.name}</p>
            <p className="position lead">{`${status} at ${company}`}</p>
            <p className="location lead">{location}</p>

            <div className="social_icons">
                {website &&
                    <a href={website} target='_blank' rel="noopener noreferrer">
                        <i className="fa fa-globe fa-2x" />
                    </a >
                }
                {social && social.twitter &&
                    <a href='http://www.google.com/' target='_blank' rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x" />
                    </a >
                }
                {social && social.facebook &&
                    <a href='http://www.google.com/' target='_blank' rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x" />
                    </a >
                }
                {social && social.youtube &&
                    <a href='http://www.google.com/' target='_blank' rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x" />
                    </a >
                }
                {social && social.linkedin &&
                    <a href='http://www.google.com/' target='_blank' rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x" />
                    </a >
                }
                {social && social.instagram &&
                    <a href='http://www.google.com/' target='_blank' rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x" />
                    </a >
                }
            </div>
        </div>
    )
}

export default Top