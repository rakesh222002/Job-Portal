import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addEducation} from '../../actions/profile';

const AddEducation = ({addEducation, history}) => {
    const [formData, setFormData] = useState({
        institute: '',
        startyear: '',
        endyear: ''
    });
    const {institute, startyear, endyear} = formData;
    const onChange = e =>
    setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
        addEducation (formData, history);
    }
    return (
        <Fragment>
            <h1 className='large text-primary'>Add education</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input type='text' placeholder='Institute' name='institute' value={institute} onChange={e => onChange(e)}  required/>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Staryear' name='startyear' value={startyear} onChange={e => onChange(e)}  required/>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Endyear' name='endyear' value={endyear} onChange={e => onChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Add" />
            </form> 
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(AddEducation);