import {all, call, put, takeEvery} from 'redux-saga/effects';

import {SERVER_URL} from '../config/config';

import allActions from './actions/index';

function* watchGetRestaurants() {
    yield takeEvery('FETCHED_RESTAURANTS', fetchRestaurants)
}

function* fetchRestaurants() {
    try {
        yield put(allActions.restaurants.requestRestaurants());
        const data = yield call(() => {
                return fetch(`${SERVER_URL}/restaurants`)
                    .then(res => res.json())
            }
        );
        yield put(allActions.restaurants.requestRestaurantsSuccess(data));
    } catch (error) {
        yield put(allActions.restaurants.requestRestaurantsError());
    }
}

function* watchGetRestaurant() {
    yield takeEvery('FETCHED_RESTAURANT', fetchRestaurant)
}

function* fetchRestaurant(payload) {
    try {
        console.log(payload.id)
        yield put(allActions.restaurants.requestRestaurant());
        const data = yield call(() => {
                return fetch(`${SERVER_URL}/restaurants/${payload.id}`)
                    .then(res => res.json())
            }
        );
        yield put(allActions.restaurants.requestRestaurantSuccess(data));
    } catch (error) {
        yield put(allActions.restaurants.requestRestaurantError());
    }
}

function* watchAddRestaurant() {
    yield takeEvery('FETCHED_ADD_RESTAURANT', fetchAddRestaurant)
}

function* fetchAddRestaurant(payload) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${payload.token}`
            },
            body: JSON.stringify(payload.body)
        };
        console.log(payload)
        yield put(allActions.restaurants.requestAddRestaurant());
        const data = yield call(() => {
                return fetch(`${SERVER_URL}/restaurant`, requestOptions)
                    .then(res => res.json())
            }
        );
        yield put(allActions.restaurants.requestAddRestaurantSuccess(data));
    } catch (error) {
        yield put(allActions.restaurants.requestAddRestaurantError());
    }
}

function* watchUploadImages() {
    yield takeEvery('FETCHED_UPLOAD_IMAGES', fetchUploadImages)
}

function uploadFile(file, signedRequest, url) {
    const options = {
        method: 'PUT',
        body: file
    };
    return fetch(signedRequest, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return url;
        });
}

function* fetchUploadImages(payload) {
    try {
        const array = [];
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${payload.token}`
            },
        };
        if (payload.images) {
            yield put(allActions.restaurants.requestUploadImages());
            payload.images.forEach((item) => {
                array.push(fetch(`${SERVER_URL}/sign-s3?file-name=${item.name}&file-type=${item.type}`, requestOptions)
                    .then(res => res.json())
                    .then(json => {
                        console.log(json)
                        return uploadFile(item, json.signedRequest, json.url)
                    })
                    .then(url => {
                        return url;
                    }))
            });
            const data = yield call(() => {
                return Promise.all(array)
            });
            yield put(allActions.restaurants.requestUploadImagesSuccess(data));
        }
    } catch (error) {
        yield put(allActions.restaurants.requestUploadImagesError());
    }
}

function* watchAddComment() {
    yield takeEvery('FETCHED_ADD_COMMENT', fetchAddComment)
}

function* fetchAddComment(body) {
    console.log('payload saga comment', body.payload)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${body.payload.token}`
        },
        body: JSON.stringify(body.payload.comment)
    };
    try {
        yield put(allActions.restaurants.requestAddComment());
        const data = yield call(() => {
                return fetch(`${SERVER_URL}/restaurants/comment/${body.payload.id}`, requestOptions)
                    .then(res => res.json())
            }
        );
        console.log(data)
        yield put(allActions.restaurants.requestAddCommentSuccess(data));
    } catch (error) {
        console.log(error)
        yield put(allActions.restaurants.requestAddCommentError());
    }
}

function* watchLogin() {
    yield takeEvery('FETCHED_LOGIN', fetchLogin)
}

function* fetchLogin(body) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body.message)
    };
    try {
        yield put(allActions.user.requestLogin());
        const data = yield call(() => {
                return fetch(`${SERVER_URL}/users/login`, requestOptions)
                    .then(res => res.json())
            }
        );
        yield put(allActions.user.requestLoginSuccess(data));
        yield put(allActions.modal.closeLogin());
    } catch (error) {
        yield put(allActions.user.requestLoginError());
    }
}

function* watchSignUp() {
    yield takeEvery('FETCHED_SIGNUP', fetchSignUp)
}

function* fetchSignUp(body) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body.message)
    };
    try {
        yield put(allActions.user.requestSignUp());
        const data = yield call(() => {
                return fetch(`${SERVER_URL}/users`, requestOptions)
                    .then(res => res.json())
            }
        );
        yield put(allActions.user.requestSignUpSuccess(data));
        yield put(allActions.modal.closeSignUp());
    } catch (error) {
        yield put(allActions.user.requestSignUpError());
    }
}

function* watchLogOut() {
    yield takeEvery('FETCHED_LOG_OUT', fetchLogOut)
}

function* fetchLogOut(body) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${body.message}`
        },
    };
    try {
        yield put(allActions.user.requestLogOut());
        yield call(() => {
            return fetch(`${SERVER_URL}/users/logout`, requestOptions);
        });
        yield put(allActions.user.requestLogOutSuccess());
    } catch (error) {
        yield put(allActions.user.requestLogOutError());
    }
}

function* watchGetKitchens() {
    yield takeEvery('FETCHED_KITCHENS', fetchKitchens)
}

function* fetchKitchens() {
    try {
        yield put(allActions.kitchens.requestKitchens());
        const data = yield call(() => {
                return fetch(`${SERVER_URL}/kitchens`)
                    .then(res => res.json())
            }
        );
        console.log('kitchens', data)
        yield put(allActions.kitchens.requestKitchensSuccess(data));
    } catch (error) {
        console.log(error)
        yield put(allActions.kitchens.requestKitchensError());
    }
}

function* watchSearchByNameRestaurants() {
    yield takeEvery('FETCHED_SEARCH_BY_NAME_RESTAURANT', fetchSearchByNameRestaurants)
}

function* fetchSearchByNameRestaurants(payload) {
    try {
        yield put(allActions.restaurants.requestSearchByNameRestaurant());
        const data = yield call(() => {
                return fetch(`${SERVER_URL}/restaurants/name/${payload.name}`)
                    .then(res => res.json())
            }
        );
        yield put(allActions.restaurants.requestSearchByNameRestaurantSuccess(data));
    } catch (error) {
        yield put(allActions.restaurants.requestSearchByNameRestaurantError());
    }
}

function* watchFilterRestaurants() {
    yield takeEvery('FETCHED_FILTER_RESTAURANT', fetchFilterRestaurants)
}

function* fetchFilterRestaurants(payload) {
    console.log('payload filter', payload)
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload.filter)
    };
    try {
        yield put(allActions.restaurants.requestFilterRestaurant());
        const data = yield call(() => {
                return fetch(`${SERVER_URL}/restaurants/filter`, requestOptions)
                    .then(res => res.json())
            }
        );
        yield put(allActions.restaurants.requestFilterRestaurantSuccess(data));
    } catch (error) {
        yield put(allActions.restaurants.requestFilterRestaurantError());
    }
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        watchGetRestaurants(),
        watchLogin(),
        watchSignUp(),
        watchGetRestaurant(),
        watchAddComment(),
        watchLogOut(),
        watchGetKitchens(),
        watchAddRestaurant(),
        watchUploadImages(),
        watchSearchByNameRestaurants(),
        watchFilterRestaurants()
    ])
}