import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, useLocation} from 'react-router-dom';
import Home from './components/pages/home';
import Restaurant from './components/pages/restaurant';
import Header from './components/core/header';
import LoginDialog from './components/core/auth/login-dialog';
import SignUpDialog from './components/core/auth/signup-dialog';

import './App.scss';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/restaurant/:id',
        component: Restaurant
    }
];

const AddRestaurant = React.lazy(() => import('./components/pages/admin/add-restaurant'));
const RestaurantsList = React.lazy(() => import('./components/pages/admin/restaurants-list'));

const privateRoutes = [
    {
        path: '/admin/restaurants-list',
        component: RestaurantsList
    },
    {
        path: '/admin/add-restaurant',
        component: AddRestaurant
    }
];


function App() {
    return (
        <>
            <LoginDialog/>
            <SignUpDialog/>
            <div className="app-wrapper">
                <BrowserRouter>
                    <Header/>
                    <Switch>
                        {publicRoutes.map((route) => <Route exact={route.exact} path={route.path}
                                                            component={route.component}/>)}
                        {privateRoutes.map((route) => <Route {...route} />)}
                    </Switch>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
