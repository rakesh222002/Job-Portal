import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {login} from '../actions/auth'; 

const Home = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password} = formData;
    const onChange = e =>
        setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        const newApplicant = {
            email,
            password
        };
        login(newApplicant);
    };

    if( isAuthenticated){
        return <Redirect to="/profile" />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Login</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input type='text' placeholder='Email' name='email' value={email} onChange={e => onChange(e)} required />
                </div>
                <div className='form-group'>
                    <input type='password' placeholder='Password' name='password' value={password} onChange={e => onChange(e)} required />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
        </Fragment>
    );
};

Home.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
}) 

export default connect(mapStateToProps,{login})(Home);