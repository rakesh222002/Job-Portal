import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Alert from './components/Alert';
import Profile from './components/profile/Profile'
import Navbarcode from './components/Navbarcode';
import { Provider } from 'react-redux';
import store from './store';
import CreateProfileApp from './components/profile-links/CreateProfileApp'
import CreateProfileRec from './components/profile-links/CreateProfileRec'
import EditProfileApp from './components/profile-links/EditProfileApp'
import EditProfileRec from './components/profile-links/EditProfileRec'
import {loadUser} from './actions/auth';
import setAuthToken from './tools/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute'
import AddEducation from './components/profile-links/AddEducation'
import Dashboard from './components/profile/Dashboard'
import AddJob from './components/profile-links/AddJob'

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return(
  <Provider store={store}>
  <Router>
  <Fragment>
    <Navbarcode />
    <section className='container'>
    <Alert />
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={Signup} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute exact path="/createProfileApp" component={CreateProfileApp} />
    <PrivateRoute exact path="/createProfileRec" component={CreateProfileRec} />
    <PrivateRoute exact path="/editProfileApp" component={EditProfileApp} />
    <PrivateRoute exact path="/editProfileRec" component={EditProfileRec} />
    <PrivateRoute exact path="/addEducation" component={AddEducation} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/addJob" component={AddJob} />
    </Switch>
    </section>
  </Fragment>
  </Router>
  </Provider>
)};

export default App;
