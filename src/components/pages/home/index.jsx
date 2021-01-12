import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../../../store/actions';
import './styles.scss';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import RestaurantItem from "../../core/restaurant-item";
import Checkbox from "@material-ui/core/Checkbox";
import Rating from "@material-ui/lab/Rating";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const Home = () => {
    const restaurantsData = useSelector(state => state.restaurants);
    const kitchensData = useSelector(state => state.kitchens);
    const dispatch = useDispatch();

    const filterInitialState = {
        isOpen: false,
        kitchens: new Set([]),
        rating: 0
    }
    const [filter, setFilter] = useState(filterInitialState);

    useEffect(() => {
        dispatch(allActions.restaurants.fetchRestaurants());
        dispatch(allActions.kitchens.fetchKitchens());
    }, []);

    useEffect(() => {
        if (filter && filter !== filterInitialState) {
            dispatch(allActions.restaurants.fetchFilterRestaurant({...filter, kitchens: Array.from(filter.kitchens)}));
        }
    }, [filter])

    console.log("kitchensData", kitchensData)
    console.log('restaurants', restaurantsData)
    console.log(filter)
    const classes = useStyles();

    return (
        <div className="home-wrapper">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography className={classes.heading}>Filters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="filters">
                        <div className="isOpen filter">
                            <h3>Open</h3>
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="checkedB"
                                        color="primary"
                                        checked={filter.isOpen}
                                        onChange={() => {
                                            setFilter({...filter, isOpen: !filter.isOpen})
                                        }}
                                    />
                                }
                                label="Is Open"
                            />
                        </div>
                        <div className="kitchens filter">
                            <h3>Kitchens</h3>
                            {kitchensData && kitchensData.kitchens && kitchensData.kitchens.map((item) => (
                                <FormControlLabel
                                    key={item.id}
                                    control={
                                        <Checkbox
                                            checked={filter.kitchens.has(item.name)}
                                            onChange={() => {
                                                if (filter.kitchens.has(item.name)) {
                                                    filter.kitchens.delete(item.name)
                                                } else {
                                                    filter.kitchens.add(item.name)
                                                }
                                                setFilter({...filter, kitchens: filter.kitchens})
                                            }}
                                            name={item.name}
                                            color="primary"
                                        />
                                    }
                                    label={item.name}
                                />
                            ))}
                        </div>
                        <div className="rating filter">
                            <h3>Rating</h3>
                            <Rating
                                name="hover-feedback"
                                value={filter.rating}
                                onChange={(event, newValue) => {
                                    setFilter({...filter, rating: newValue})
                                }}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>

            <div className="restaurants-list">
                {restaurantsData.restaurants && restaurantsData.restaurants.map((item) => (
                    <RestaurantItem key={item.id} restaurant={item}/>
                ))}
            </div>
        </div>
    );
};

export default Home;