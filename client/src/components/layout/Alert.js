import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import SingleAlert from './SingleAlert'

const Alert = () => {
    const alerts = useSelector(state => [...state.alertReducer])

    return (
        <Fragment>
            {!!alerts.length ?
                <div className="alert-container">
                    {alerts !== null && !!alerts.length && alerts.map(alert => {
                        return (
                            <SingleAlert obj={alert} />
                        )
                    })}
                </div>
                : ""
            }
        </Fragment>
    )
}


export default Alert