// reducer used to hold the list of bike types that are available
const bikeTypes = (state = [], action) => {
    switch(action.type){
        case 'SET_BIKE_TYPES':
            return action.payload;
        default:
            return state;
    };
}

export default bikeTypes;