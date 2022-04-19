import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActionApp = () => {
    return (
        <div>
            <Link to='/editProfileApp' className='btn btn-danger'>Edit Profile</Link>
            <Link to='/add' className='btn btn-danger'>Add Education</Link>
        </div>
    )
}

export default ProfileActionsApp;