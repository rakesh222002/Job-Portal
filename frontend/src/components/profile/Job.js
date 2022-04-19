import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux';
import { getJobs, deleteJob } from '../../actions/job';
import { Link } from 'react-router-dom';

const Job = ({job: {recJobs, allJobs}, getJobs, deleteJob}) => {
    useEffect(() => {
        getJobs();
    }, [])
    const jobs = recJobs.map(jb => (
        <tr key={jb._id}>
            <td>{jb.jobname}</td>
            <td>
            <Moment format='YYYY-MM-DD'>{jb.date}</Moment>
            </td>
            <td>{jb.appliedPositions}</td>
            <td>{jb.maxPositions}</td>
            <td><Link to='/editJob' className="btn btn-danger">Edit</Link></td>
            <td><button onClick={() => deleteJob(jb._id)}className="btn btn-danger">Delete</button></td>
        </tr>
    ));
    return (
        <Fragment>
            <h1>Jobs list</h1>
            <table className = "table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Date of posting</th>
                    <th>Number of Applicants</th>
                    <th>Maximum Positions</th>
                    <th />
                    <th />
                </tr>
                </thead>
                <tbody>{jobs}</tbody>
            </table>
        </Fragment>
    )
}


Job.propTypes = {
    getJobs: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    job: state.job,
})

export default connect(mapStateToProps, {getJobs, deleteJob})(Job);