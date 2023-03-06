const bikeTypeString = (state = '', action) => {
    switch(action.type){
        case 'SET_STRING':
            return action.payload;
        default:
            return state;
    };
}

export default bikeTypeString;