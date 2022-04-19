import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {setAlert} from '../actions/alert';
import {signup} from '../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Signup = ({setAlert, signup, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        usertype: 'Applicant'
    });

    const { name, email, password, usertype} = formData;
    const onChange = e =>
        setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        const newApplicant = {
            name,
            email,
            password,
            usertype
        };
        signup(newApplicant);
    };

    if( isAuthenticated ){
        return <Redirect to="/profile" />;
    }
    return (
        <Fragment>
            <h1 className='large text-primary'>Signup</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input type='text' placeholder='Name' name='name' value={name} onChange={e => onChange(e)} required />
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Email' name='email' value={email} onChange={e => onChange(e)} required />
                </div>
                <div className='form-group'>
                    <input type='password' placeholder='Password' name='password' value={password} onChange={e => onChange(e)} required />
                </div>
                <div className='form-group'>
                    <select name='usertype' value={usertype} onChange={e => onChange(e)} required>
                        <option value="Applicant">Applicant</option>
                        <option value="Recruiter">Recruiter</option>
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Signup" />
            </form>
        </Fragment>
    );
};

Signup.propTypes = {
    setAlert: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
}) 

export default connect(mapStateToProps, {setAlert, signup})(Signup);