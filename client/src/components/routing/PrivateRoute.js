import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from '../layout/Loading';

const PrivateRoute = ({ children, component: Component, authenticatedRoute, afterLogin, ...rest }) => {
    const { authReducer: { isAuthenticated, loading }, profileReducer: { loading: profileLoading }, } = useSelector(state => state)
    const isLogin = !loading && isAuthenticated;

    if (loading) {
        return <Loading />
    }

    if (authenticatedRoute) {
        return !isLogin ? <Component /> : <Navigate to="/dashboard" />
    }
    if (afterLogin) {
        return !isLogin ? <Navigate to={"/login"} /> : <Component />
    }

}

export default PrivateRoute;
