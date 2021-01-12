const initialState = {
    kitchens: [],
    loading: false,
    error: false
};
const kitchens = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_KITCHENS':
            return {
                kitchens: [],
                loading: true,
                error: false,
            };
        case 'REQUEST_KITCHENS_SUCCEEDED':
            return {
                kitchens: action.message,
                loading: false,
                error: false,
            };
        case 'REQUEST_KITCHENS_FAILED':
            return {
                kitchens: [],
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

export default kitchens;