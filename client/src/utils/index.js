import axios from "./axios"
import { setAlert } from "../redux/actions/alertActions"
import { useEffect, useState } from "react"

// import {userl} from "../../redux/types"

export const setToken = (token) => {

    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token
    }
    else {
        delete axios.defaults.headers.common['x-auth-token']
    }

}

export const setNetworkError = () => async dispatch => {
    return dispatch(
        setAlert({ msg: "Network Error > Local/Deployed server not running...", alertType: "danger" })
    )
}

export const splitName = (name = '') => {
    const [firstName, ...lastName] = name.split(' ').filter(Boolean);
    return {
        firstName: firstName + "'s",
        lastName: lastName.join(' ')
    }
}

export const useDelayUnmount = (isMounted, delayTime) => {

    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        let timeoutId;
        if (isMounted && !shouldRender) {
            setShouldRender(true);
        }
        else if (!isMounted && shouldRender) {
            timeoutId = setTimeout(
                () => setShouldRender(false),
                delayTime
            );
        }
        return () => clearTimeout(timeoutId);
    }, [isMounted, delayTime, shouldRender]);

    return shouldRender;
}