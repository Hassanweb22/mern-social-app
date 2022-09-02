import { CLEAR_MYPROFILE, CLEAR_PROFILE, GET_MYPROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_LOADING, PROFILE_ERROR, UPDATE_PROFILE } from "../types"

const InitialState = {
    myprofile: null,
    profile: null,
    profiles: [],
    loading: true,
    repos: [],
    error: {},
}

export default function profileReducer(state = InitialState, action) {
    switch (action.type) {
        case GET_MYPROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                loading: false,
                myprofile: action.payload,
                error: {}
            }
        case GET_PROFILE:
            return {
                ...state,
                loading: false,
                profile: action.payload,
                error: {}
            }
        case GET_PROFILES:
            return {
                ...state,
                loading: false,
                profiles: action.payload,
                error: {}
            }
        case GET_REPOS:
            return {
                ...state,
                loading: false,
                repos: action.payload,
                error: {}
            }
        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_MYPROFILE:
            return {
                ...state,
                myprofile: null,
                loading: false,
                repos: [],
                error: {},
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
                repos: [],
                error: {},
            }
        case PROFILE_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        default:
            return state
    }
}