import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteEducation, deleteExperience, deleteAccount } from '../../redux/actions/profileActions'
import Loading from '../layout/Loading'
import Modal from '../layout/Modal'
import DashboardActions from './DashboardActions'
import Table from './Table'

function Dashboard() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const { authReducer: { user }, profileReducer: { loading, myprofile } } = useSelector(state => state)

    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [])

    return (
        <Fragment>
            {!loading ? (
                <div className="container">
                    <h1 className="large text-primary">Dashboard</h1>
                    <p className="lead" ><i className="fas fa-user"></i>
                        <span style={{ textTransform: "capitalize" }}>Welcome dear! {user?.name}</span>
                    </p>
                    <div>
                        {!!myprofile ? (
                            <Fragment>
                                <DashboardActions />
                                <div className="dev-details">
                                    <Table
                                        title="Experience Credentials"
                                        headers={["Company", "Title", "Years"]}
                                        keys={["company", "title", "from", "current", "_id"]}
                                        data={myprofile.experience || []}
                                        deleteFunc={deleteExperience}
                                    />
                                    <Table
                                        title="Education Credentials"
                                        headers={["School", "Degree", "fieldofstudy", "Years"]}
                                        keys={["school", "degree", "fieldofstudy", "from", "current", "_id"]}
                                        data={myprofile.education || []}
                                        deleteFunc={deleteEducation}

                                    />
                                </div>
                                <div className="my-2">
                                    <a className="btn btn-danger"
                                        onClick={_ => {
                                            setOpen(true)
                                        }}>
                                        <i className="fa fa-user-minus"></i> Delete My Account
                                    </a>
                                </div>
                                <Modal
                                    open={open}
                                    setOpen={setOpen}
                                    onConfirm={() => dispatch(deleteAccount())}
                                    onClose={() => setOpen(false)}
                                    title="Delete My Account"
                                    content="Are You sure You wanna Delete?"
                                />
                            </Fragment>
                        ) :
                            loading &&
                            <div>
                                <Link className="btn btn-primary" to={"/create-profile"}>Create Profile</Link>
                            </div>
                        }
                    </div>
                </div>
            ) : (
                <Loading />
            )}

        </Fragment>
    )
}

export default Dashboard