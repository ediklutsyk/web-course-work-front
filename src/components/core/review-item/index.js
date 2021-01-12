import React from 'react';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment';

import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

import './styles.scss';

const ReviewItem = ({ comment }) => {
    console.log(comment)
    return (
        <div className="review-item">
            <Avatar className="avatar" style={{ backgroundColor: deepOrange[500] }}>{comment ? comment.name.charAt(0) : 'T'}</Avatar>
            <div className="review-info">
                <Rating
                    disabled
                    value={comment ? comment.rating : 4}
                />
                <div className="name-date">
                    <p className="name">{comment ? comment.name : 'Mocked Name'}</p>
                    <p className="date">{comment ? moment(comment.date).format('DD-MMM-YYYY') : '12-Jun-2020'}</p>
                </div>
                <p className="description">{comment ? comment.text : ''}</p>
            </div>
        </div>
    );
};

export default ReviewItem;