import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile';
import ProfileActionsApp from './ProfileActionsApp';
import ProfileActionsRec from './ProfileActionsRec';
import Education from './Education';

const Profile = ({ getCurrentProfile, auth : {user}, profile: {profile, loading} }) => {
    useEffect(() => {
        getCurrentProfile();
    })
    return loading && profile === null ? <h1>Loading</h1> : (<Fragment>
        <h1>Profile</h1>
        <h2>Welcome  {user && user.name}</h2>
        <p>AccountType  :  {user && user.usertype}</p>
        <p>Email        :  {user && user.email}</p>
        { user && user.usertype === 'Applicant' ? (
            <Fragment>
                {profile !== null ? (
                <Fragment>
                    <ProfileActionsApp />
                    <Education education={profile.education}/>
                </Fragment>) : (<Fragment>
                    <p>Please Create a Profile</p>
                    <Link to='/createProfileApp' className='btn btn-danger'>Create Profile</Link>
                </Fragment>)}
            </Fragment>
        ) : (
            <Fragment>
                {profile !== null ? (
                <Fragment>
                    <ProfileActionsRec />
                </Fragment>) : (<Fragment>
                    <p>Please Create a Profile</p>
                    <Link to='/createProfileRec' className='btn btn-danger'>Create Profile</Link>
                </Fragment>)}
            </Fragment>
        )}
        </Fragment>)
}

Profile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps,{ getCurrentProfile })(Profile);
