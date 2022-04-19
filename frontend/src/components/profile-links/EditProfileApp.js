import React, {useState, Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfileApp, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const EditProfileApp = ({profile: {profile, loading}, createProfileApp, getCurrentProfile, history}) => {
    const [formData, setFormData] = useState ({
        skills : '',
    });
    useEffect(() => {
        getCurrentProfile();
        setFormData({
            skills: loading || !profile.skills ? '' : profile.skills,
        });
    }, [loading]);
    const {skills} = formData;
    const onChange = e =>
    setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        createProfileApp(formData, history, true);
    }
    return (
        <div>
        <Fragment>
            <h1 className='large text-primary'>Create Profile</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input type='text' placeholder='Skills' name='skills' value={skills} onChange={e => onChange(e)}  required/>
                </div>
                <input type="submit" className="btn btn-primary" value="Edit" />
            </form>
        </Fragment>            
        </div>
    )
}

EditProfileApp.propTypes = {
    createProfileApp: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile
});
export default connect(mapStateToProps, {createProfileApp, getCurrentProfile})(withRouter(EditProfileApp));