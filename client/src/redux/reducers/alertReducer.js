import { SET_ALERT, REMOVE_ALERT, UPDATE_ALERT_MOUNT, UPDATE_ALERT_EDIT } from "../types"

const InitialState = [
    // { msg: "Random TEst", alertType: "success", isMount: true, id: 1 },
]

export default function appReducer(state = InitialState, action = {}) {
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload]
        case UPDATE_ALERT_EDIT:
            return state.map(obj => action.payload === obj.id ? { ...obj, edit: true } : obj)
        case UPDATE_ALERT_MOUNT:
            return state.map(obj => action.payload === obj.id ? { ...obj, isMount: false } : obj)
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload)
        default:
            return state
    }
}