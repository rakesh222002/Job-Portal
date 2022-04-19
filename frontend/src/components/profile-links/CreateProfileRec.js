import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfileRec } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const CreateProfileRec = ({createProfileRec, history}) => {
    const [formData, setFormData] = useState ({
        contact: '',
        bio: ''
    });
    const {contact, bio} = formData;
    const onChange = e =>
    setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        createProfileRec(formData, history);
    }
    return (
        <div>
        <Fragment>
            <h1 className='large text-primary'>Create Profile</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input type='text' placeholder='contact' name='contact' value={contact} onChange={e => onChange(e)}  required/>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='bio' name='bio' value={bio} onChange={e => onChange(e)}  />
                </div>
                <input type="submit" className="btn btn-primary" value="Create" />
            </form>
        </Fragment>            
        </div>
    )
}

CreateProfileRec.propTypes = {
    createProfileRec: PropTypes.func.isRequired,
}

export default connect(null, {createProfileRec})(withRouter(CreateProfileRec));