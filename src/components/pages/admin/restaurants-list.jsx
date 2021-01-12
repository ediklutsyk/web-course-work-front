import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import RestaurantItem from '../../core/restaurant-item';
import allActions from '../../../store/actions';

import './styles.scss';

const RestaurantsList = () => {
    const history = useHistory();
    const restaurantsData = useSelector(state => state.restaurants);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.restaurants.fetchRestaurants());
    }, []);

    const openAddRestaurant = () => {
        history.push('/admin/add-restaurant');
    };

    return (
        <div className="restaurant-list-wrapper">
            <Button onClick={openAddRestaurant} color="primary" className="add-restaurant-btn">
                Add Restaurant
            </Button>
            {restaurantsData.restaurants && restaurantsData.restaurants.map((item) => (
                <RestaurantItem key={item.id} restaurant={item} isClickable={false}/>
            ))}
        </div>
    );
};

export default RestaurantsList;