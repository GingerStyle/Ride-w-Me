// reducer used to hold the list of bike types that the user doesn't own
const filteredBikes = (state = [], action) => {
    switch(action.type){
        case 'SET_FILTERED_BIKES':
            return action.payload;
        default:
            return state;
    };
}

export default filteredBikes;