import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addJob} from '../../actions/job';

const AddJob = ({addJob, history}) => {
    const [formData, setFormData] = useState({
        jobname: '',
        maxApplicants: '',
        maxPositions: '',
        deadline: '',
        duration: '',
        jobtype: 'Full-Time',
        salary: '',
        skills: ''
    });
    const {jobname, maxApplicants, maxPositions, deadline, duration, jobtype, salary, skills} = formData;
    const onChange = e =>
    setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        addJob (formData, history);
    }
    return (
        <Fragment>
            <h1 className='large text-primary'>Add education</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input type='text' placeholder='jobname' name='jobname' value={jobname} onChange={e => onChange(e)}  required/>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Maximum number of applicants' name='maxApplicants' value={maxApplicants} onChange={e => onChange(e)}  required/>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Maximum number of posts' name='maxPositions' value={maxPositions} onChange={e => onChange(e)}  required/>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Deadline for applying' name='deadline' value={deadline} onChange={e => onChange(e)}  required/>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Duration of Job in months' name='duration' value={duration} onChange={e => onChange(e)} required/>
                </div>
                <div className='form-group'>
                    <p>Jobtype : </p>
                    <select name='jobtype' value={jobtype} onChange={e => onChange(e)} required>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="WorkFromHome">Work From Home</option>
                    </select>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Salary in Rs' name='salary' value={salary} onChange={e => onChange(e)} required/>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Skills Required' name='skills' value={skills} onChange={e => onChange(e)} required/>
                </div>
                <input type="submit" className="btn btn-primary" value="Add" />
            </form> 
        </Fragment>
    )
}

AddJob.propTypes = {
    addJob: PropTypes.func.isRequired,
}

export default connect(null, { addJob })(AddJob);