import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActionRec = () => {
    return (
        <div>
            <Link to='/addJob' className='btn btn-danger'>Add Job</Link>
        </div>
    )
}

export default DashboardActionRec;