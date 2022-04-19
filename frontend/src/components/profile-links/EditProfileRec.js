import React, {useState, Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfileRec, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const EditProfileRec = ({profile: {profile, loading}, createProfileRec, getCurrentProfile, history}) => {
    const [formData, setFormData] = useState ({
        contact: '',
        bio: ''
    });
    useEffect(() => {
        getCurrentProfile();
        setFormData({
            contact: loading || !profile.contact ? '' : profile.contact,
            bio: loading || !profile.bio ? '' : profile.bio,
        });
    }, [loading]);
    const {contact, bio} = formData;
    const onChange = e =>
    setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        createProfileRec(formData, history, true);
    }
    return (
        <div>
        <Fragment>
            <h1 className='large text-primary'>Edit Profile</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input type='text' placeholder='contact' name='contact' value={contact} onChange={e => onChange(e)}  required/>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='bio' name='bio' value={bio} onChange={e => onChange(e)}  />
                </div>
                <input type="submit" className="btn btn-primary" value="Edit" />
            </form>
        </Fragment>            
        </div>
    )
}

EditProfileRec.propTypes = {
    createProfileRec: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {createProfileRec, getCurrentProfile})(withRouter(EditProfileRec));