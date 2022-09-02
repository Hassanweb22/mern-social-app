import { Fragment, useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './components/layout/Alert';
import 'animate.css';
import { setToken } from './utils';
import { loadUser } from './redux/actions/authActions';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import CreateProfile from './components/CreateProfile/CreateProfile';
import Education from './components/AddEducation/AddEducation';
import AddExperience from './components/AddExperience/AddExperience';
import Profiles from './components/Developers/Developers';
import Profile from './components/Profile/';


function App() {

  const { isAuthenticated, loading } = useSelector(state => state.authReducer)

  const dispatch = useDispatch()
  if (localStorage.getItem('token')) {
    setToken(localStorage.getItem('token'))
  }

  useEffect(() => {
    const func = () => {
      dispatch(loadUser())
    }
    func()
  }, [])


  return (
    <Fragment>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/developers" element={<Profiles />} />
          <Route path="/developers/:devId" element={<Profile />} />
          <Route path="/login" element={<PrivateRoute authenticatedRoute component={Login} />} />
          <Route path="/register" element={<PrivateRoute authenticatedRoute component={Register} />} />
          <Route path="/dashboard" element={<PrivateRoute afterLogin component={Dashboard} />} />
          <Route path="/create-profile" element={<PrivateRoute afterLogin component={CreateProfile} />} />
          <Route path="/add-education" element={<PrivateRoute afterLogin component={Education} />} />
          <Route path="/add-experience" element={<PrivateRoute afterLogin component={AddExperience} />} />
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            }
          />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
