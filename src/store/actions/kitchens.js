const requestKitchens = () => {
    return {type: 'REQUEST_KITCHENS'}
};

const requestKitchensSuccess = (data) => {
    return {type: 'REQUEST_KITCHENS_SUCCEEDED', message: data}
};

const requestKitchensError = () => {
    return {type: 'REQUEST_KITCHENS_FAILED'}
};

const fetchKitchens = () => {
    return {type: 'FETCHED_KITCHENS'}
};

export default {
    requestKitchens,
    requestKitchensSuccess,
    requestKitchensError,
    fetchKitchens
}