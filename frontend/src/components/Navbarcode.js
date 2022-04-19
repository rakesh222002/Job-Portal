import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../actions/auth';

const Navbarcode = ({ auth: {isAuthenticated, loading }, logout}) => {
    const authLinks = (
        <ul>
            <li><Link to='/dashboard'>Dashboard</Link> </li>
            <li><Link to='/profile'>Profile</Link> </li>
            <li><a onClick={logout} href='/' > Logout</a></li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li><Link to='/signup'>Signup</Link> </li>
        </ul> 
    );
    return (
        <nav className='navbar bg-primary navbar-static-top    '>
            <h1>
                <Link to='/'>Website</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
}

Navbarcode.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbarcode);