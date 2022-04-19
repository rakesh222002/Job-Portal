import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActionsRec = () => {
    return (
        <div>
            <Link to='/editProfileRec' className='btn btn-danger'>Edit Profile</Link>
            <Link to='/addJob' className='btn btn-danger'>Add Job</Link>
        </div>
    )
}

export default ProfileActionsRec;