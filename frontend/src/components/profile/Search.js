import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import Moment from 'react-moment'

const Search = ({ job: {allJobs}}) => {
    const [formData, setFormData] = useState({
        search: ''
    });
    const { search } = formData;
    const [refinedJobs, setJobs] = useState({
        refJobs: [],
    });
    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
        const options = {
            keys: [
              "jobname",
            ]
          };
        const fuse = new Fuse(allJobs, options);
        const searchJobs = fuse.search(search);
        
        const Jobs = searchJobs.map(jb => (
            <tr key={jb.item._id}>
                <td>{jb.item.jobname}</td>
                <td>{jb.item.salary}</td>
                <td>{jb.item.duration}</td>
                <td>
                <Moment format='YYYY-MM-DD'>{jb.item.deadline}</Moment>
                </td>
                <td>{jb.item.jobtype}</td>
                <td><button className="btn btn-danger">Apply</button></td>
            </tr>
        ));
        setJobs({...refinedJobs, refJobs: Jobs});
    }

    return (
        <Fragment>
            <form className='form'>
                <div className='form-group'>
                    <input type='text' placeholder='Search' name='search' value={search} onChange={e => onChange(e)} required />
                </div>
            </form>
            <Fragment>
            {search ? (
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
                <tbody>{refinedJobs.refJobs}</tbody>
            </table>) : ''}
            </Fragment>
        </Fragment>
    );
};


Search.propTypes = {
    job: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    job: state.job,
}) 

export default connect(mapStateToProps)(Search);