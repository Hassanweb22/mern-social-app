import React, { Fragment, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeAlert } from '../../redux/actions/alertActions'
import { UPDATE_ALERT_MOUNT } from '../../redux/types'
import { useDelayUnmount } from '../../utils'

const SingleAlert = ({ obj }) => {
    const dispatch = useDispatch()

    const shouldRenderChild = useDelayUnmount(obj.isMount, 850)

    const animateClass = useMemo(() => {
        return obj.isMount ? (obj.edit === false ? "animate__slideInRight" : "") : "animate__slideOutRight"
    }, [obj])


    if (!obj.isMount) {
        setTimeout(() => {
            dispatch(removeAlert(obj.id))
        }, 800);
    }


    return (
        <Fragment>
            {shouldRenderChild &&
                <div key={obj.id}
                    className={`animate__animated ${animateClass} alert alert-${obj.alertType}`}
                    onClick={_ =>
                        dispatch({
                            type: UPDATE_ALERT_MOUNT,
                            payload: obj.id
                        })
                    }
                >
                    <p> {obj.msg}</p>
                </div>
            }
        </Fragment>
    )
}

export default React.memo(SingleAlert);