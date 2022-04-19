import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getJobs } from '../../actions/job';
import Job from './Job';
import JobApp from './JobApp';
import Search from './Search';
import DashboardActionRec from '../../components/profile/DashboardActionsRec'

const Dashboard = ({ getJobs, auth : {user}, job: { allJobs, recJobs, appJobs, loading} }) => {
    useEffect(() => {
        getJobs();
    }, [])
    return loading &&  allJobs.length == 0 ? <h1>Loading</h1> : (<Fragment>
        <h1>Dashboard</h1>
        { user && user.usertype === 'Applicant' ? (
            <Fragment>
                <Search />
                <JobApp />
            </Fragment>
        ) : (
            <Fragment>
                <DashboardActionRec />
                <Job />
            </Fragment>
        )}
        </Fragment>)
}

Dashboard.propTypes = {
    getJobs: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    job: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    job: state.job,
})

export default connect(mapStateToProps,{getJobs})(Dashboard);
