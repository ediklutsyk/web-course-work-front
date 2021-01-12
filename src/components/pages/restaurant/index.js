import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Rating from '@material-ui/lab/Rating';

import allActions from '../../../store/actions';
import ReviewItem from '../../core/review-item';
import {Button, TextField} from '@material-ui/core';

import './styles.scss';

const Restaurant = () => {
    const [comment, setComment] = useState('');
    const [rate, setRate] = useState(0);
    const restaurantsData = useSelector(state => state.restaurants);
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        console.log('id', id)
        if (id) {
            dispatch(allActions.restaurants.fetchRestaurant(id));
        }
    }, [id]);

    useEffect(() => {
        if (restaurantsData.comment) {
            dispatch(allActions.restaurants.fetchRestaurant(id));
        }
    }, [restaurantsData.comment]);

    const addComment = () => {
        dispatch(allActions.restaurants.fetchAddComment(
            {
                description: comment,
                rating: rate,
                name: userData.user.name
            },
            id,
            userData.token
        ));
        setComment('')
        setRate(0)
    };
    console.log(restaurantsData.restaurant)

    const restaurant = restaurantsData.restaurant;

    if (restaurant)
        return (
            <div className="restaurant-page-info">
                <div className="carousel-wrap">
                    <Carousel slidesPerPage={3}>
                        {restaurant.photos.map((item, index) => <img className="carousel-img" src={item.url} key={index}/>)}
                    </Carousel>
                </div>
                <div className="restaurant-info">
                    <div className="name-rating">
                        <h2>{restaurant.name}</h2>
                        <Rating
                            disabled
                            value={restaurant.rating}
                        />
                    </div>
                    <p className="text-info"><b>Phone: </b>{restaurant.phone}</p>
                    <p className="text-info"><b>Address: </b>{restaurant.address}</p>
                    <p className="text-info"><b>Working hours: </b>{restaurant ? restaurant.workingHours.start + ':00 - ' + restaurant.workingHours.end + ':00' : ''}</p>
                    <p className="text-info"><b>Kitchens: </b>{restaurant ? restaurant.kitchens.join(', ') : ''}</p>
                    <p className="text-info"><b>Description: </b> {restaurant.description}</p>
                    <p className="reviews-title">{restaurant.comments.length} comment(s)</p>
                    {restaurant.comments.length ? restaurant.comments.map((item) => (
                        <ReviewItem comment={item}/>
                    )) : <p>No Reviews</p>}
                    {userData.user ? (
                        <div className="add-comment-wrap">
                            <h4>Add new comment</h4>
                            <Rating
                                name="hover-feedback"
                                value={rate}
                                onChange={(event, newValue) => {
                                    setRate(newValue);
                                }}
                            />
                            <TextField
                                className="comment-form"
                                autoFocus
                                margin="dense"
                                id="comment"
                                label="Comment"
                                type="text"
                                multiline
                                variant="outlined"
                                rows={4}
                                onChange={(event) => {
                                    setComment(event.target.value);
                                }}
                                value={comment}
                            />
                            <Button className="comment-btn" variant="outlined" color="primary" disabled={!comment.length} onClick={addComment}>
                                Add Comment
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        )
    else
        return <p>No Restaurant Info</p>
};

export default Restaurant;