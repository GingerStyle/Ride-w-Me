// reducer used to hold the list of bike types that the user owns
const datesAvailable = (state = [], action) => {
    switch(action.type){
        case 'SAVE_DATES':
            return action.payload;
        default:
            return state;
    };
}

export default datesAvailable;