import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';
import {deepOrange} from '@material-ui/core/colors';

import allActions from '../../../store/actions';

import './styles.scss';

const AddRestaurant = () => {
    const restaurantsData = useSelector(state => state.restaurants);
    const usersData = useSelector(state => state.user);
    const kitchensData = useSelector(state => state.kitchens);
    const [state, setState] = useState({
        phone: '',
        name: '',
        address: '',
        description: '',
        start: '',
        end: '',
        kitchens: [],
        photos: []
    });
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);

    useEffect(() => {
        dispatch(allActions.kitchens.fetchKitchens());
    }, []);

    useEffect(() => {
        if (images.length) {
            dispatch(allActions.restaurants.fetchUploadImages(images, usersData.token));
        }
    }, [images]);

    useEffect(() => {
        if (restaurantsData && restaurantsData.imagesUrls) {
            setState({...state, photos: restaurantsData.imagesUrls})
        }
    }, [restaurantsData.imagesUrls]);

    const onChange = (name) => (event) => {
        setState({
            ...state,
            [name]: event.target.value
        });
    };

    const handleChange = (value) => (event) => {
        console.log('value', value)
        const array = [...state.kitchens];
        if (array.indexOf(value) >= 0)
            array.splice(array.indexOf(value), 1);
        else
            array.push(value);
        setState({
            ...state,
            kitchens: array
        });
    };

    const onDrop = (picture) => {
        console.log(picture)
        setImages(images.concat(picture));
    };

    const addRestaurant = () => {
        const restaurantInfo = {
            name: state.name,
            description: state.description,
            address: state.address,
            phone: state.phone,
            kitchens: state.kitchens,
            workingHours: {
                start: state.start,
                end: state.end
            },
            photos: state.photos.map(photo => {
                return {url: photo}
            })
        };

        dispatch(allActions.restaurants.fetchAddRestaurant(restaurantInfo, usersData.token));
    };

    return (
        <div className="add-restaurant-wrapper">
            <div class="step">
                <p className="title-step">Step 1: General Info About Restaurant</p>
                <div className="form-wrapper">
                    <div className="row-form">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            onChange={onChange('name')}
                            value={state.name}
                            variant="outlined"
                            style={{marginRight: 10}}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="phone"
                            label="Phone"
                            type="text"
                            fullWidth
                            onChange={onChange('phone')}
                            value={state.phone}
                            variant="outlined"
                        />
                    </div>
                    <br/>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        fullWidth
                        onChange={onChange('address')}
                        value={state.address}
                        variant="outlined"
                    />
                    <br/>
                    <div className="row-form">
                        <p className="form-title">Working hours: </p>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="start"
                            label="Start"
                            type="text"
                            onChange={onChange('start')}
                            value={state.start}
                            variant="outlined"
                            style={{marginRight: 8}}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="end"
                            label="End"
                            type="text"
                            onChange={onChange('end')}
                            value={state.end}
                            variant="outlined"
                        />
                    </div>
                    <br/>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        onChange={onChange('description')}
                        value={state.description}
                        variant="outlined"
                    />
                </div>
            </div>
            <div className="step">
                <p className="title-step">Step 2: Pick available kitchens</p>
                <div className="form-wrapper">
                    {kitchensData && kitchensData.kitchens && kitchensData.kitchens.map((item) => (
                        <FormControlLabel
                            key={item.id}
                            control={
                                <Checkbox
                                    checked={state.kitchens.indexOf(item.name) >= 0}
                                    onChange={handleChange(item.name)}
                                    name={item.name}
                                    color="primary"
                                />
                            }
                            label={item.name}
                        />
                    ))}
                </div>
            </div>
            <div className="step">
                <p className="title-step">Step 3: Add Images</p>
                <div className="form-wrapper">
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                    />
                </div>
            </div>
            <Button
                onClick={addRestaurant}
                style={{
                    backgroundColor: deepOrange[500],
                    color: 'white',
                    maxWidth: 200,
                    alignSelf: 'center',
                    margin: 10
                }}
            >
                Add Restaurant
            </Button>
        </div>
    );
};

export default AddRestaurant;