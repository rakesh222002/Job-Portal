import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActionsApp = () => {
    return (
        <div>
            <Link to='/editProfileApp' className='btn btn-danger'>Edit Profile</Link>
            <Link to='/addEducation' className='btn btn-danger'>Add Education</Link>
        </div>
    )
}

export default ProfileActionsApp;