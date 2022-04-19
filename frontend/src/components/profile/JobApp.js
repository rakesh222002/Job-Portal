import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux';
import { getJobs} from '../../actions/job';

const Job = ({job: { allJobs}, getJobs}) => {
    useEffect(() => {
        getJobs();
    })
    const jobs = allJobs.map(jb => (
        <tr key={jb._id}>
            <td>{jb.jobname}</td>
            <td>{jb.salary}</td>
            <td>{jb.duration}</td>
            <td>
            <Moment format='YYYY-MM-DD'>{jb.deadline}</Moment>
            </td>
            <td>{jb.jobtype}</td>
            <td><button className="btn btn-danger">Apply</button></td>
        </tr>
    ));
    return (
        <Fragment>
            <h1>Jobs list</h1>
            <table className = "table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Salary</th>
                    <th>Duration</th>
                    <th>Deadline</th>
                    <th>JobType</th>
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
    job: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    job: state.job,
})

export default connect(mapStateToProps, {getJobs})(Job);