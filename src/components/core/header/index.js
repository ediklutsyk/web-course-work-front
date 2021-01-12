import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useLocation} from 'react-router-dom';
import './styles.scss';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../../../store/actions';

const Header = () => {
    const [showSearch, setShowSearch] = useState(true);
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();

    const location = useLocation();
    useEffect(() => {
        setShowSearch(location.pathname === '/');
    }, [location]);

    return (
        <div className="header-app">
            <div className="container">
                <div className="logo-and-search">
                    <img src="logo.png" alt="TownRestaurants" className="logo-app"/>
                    {showSearch ? (
                        <TextField
                            margin="dense"
                            label="Search"
                            variant="outlined"
                            onChange={(event) => {
                                const {value} = event.target;
                                if (value){
                                    dispatch(allActions.restaurants.fetchSearchByNameRestaurant(value))
                                }
                            }}
                        />
                    ) : null}
                </div>
                {!userData.user ? (
                    <div className="btns-wrapper flex-end">
                        <Button color="primary" variant="contained" className="mr-10" onClick={() => {
                            dispatch(allActions.modal.openLogin());
                        }}>Log In</Button>
                        <Button color="primary" variant="contained" onClick={() => {
                            dispatch(allActions.modal.openSignUp());
                        }}>Sign Up</Button>

                    </div>
                ) : (
                    <div className="profile-info-wrapper flex-end">
                        <p className="mr-10">{userData.user.name}</p>
                        <Button color="primary" variant="contained" onClick={() => {
                            dispatch(allActions.user.fetchLogOut(userData.token))
                        }}>Log Out</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;