// reducer used to hold the list of bike types that the user owns
const userBikes = (state = [], action) => {
    switch(action.type){
        case 'SET_BIKES':
            return action.payload;
        default:
            return state;
    };
}

export default userBikes;