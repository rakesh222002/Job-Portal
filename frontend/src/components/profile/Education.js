import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux';
import { deleteEducation} from '../../actions/profile';

const Education = ({education, deleteEducation}) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.institute}</td>
            <td>
            <Moment format='YYYY'>{edu.startyear}</Moment>
            </td>
            <td>{ edu.endyear === null ? 'ongoing' : <Moment format='YYYY'>{edu.endyear}</Moment>}</td>
            <td><button onClick={() => deleteEducation(edu._id)} className="btn btn-danger">Delete</button></td>
        </tr>
    ));
    return (
        <Fragment>
            <h1>Education list</h1>
            <table className = "table">
                <thead>
                <tr>
                    <th>Institute</th>
                    <th>Start Year</th>
                    <th>End Year</th>
                    <th />
                </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, {deleteEducation})(Education);