const initialState = {
    restaurants: [],
    imagesUrls: [],
    restaurant: null,
    loading: false,
    error: false,
    comment: null
};
const restaurants = (state = initialState, action) => {
    console.log('action', action)
    switch (action.type) {
        case 'REQUEST_RESTAURANTS':
            return {
                restaurants: [],
                loading: true,
                error: false,
            };
        case 'REQUEST_RESTAURANTS_SUCCEEDED':
            return {
                restaurants: action.message,
                loading: false,
                error: false,
            };
        case 'REQUEST_RESTAURANTS_FAILED':
            return {
                restaurants: [],
                loading: false,
                error: true,
            };
        case 'REQUEST_RESTAURANT':
            return {
                restaurant: null,
                loading: true,
                error: false,
            };
        case 'REQUEST_RESTAURANT_SUCCEEDED':
            return {
                restaurant: action.message,
                loading: false,
                error: false,
            };
        case 'REQUEST_RESTAURANT_FAILED':
            return {
                restaurant: null,
                loading: false,
                error: true,
            };
        case 'REQUEST_ADD_RESTAURANT':
            return {
                restaurant: null,
                loading: true,
                error: false,
            };
        case 'REQUEST_ADD_RESTAURANT_SUCCEEDED':
            return {
                restaurant: action.message,
                loading: false,
                error: false,
            };
        case 'REQUEST_ADD_RESTAURANT_FAILED':
            return {
                restaurant: null,
                loading: false,
                error: true,
            };
        case 'REQUEST_ADD_COMMENT':
            return {
                comment: null,
                loading: true,
                error: false,
            };
        case 'REQUEST_ADD_COMMENT_SUCCEEDED':
            return {
                comment: action.message,
                loading: false,
                error: false,
            };
        case 'REQUEST_ADD_COMMENT_FAILED':
            return {
                comment: null,
                loading: false,
                error: true,
            };
        case 'REQUEST_UPLOAD_IMAGES':
            return {
                ...state,
                imagesUrls: [],
                loading: true,
                error: false,
            };
        case 'REQUEST_UPLOAD_IMAGES_SUCCEEDED':
            return {
                ...state,
                imagesUrls: action.message,
                loading: false,
                error: false,
            };
        case 'REQUEST_UPLOAD_IMAGES_FAILED':
            return {
                ...state,
                imagesUrls: [],
                loading: false,
                error: true,
            };
        case 'REQUEST_SEARCH_BY_NAME_RESTAURANT':
            return {
                restaurants: [],
                loading: true,
                error: false,
            }
        case 'REQUEST_SEARCH_BY_NAME_RESTAURANT_SUCCEEDED':
            return {
                restaurants: action.message,
                loading: false,
                error: false,
            }
        case 'REQUEST_SEARCH_BY_NAME_RESTAURANT_FAILED':
            return {
                restaurants: [],
                loading: false,
                error: true,
            }
        case 'REQUEST_FILTER_RESTAURANT':
            return {
                restaurants: [],
                loading: true,
                error: false,
            }
        case 'REQUEST_FILTER_RESTAURANT_SUCCEEDED':
            return {
                restaurants: action.message,
                loading: false,
                error: false,
            }
        case 'REQUEST_FILTER_RESTAURANT_FAILED':
            return {
                restaurants: [],
                loading: false,
                error: true,
            }
        default:
            return state;
    }
};

export default restaurants;