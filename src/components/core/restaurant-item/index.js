import React from 'react';
import Rating from '@material-ui/lab/Rating';
import {useHistory} from "react-router-dom";

import './styles.scss';

const RestaurantItem = ({
                            restaurant
                        }) => {
    const history = useHistory();
    console.log('restaurant', restaurant)
    return (
        <div className="restaurant-item" onClick={() => {
            console.log('restaurant')
            history.push(`/restaurant/${restaurant._id}`);
        }}>
            <img src={restaurant && restaurant.photos && restaurant.photos[0] ? restaurant.photos[0].url : ''}
                 alt="Restaurant Image" className="restaurant-image"/>
            <div className="restaurant-info">
                <div className="name-rating">
                    <p>{restaurant ? restaurant.name : 'Mocked Name'}</p>
                    <Rating
                        disabled
                        value={restaurant ? restaurant.rating : 4}
                    />
                    <p>{restaurant.comments.length} comment(s)</p>
                </div>
                <span className="text-info"><p>Phone: </p>{restaurant ? restaurant.phone : ''}</span><br/>
                <span className="text-info"><p>Address: </p>{restaurant ? restaurant.address : ''}</span>
                <span className="text-info">
                    <p>Working hours: </p>{restaurant ? restaurant.workingHours.start + ':00 - ' + restaurant.workingHours.end + ':00' : ''}
                </span><br/>
                <span className="text-info"><p>Kitchens: </p>{restaurant ? restaurant.kitchens.join(', ') : ''}</span>
            </div>
        </div>
    );
};

export default RestaurantItem;