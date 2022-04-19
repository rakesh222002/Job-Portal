import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfileApp } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const CreateProfileApp = ({createProfileApp, history}) => {
    const [formData, setFormData] = useState ({
        skills : '',
    });
    const {skills} = formData;
    const onChange = e =>
    setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        createProfileApp(formData, history);
    }
    return (
        <div>
        <Fragment>
            <h1 className='large text-primary'>Create Profile</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input type='text' placeholder='Skills' name='skills' value={skills} onChange={e => onChange(e)}  required/>
                </div>
                <input type="submit" className="btn btn-primary" value="Create" />
            </form>
        </Fragment>            
        </div>
    )
}

CreateProfileApp.propTypes = {
    createProfileApp: PropTypes.func.isRequired,
}

export default connect(null, {createProfileApp})(withRouter(CreateProfileApp));