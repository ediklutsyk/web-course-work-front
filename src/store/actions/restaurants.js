// Action Creators
const requestRestaurants = () => {
    return {type: 'REQUEST_RESTAURANTS'}
};

const requestRestaurantsSuccess = (data) => {
    return {type: 'REQUEST_RESTAURANTS_SUCCEEDED', message: data}
};

const requestRestaurantsError = () => {
    return {type: 'REQUEST_RESTAURANTS_FAILED'}
};

const fetchAddRestaurant = (body, token) => {
    return {type: 'FETCHED_ADD_RESTAURANT', body, token}
};

const requestAddRestaurant = () => {
    return {type: 'REQUEST_ADD_RESTAURANT'}
};

const requestAddRestaurantSuccess = (data) => {
    return {type: 'REQUEST_ADD_RESTAURANT_SUCCEEDED', message: data}
};

const requestAddRestaurantError = () => {
    return {type: 'REQUEST_ADD_RESTAURANT_FAILED'}
};

const fetchUploadImages = (images, token) => {
    return {type: 'FETCHED_UPLOAD_IMAGES', images, token}
};

const requestUploadImages = () => {
    return {type: 'REQUEST_UPLOAD_IMAGES'}
};

const requestUploadImagesSuccess = (data) => {
    return {type: 'REQUEST_UPLOAD_IMAGES_SUCCEEDED', message: data}
};

const requestUploadImagesError = () => {
    return {type: 'REQUEST_UPLOAD_IMAGES_FAILED'}
};

const fetchRestaurants = () => {
    return {type: 'FETCHED_RESTAURANTS'}
};

const requestRestaurant = () => {
    return {type: 'REQUEST_RESTAURANT'}
};

const requestRestaurantSuccess = (data) => {
    return {type: 'REQUEST_RESTAURANT_SUCCEEDED', message: data}
};

const requestRestaurantError = () => {
    return {type: 'REQUEST_RESTAURANT_FAILED'}
};

const fetchRestaurant = (id) => {
    return {type: 'FETCHED_RESTAURANT', id}
};

const requestAddComment = () => {
    return {type: 'REQUEST_ADD_COMMENT'}
};

const requestAddCommentSuccess = (data) => {
    return {type: 'REQUEST_ADD_COMMENT_SUCCEEDED', message: data}
};

const requestAddCommentError = () => {
    return {type: 'REQUEST_ADD_COMMENT_FAILED'}
};

const fetchAddComment = (comment, id, token) => {
    return {
        type: 'FETCHED_ADD_COMMENT', payload: {
            id: id,
            comment: comment,
            token: token
        }
    }
};

const requestSearchByNameRestaurant = () => {
    return {type: 'REQUEST_SEARCH_BY_NAME_RESTAURANT'}
};

const requestSearchByNameRestaurantSuccess = (data) => {
    return {type: 'REQUEST_SEARCH_BY_NAME_RESTAURANT_SUCCEEDED', message: data}
};

const requestSearchByNameRestaurantError = () => {
    return {type: 'REQUEST_SEARCH_BY_NAME_RESTAURANT_FAILED'}
};

const fetchSearchByNameRestaurant = (name) => {
    return {type: 'FETCHED_SEARCH_BY_NAME_RESTAURANT', name}
};

const requestFilterRestaurant = () => {
    return {type: 'REQUEST_FILTER_RESTAURANT'}
};

const requestFilterRestaurantSuccess = (data) => {
    return {type: 'REQUEST_FILTER_RESTAURANT_SUCCEEDED', message: data}
};

const requestFilterRestaurantError = () => {
    return {type: 'REQUEST_FILTER_RESTAURANT_FAILED'}
};

const fetchFilterRestaurant = (filter) => {
    return {type: 'FETCHED_FILTER_RESTAURANT', filter}
};

export default {
    requestRestaurants,
    requestRestaurantsSuccess,
    requestRestaurantsError,
    fetchRestaurants,
    requestRestaurant,
    requestRestaurantError,
    requestRestaurantSuccess,
    fetchRestaurant,
    requestAddComment,
    requestAddCommentError,
    requestAddCommentSuccess,
    fetchAddComment,
    fetchAddRestaurant,
    requestAddRestaurant,
    requestAddRestaurantError,
    requestAddRestaurantSuccess,
    fetchUploadImages,
    requestUploadImages,
    requestUploadImagesError,
    requestUploadImagesSuccess,
    requestSearchByNameRestaurant,
    requestSearchByNameRestaurantSuccess,
    requestSearchByNameRestaurantError,
    fetchSearchByNameRestaurant,
    requestFilterRestaurant,
    requestFilterRestaurantSuccess,
    requestFilterRestaurantError,
    fetchFilterRestaurant
}