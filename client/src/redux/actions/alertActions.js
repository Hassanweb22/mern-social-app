import { SET_ALERT, REMOVE_ALERT, UPDATE_ALERT_MOUNT, UPDATE_ALERT_EDIT } from "../types"
import { v4 as uuid } from "uuid";

export const removeAlert = (alertId) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_ALERT,
            payload: alertId
        })
    }
}

export const setAlert = ({ msg, alertType }) => {
    const id = uuid();
    const alert = { msg, alertType, id, date: new Date(), isMount: true, edit: false }
    return (dispatch) => {
        dispatch({
            type: SET_ALERT,
            payload: alert
        })
        setTimeout(() => {
            dispatch({
                type: UPDATE_ALERT_EDIT,
                payload: alert.id
            })
        }, 600);
        setTimeout(() => {
            dispatch({
                type: UPDATE_ALERT_MOUNT,
                payload: alert.id
            })
        }, 4000);
    }
}
